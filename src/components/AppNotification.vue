<template>
  <div class="notification">
    <slot></slot>
  </div>
</template>

<style scoped>
.notification {
  background-color: hsl(0, 60%, 50%);
  color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;  
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
