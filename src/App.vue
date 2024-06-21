<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <section id="body">
    <RouterView />
  </section>
</template>

<style>

#body{
  /* display: flex; */
  height: 100dvh;
  overflow: hidden;
}

</style>