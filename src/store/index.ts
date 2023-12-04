import { InjectionKey } from 'vue';
// @ts-ignore
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { getFoodProducts, getFoodProduct } from '../lib/api';

// define your typings for the store state
export interface State {
  isLoggedIn: boolean;
  loading: boolean;
  foods: object;
  food: object;
  noProductsFound: boolean;
  errorMessage: string;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    isLoggedIn: false,
    loading: false,
    foods: {},
    food: {},
    noProductsFound: false,
    errorMessage: ''
  },

  mutations: {
    SET_LOADING(state:State, loading: boolean) {
      state.loading = loading;
    },
    SET_FOODS(state:State, foods: object) {
      state.foods = foods;
    },
    SET_FOOD(state:State, food: object) {
      state.food = food;
    },
    SET_NO_PRODUCTS_FOUND(state:State) {
      state.noProductsFound = true;
    },
    SET_ERROR_MESSAGE(state:State, errorMessage: string) {
      state.errorMessage = errorMessage;
    },
    SET_LOGGEDIN(state:State, isLogged:boolean) { 
      state.isLoggedIn = isLogged;
    }
  },

  actions: {
    async setFoods({ commit }: any, searchParam: string): Promise<void> {
      try {
        commit('SET_LOADING', true);
        const response = await getFoodProducts(searchParam);
        const payload = await response.json();

        // set message if no products are found
        if (payload.chomp?.response?.products_found === 0) {
          commit('SET_NO_PRODUCTS_FOUND');
          commit('SET_LOADING', false);
          return;
        }

        // set error message if rate limit is exceeded
        if (payload.products === undefined) {
          commit('SET_ERROR_MESSAGE', payload.chomp.message);
          commit('SET_LOADING', false);
          return;
        }

        // We only want to show 5 results
        const foods = Object.fromEntries(Object.entries(payload.products).slice(0, 5));
        commit('SET_FOODS', foods);
        commit('SET_LOADING', false);
      } catch (error: any) {
        commit('SET_ERROR_MESSAGE', error.message);
        commit('SET_LOADING', false);
      }
    },

    async setFood({ commit }: any, id: number): Promise<void> {
      try {
        commit('SET_LOADING', true);
        const response = await getFoodProduct(id);
        const payload = await response.json();
        commit('SET_FOOD', payload);
        commit('SET_LOADING', false);
      } catch (error: any) {
        commit('SET_ERROR_MESSAGE', error.message);
        commit('SET_LOADING', false);
      }
    },

    setLoggedIn({ commit }: any, isLogged: boolean) {
      commit('SET_LOGGEDIN', isLogged);
    }
  }
});

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}