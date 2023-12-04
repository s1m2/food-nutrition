<script setup lang="ts">
import { reactive, watch, ref, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "./../store/index";
import { lengthCheckValidator } from "../lib/utils";

const router = useRouter();
const store = useStore();

const showNotification = ref(false);
const state = reactive({
  isValid: false,
  username: "",
  password: ""
});

const errorMessages = reactive<any>({});

const AppNotification = defineAsyncComponent(
  () => import("../components/AppNotification.vue")
);

function login() {
  showNotification.value = true;
  store.dispatch("setLoggedIn", true);
  setTimeout(() => {
    router.push("/");
  }, 1000);
}

function lengthValidator(
  value: string,
  minLength: number,
  property: string
): void {
  errorMessages[property] = lengthCheckValidator(value, minLength, property);
  validateForm();
}

function validateForm() {
  state.isValid =
    Object.keys(errorMessages).every((key) => errorMessages[key] === "") &&
    Object.keys(state).every((key) => state[key as keyof typeof state] !== "");
}

watch(
  () => state.username,
  (value) => {
    lengthValidator(value, 5, "username");
  }
);

watch(
  () => state.password,
  (value) => {
    lengthValidator(value, 8, "password");
  }
);
</script>

<template>
  <div class="card">
    <AppNotification v-if="showNotification">
      <p>Login Successful</p>
    </AppNotification>

    <h3>Login</h3>
    <div class="form-input">
      <label for="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        v-model="state.username"
      />
      <p class="error" v-if="errorMessages['username']">
        {{ errorMessages["username"] }}
      </p>
    </div>

    <div class="form-input">
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="state.password"
      />
      <p class="error" v-if="errorMessages['password']">
        {{ errorMessages["password"] }}
      </p>
    </div>

    <button :disabled="!state.isValid" @click="login">Login</button>
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.5rem;
}
.card {
  display: grid;
  gap: 1rem;
  max-width: 25rem;
  margin: 0 auto;
}
.form-input {
  display: grid;
  align-items: center;
}
.error {
  color: hsl(0, 60%, 50%);
}
</style>
