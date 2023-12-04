<script setup lang="ts">
import { computed, onMounted, ref, defineAsyncComponent, watch } from "vue";
import { useStore } from "./../store/index";
import debounce from "lodash.debounce";

const AppSearchBar = defineAsyncComponent(
  () => import("../components/AppSearchBar.vue")
);
const FoodCard = defineAsyncComponent(
  () => import("../components/FoodCard.vue")
);
const AppNotification = defineAsyncComponent(
  () => import("../components/AppNotification.vue")
);

const store = useStore();

const loading = computed(() => store.state.loading);
const errorMessage = computed(() => store.state.errorMessage);
const noProductsFound = computed(() => store.state.noProductsFound);
const foods = computed(() => store.state.foods);

const defaultFood = ref("chicken");
const typing = ref(false);

const searchFood = debounce(() => {
  typing.value = false;
  store.dispatch("setFoods", defaultFood.value);
}, 5000);

onMounted(() => {
  store.dispatch("setFoods", defaultFood.value);
});

watch(defaultFood, () => {
  typing.value = true;
  searchFood();
});
</script>

<template>
  <div>
    <AppSearchBar v-model="defaultFood" />

    <template v-if="loading || typing">
      <p>Loading...</p>
    </template>

    <AppNotification v-else-if="noProductsFound">
      <p>Sorry, no product found for <b>{{ defaultFood }}</b></p>
    </AppNotification>

    <AppNotification v-else-if="errorMessage.length">
      <p>{{ errorMessage }}</p>
    </AppNotification>

    <template v-else>
      <div class="grid">
        <FoodCard v-for="food in foods" :key="food.product_id" :value="food" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 2rem;
}
</style>
