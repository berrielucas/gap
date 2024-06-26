<script setup>
import { useCounterStore } from '../stores/counter.js'
const store = useCounterStore();

store.listAllEnvironment();
store.listAllFollowup();
// store.listAllTasks();

</script>

<template>
  <h1>Login</h1>
</template>

<style scoped>

</style>
