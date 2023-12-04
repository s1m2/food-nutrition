<script setup lang="ts">
import { Product } from './../types/food';
defineProps<{ value: Product }>();
</script>

<template>
  <div class="card">
    <header class="text-midnight-green">
      <h1 v-html="value.name"/>
    </header>
    <section class="text-gray">
      <p v-html="value.manufacturer"/>
      <p v-html="value.upc"/>
    </section>
    <footer>
      <router-link :to="{ name: 'product', params: { id: value?.product_id } }">
        More Details
      </router-link>
    </footer>
  </div>
</template>
