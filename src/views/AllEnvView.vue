<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from "../stores/counter.js";
import { ref } from "vue";
const store = useCounterStore();
const router = useRouter();

store.listAllEnvironment();

const search = ref("");

</script>

<template>
  <!-- <v-navigation-drawer></v-navigation-drawer> -->
  <v-main class="main-all-env" style="background-color: var(--bg-color-gray); overflow: auto; max-height: 100%">
    <v-container fluid>
      <v-row dense>

        <v-col cols="12" sm="12">
          <v-card class="header-all-env" elevation="3">
            <v-progress-circular v-if="store.loadEnvironments" class="ml-2" indeterminate
              :size="25"></v-progress-circular>
            <v-list-item class="pl-3" style="flex-grow: 1; margin: 0; padding: 0;">
              <v-list-item-title style="font-size: large;">Meus ambientes</v-list-item-title>
              <template v-slot:append>

                <v-btn class="mr-3" icon="mdi-sync" variant="text" density="compact"
                  style="border-radius: 10px; color: var(--text-color-dark);"
                  @click="store.listAllEnvironment();"></v-btn>

                <v-btn class="mr-3" icon="mdi-filter-variant" variant="text" density="compact"
                  style="border-radius: 10px; color: var(--text-color-dark);"></v-btn>

                <div
                  style="display: flex; color: var(--text-color-dark); width: 200px; border: solid 1px #bfbfbf; border-radius: 14px; overflow: hidden;">
                  <v-text-field v-model="search" density="compact" label="Buscar aqui" variant="solo" single-line
                    hide-details append-inner-icon="mdi-magnify"></v-text-field>
                </div>

              </template>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col v-if="!store.loadEnvironments" cols="12" sm="4" v-for="(env, index) in store.environments" :key="index"
          v-show="env.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || search === ''">
          <div class="env-item mb-3 mr-1 ml-1">
            <v-list-item style="padding: 0; margin: 0">
              <v-list-item-title style="font-size: 20px; font-weight: 600; color: gray">{{ env.name
                }}</v-list-item-title>
              <template v-slot:append>
                <div class="status-env ml-2" :style="env.active ? '--color-status: green;' : '--color-status: red;'">
                  <span>{{ env.active ? "Ativo" : "Desativado" }}</span>
                </div>
              </template>
            </v-list-item>
            <p
              style="font-size: 15px; font-style: italic; font-weight: 600; color: gray; opacity: 0.7; position: absolute; left: 0.8rem; bottom: 0.8rem">
              Criado em {{ new Date(env.createAt).toLocaleString() }}
            </p>
            <v-btn @click="router.push(`/${env.url}/`);" class="btn-acess" style="" icon="mdi-arrow-top-right"
              size="30"></v-btn>
          </div>
        </v-col>

        <v-col v-if="!store.loadEnvironments" cols="12" sm="4">
          <v-list-item @click="" class="env-new mb-3 mr-1 ml-1">
            <h3 style="display: flex; gap: 0.3rem; align-items: center"><v-icon
                style="display: flex">mdi-plus-thick</v-icon>
              Novo Ambiente</h3>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.main-all-env::-webkit-scrollbar {
  width: 7px;
}

.main-all-env::-webkit-scrollbar-track {
  background-color: transparent;
}

.main-all-env::-webkit-scrollbar-thumb {
  background-color: var(--scroll-color-thumb);
  border-radius: 20px;
}

.header-all-env {
  display: flex;
  align-items: center;
  color: var(--text-color-dark);
  border-radius: 20px;
  overflow: hidden;
  padding: 0.5rem;
  gap: 0.5rem;
  background-color: var(--bg-color-light);
  margin-block-end: 1rem;
}

.env-new {
  display: flex !important;
  flex-direction: row !important;
  align-items: center;
  justify-content: center;
  border: dashed 3px gray;
  height: 100px;
  border-radius: 20px !important;
  /* background-color: red; */
  color: gray;
  cursor: pointer;
}

.env-item {
  display: flex;
  flex-direction: column;
  height: 100px;
  gap: 0.3rem;
  background-color: var(--bg-color-light);
  color: gray;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 0 5px #b7b7b7;
  position: relative;
}

.btn-acess {
  color: var(--text-color-light);
  background-color: var(--button-color);
  position: absolute;
  right: 0.8rem;
  bottom: 0.8rem;
}

.status-env {
  display: flex;
  align-items: start;
  gap: 0.3rem;
  /* --color-status: red; */

  & h5 {
    font-size: 14px;
    font-weight: 500;
  }

  & span {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: var(--color-status);
    gap: 0.3rem;
    font-size: 15px;
  }

  & span::before {
    content: " ";
    height: 10px;
    width: 10px;
    background-color: var(--color-status);
    border-radius: 50%;
  }
}
</style>
