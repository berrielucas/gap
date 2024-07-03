<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import FollowupConfig from "@/components/popup/FollowupConfig.vue";
import { useCounterStore } from '../stores/counter.js'
const store = useCounterStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (store.environments.filter(e => e.url === route.params.name).length === 0 || !store.environments.filter(e => e.url === route.params.name)[0].active) {
    router.push({ name: 'not' });
  }
  store.listAllFollowup(store.environments.filter(e => e.url === route.params.name)[0]._id);
});

const Env = store.environments.filter(e => e.url === route.params.name)[0];

const drawer = ref(true);
const menu = ref(false);
const search = ref("");

const followupModel = {
  codigo: null,
  name: "",
  phases: [
    {
      id: "1",
      title: "Primeira Etapa",
      color: "#ededed",
      visible: true
    },
    {
      id: "2",
      title: "Segunda Etapa",
      color: "#ededed",
      visible: true
    },
    {
      id: "3",
      title: "Terceira Etapa",
      color: "#ededed",
      visible: true
    }
  ],
  environment_id: Env ? Env._id : null,
}

</script>

<template>
  <v-navigation-drawer v-if="store.environments.filter(e => e.url === route.params.name).length > 0" v-model="drawer"
    permanent elevation="5">
    <div class="d-flex px-2 my-2 justify-center">
      <v-menu transition="scale-transition" location="bottom center" v-model="menu" persistent>
        <template v-slot:activator="{ props }">
          <v-list-item :class="menu ? 'env-active' : 'env-deactive'" v-bind="props"
            style="border-radius: 10px !important; width: 100%; margin: 0; transition: all .2s ease-in-out;">
            <template v-slot:append>
              <v-icon id="icon-env" :icon="!menu ? 'mdi-chevron-down' : 'mdi-chevron-up'"></v-icon>
            </template>
            <v-list-item-title>{{ Env.name }}</v-list-item-title>
          </v-list-item>
        </template>

        <v-list
          style="margin: .5rem .3rem 0 -.3rem; border-radius: 10px !important; padding: 0; background: linear-gradient(45deg, rgba(0,34,55,1) 0%, rgba(1,12,24,1) 50%, rgba(0,34,55,1) 100%); color: var(--text-color-light); color: var(--text-color-light);">
          <v-list-item>
            <v-list-item-title>Lucas Berriel</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="px-2 my-2 mt-5">

      <div class="mr-3 m1-4 mb-4"
        style="display: flex; color: var(--text-color-dark); width: 100%; border: solid 1px #bfbfbf; border-radius: 14px; overflow: hidden;">
        <v-text-field v-model="search" density="compact" label="Buscar aqui" variant="solo" single-line hide-details
          append-inner-icon="mdi-magnify"></v-text-field>
      </div>

      <FollowupConfig title="Novo Seguimento" :new="true" :envId="Env._id" :obj="JSON.stringify(followupModel)" />

    </div>

    <div class=" my-2 mt-5">

      <v-skeleton-loader v-if="store.loadFollowups" class="mx-auto mb-2"
        type="list-item-three-line"></v-skeleton-loader>

      <v-list-item v-if="!store.loadFollowups" v-for="followup, index in store.followup" :key="index"
        style="padding: .8rem .5rem .8rem .8rem; color: var(--text-color-dark); transition: all .2s cubic-bezier(0.075, 0.82, 0.165, 1);"
        @click="router.push({ name: 'followup-unique', params: { idFollowup: followup._id } }); store.listAllTasks(followup._id); search = '';"
        :class="route.params.idFollowup === followup._id ? 'followup-active' : ''"
        v-show="followup.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || search === ''">
        <v-list-item-title><b>{{ followup.name }}</b></v-list-item-title>
        <p style="color: #8f8f8f; font-size: 14px;">57 registros</p style="color: #efefef;">

        <template v-slot:append>
          <v-menu transition="slide-x-transition" :close-on-content-click="false" location="end top">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text" density="compact"
                style="border-radius: 10px; color: var(--text-color-dark);"></v-btn>
            </template>
            <v-list style="padding: 0; margin-left: .3rem;">
              <v-list-item append-icon="mdi-content-duplicate" @click="" title="Duplicar"
                style="font-size: 14px;"></v-list-item>
              <v-list-item append-icon="mdi-trash-can" @click="" title="Excluir"
                style="font-size: 14px; color: red;"></v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>

      <!-- <v-color-picker width="90%" elevation="3" style="margin-inline: auto; margin-top: 2rem;"></v-color-picker> -->
    </div>
  </v-navigation-drawer>

  <v-main id="main">
    <RouterView v-slot="{ Component }">
      <v-slide-y-transition mode="out-in">
        <component :is="Component" />
      </v-slide-y-transition>
    </RouterView>
  </v-main>
</template>

<style scoped>
#main::-webkit-scrollbar {
  width: 7px;
}

#main::-webkit-scrollbar-track {
  background-color: transparent;
}

#main::-webkit-scrollbar-thumb {
  background-color: var(--scroll-color-thumb);
  border-radius: 20px;
}

#icon-env {
  transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.env-deactive #icon-env {
  transform: rotate(0deg);
}

.env-active #icon-env {
  transform: rotate(-360deg);
}

#main {
  overflow: auto;
  height: 100%;
  background-color: var(--bg-color-gray);
}

.followup-active {
  padding-left: 1.7rem !important;
}

.followup-active::before {
  content: " ";
  background-color: var(--button-color);
  height: 80%;
  width: 7px;
  position: absolute;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  left: 1px;
}
</style>