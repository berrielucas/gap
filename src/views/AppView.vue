<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router'
const theme = ref("light");

</script>

<template>
  <v-app :theme="theme">

    <v-app-bar
      height="60"
      color="#202020"
    >
      <v-avatar
        class="ms-2 mr-2"
        size="50"
        variant="flat"
      >
        <img src="../assets/Homolog_Frio.png" width="100%">
      </v-avatar>
      <h3 style="font-weight: 500; font-size: 20px;">Project Manager</h3>
    </v-app-bar>

    <RouterView/>
  </v-app>
</template>