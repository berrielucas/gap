<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { useCounterStore } from "../stores/counter.js";
const store = useCounterStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (store.environments.filter((e) => e.url === route.params.name).length === 0 || !store.environments.filter((e) => e.url === route.params.name)[0].active) {
    router.push({ name: "not" });
  }
  store.listAllFollowup(store.environments.filter((e) => e.url === route.params.name)[0]._id);
});

const Env = store.environments.filter((e) => e.url === route.params.name)[0];

const drawer = ref(true);
const menu = ref(false);
const search = ref("");

</script>

<template>
  <v-navigation-drawer class="menu-followups" v-if="store.environments.filter((e) => e.url === route.params.name).length > 0" v-model="drawer" permanent elevation="5">
    <div class="d-flex px-2 my-2 justify-center">
      <v-menu transition="scale-transition" location="bottom center" v-model="menu" persistent>
        <template v-slot:activator="{ props }">
          <v-list-item :disabled="true" :class="menu ? 'env-active' : 'env-deactive'" v-bind="props" style="border-radius: 10px !important; width: 100%; margin: 0; transition: all 0.2s ease-in-out">
            <template v-slot:append>
              <v-icon id="icon-env" :icon="!menu ? 'mdi-chevron-down' : 'mdi-chevron-up'"></v-icon>
            </template>
            <v-list-item-title>{{ Env.name }}</v-list-item-title>
          </v-list-item>
        </template>

        <!-- <v-list
          style="
            margin: 0.5rem 0.3rem 0 -0.3rem;
            border-radius: 10px !important;
            padding: 0;
            background: linear-gradient(45deg, rgba(0, 34, 55, 1) 0%, rgba(1, 12, 24, 1) 50%, rgba(0, 34, 55, 1) 100%);
            color: var(--text-color-light);
            color: var(--text-color-light);
          "
        >
          <v-list-item @click="router.push('/ambientes/')" class="mb-1" append-icon="mdi-account-arrow-right-outline" style="font-size: 15px">
            <v-list-item-title>Sair do ambiente</v-list-item-title>
          </v-list-item>
        </v-list> -->
      </v-menu>
    </div>

    <div class="px-2 my-2 mt-5">
      <div class="mr-3 m1-4 mb-4" style="display: flex; color: var(--text-color-dark); width: 100%; border: solid 1px #bfbfbf; border-radius: 14px; overflow: hidden">
        <v-text-field v-model="search" density="compact" label="Buscar aqui" variant="solo" single-line hide-details append-inner-icon="mdi-magnify"></v-text-field>
      </div>

      <v-btn v-if="store.user.environment.filter(e=>e.id===Env._id)[0].permissions.includes('create-followup')" :disabled="store.user.environment.filter(e=>e.id===Env._id)[0].permissions.includes('create-followup') ? false : true" variant="tonal" class="text-none btn-new" flat @click="router.push({ name: 'new-followup' })">
        <v-icon icon="mdi-plus"></v-icon>
        <h4>Novo Seguimento</h4>
      </v-btn>
    </div>

    <div class="my-2 mt-5" id="all-followups">
      <v-skeleton-loader v-if="store.loadFollowups" class="mx-auto mb-2" type="list-item-three-line"></v-skeleton-loader>

      <v-scale-transition class="py-0" tag="v-list" group>
        <template v-if="store.followup.length > 0 && !store.loadFollowups" v-for="followup in store.followup" :key="followup._id">
          <v-list-item
            style="padding: 0.8rem 0.5rem 0.8rem 0.8rem; color: var(--text-color-dark); transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)"
            @click="
              router.push({ name: 'followup-unique', params: { idFollowup: followup._id } });
              store.listAllTasks(followup._id);
              search = '';
            "
            :class="route.params.idFollowup === followup._id ? 'followup-active' : ''"
            v-show="followup.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || search === ''"
          >
            <v-list-item-title
              ><b>{{ followup.name }}</b></v-list-item-title
            >
            <p style="color: #8f8f8f; font-size: 16px">
              {{ followup.countTasks > 1 ? `${followup.countTasks} registros` : followup.countTasks === 1 ? `${followup.countTasks} registro` : `Nenhum registro` }}
            </p>

            <template v-slot:append>
              <v-menu transition="slide-x-transition" :close-on-content-click="false" location="end top">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark)"></v-btn>
                </template>
                <v-list style="padding: 0; margin-left: 0.3rem">
                  <!-- <v-list-item append-icon="mdi-content-duplicate" @click="" title="Duplicar"
                      style="font-size: 14px;"></v-list-item> -->
                  <v-list-item append-icon="mdi-trash-can" @click="store.deleteFollowup(followup._id, Env._id, route, router)" title="Excluir" style="font-size: 14px; color: red"></v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-list-item>
        </template>
      </v-scale-transition>

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
::v-deep ::-webkit-scrollbar {
  width: 4px;
}

::v-deep ::-webkit-scrollbar-track {
  background-color: transparent;
}

::v-deep ::-webkit-scrollbar-thumb {
  background-color: #898989;
  border-radius: 20px;
}

#icon-env {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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

.btn-new {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: var(--button-color);
  text-transform: initial;
  width: 100%;
  border-radius: 8px;
  border: solid 1px #4fd8f237;

  & h4 {
    font-family: var(--font-family) !important;
    font-weight: 600;
    font-size: 16px;
    min-width: 90px;
  }
}

</style>
