<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "./../store/index";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useStore();

const loading = computed<boolean>(() => store.state.loading);
const food = computed(() => store.state.food);
const upc = computed<string>(() => Object.keys(food.value?.products)[0]);

function lifestyleCompatibility(lifestyle: string): string {
  return food.value.products[upc.value]?.details?.lifestyle[lifestyle]?.is_compatible;
};

function convertToString(value: object): string {
  if (Object.keys(value).length === 0) return "None";
  return Object.values(value).join(', ');
};

function goBack(): void {
  router.go(-1);
};

onMounted(() => {
  store.dispatch("setFood", Number(route.params.id));
});
</script>

<template>
  <div>
    <template v-if="loading">
      <p>Loading...</p>
    </template>

    <template v-else-if="Object.keys(food).length">
      <button @click="goBack()">Go Back</button>

      <h2 v-html="food.products[upc].name" />

      <div class="card">
        <h4 class="text-midnight-green">Nutrition Facts</h4>
        <div class="table" v-for="nutrition in food.products[upc].details.nutrition_label">
          <p>{{ nutrition.name }}</p>
          <p>{{ nutrition.per_100g }}</p>
          <p>{{ nutrition.per_serving.toFixed(2) }}</p>
        </div>
      </div>

      <div class="card">
        <h4 class="text-midnight-green">Lifestyle</h4>
        <p> Gluten Free: {{ lifestyleCompatibility("gluten-free") }}</p>
        <p> Vegetarian: {{ lifestyleCompatibility("vegetarian") }}</p>
        <p> Vegan: {{ lifestyleCompatibility("vegan") }}</p>
      </div>

      <div class="card">
        <h4 class="text-midnight-green">Ingredients</h4>
        <p>{{ food.products[upc].details.ingredients }}</p>
      </div>

      <div class="card">
        <h4 class="text-midnight-green">Allergens</h4>
        <p>{{ convertToString(food.products[upc].details.allergens) }}</p>
      </div>

      <div class="card">
        <h4 class="text-midnight-green">Vitamins</h4>
        <p>{{ convertToString(food.products[upc].details.vitamin_tags) }}</p>
      </div>

      <div class="card">
        <h4 class="text-midnight-green">Minerals</h4>
        <p>{{ food.products[upc].details.mineral_tag }}</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
h2 {
  margin-block: 1.5rem;
  font-size: 1.5rem;
}
.table {
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  gap: 5rem;
}
.card {
  margin-bottom: 2rem;
}

h4 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}
</style>