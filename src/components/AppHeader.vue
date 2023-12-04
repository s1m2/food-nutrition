<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "./../store/index";

const store = useStore();
const isLoggedIn = computed<boolean>(() => store.state.isLoggedIn);

function logout():void {
  store.dispatch("setLoggedIn", false);
}
</script>

<template>
  <nav>
    <router-link to="/">Food Nutrition</router-link>
    <button v-if="isLoggedIn" @click="logout">Logout</button>
    <router-link to="/login" v-else>Login</router-link>
  </nav>
</template>