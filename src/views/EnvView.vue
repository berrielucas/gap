<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref } from 'vue';
const route = useRoute();
const nameEnv = route.params.name;

const drawer = ref(true);
const menu = ref(false);
// const theme = ref("light");

</script>

<template>
  <v-navigation-drawer v-model="drawer" permanent elevation="5" >
    <div class="d-flex px-2 my-2 justify-center">
      <v-menu transition="slide-y-transition" v-model="menu" persistent>
        <template v-slot:activator="{ props }">
          <v-list-item :class="menu?'env-active':'env-deactive'" v-bind="props" style="width: 100%; margin: 0; transition: all .2s ease-in-out;">
            <template v-slot:append>
              <v-icon id="icon-env":icon="!menu?'mdi-chevron-down':'mdi-close'"></v-icon>
            </template>
            <v-list-item-title>{{ nameEnv }}</v-list-item-title>
          </v-list-item>
        </template>

        <v-list style="margin: .5rem .3rem 0 -.3rem; padding: 0; background-color: var(--bg-color-dark); color: var(--text-color-light);">
          <v-list-item>
            <v-list-item-title>Lucas Berriel</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="px-2 my-2 mt-5">

      <v-skeleton-loader
        class="mx-auto border mb-2"
        type="list-item-two-line"
      ></v-skeleton-loader>

    </div>
  </v-navigation-drawer>

  <v-main id="main">
    <RouterView/>
    <h1 v-if="!route.params.idProcess">Lucas</h1>
  </v-main>
</template>

<style scoped>

#icon-env{
  transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.env-deactive #icon-env{
  transform: rotate(0deg);
  scale: 1;
}

.env-active #icon-env{
  transform: rotate(-90deg);
  scale: 0.8;
}

#main{
  overflow: auto; 
  height: 100%;
  background-color: var(--bg-color-gray);
}



</style>