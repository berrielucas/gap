<script setup>
import { ref, onMounted } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useCounterStore } from '../stores/counter.js'
const store = useCounterStore();
const route = useRoute();
const router = useRouter();
const theme = ref("light");

onMounted(()=>{
  if (!store.auth) {
    router.push({name: 'login'});
  } else if (store.environments.filter(e => e.url===route.params.name).length===0) {
    router.push({name: 'not'});
  }
});


</script>

<template>
  <v-app :theme="theme" v-if="store.environments.filter(e => e.url===route.params.name).length>0">

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