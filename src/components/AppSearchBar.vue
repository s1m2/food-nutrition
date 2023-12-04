<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ modelValue: string }>();
const emits = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});

</script>

<template>
  <input type="text" v-model="value" id="search">
</template>

<style scoped>
input {
  border-radius: 2rem;
  margin-bottom: 1.5rem;
}
</style>
