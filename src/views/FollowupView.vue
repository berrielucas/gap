<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter, RouterView, onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";
import { useCounterStore } from "../stores/counter.js";
import Phase from "@/components/Phase.vue";
// import FollowupConfig from "@/components/popup/Teste.vue";
// import Filter from "@/components/Filter.vue";

const store = useCounterStore();
const router = useRouter();
const route = useRoute();
const search_task = ref("");

store.listAllTasks(route.params.idFollowup);

onBeforeRouteUpdate(() => {
  setTimeout(() => {
    if (!store.loadTasks && !route.params.idTask && route.name!=='followup-config') {
      store.listAllTasks(route.params.idFollowup);
    }
  }, 100);
});

const returnIdFollowup = computed(() => {
  return store.followup.filter((p) => p._id === route.params.idFollowup)[0]._id;
});
</script>

<template>
  <main id="main-view" v-if="store.followup.filter((p) => p._id === route.params.idFollowup).length > 0">
    <RouterView />

    <div id="main-header">
      <v-card elevation="0" class="header" style="border-radius: 10px">
        <v-list-item style="width: 100%; margin: 0; padding: 0 0.5rem ">
          <v-list-item-title class="title-followup">{{ store.followup.filter((p) => p._id === route.params.idFollowup)[0].name }}</v-list-item-title>
          <template v-slot:append>
            <v-btn
              :loading="store.loadTasks"
              class="mr-3"
              size="38"
              icon="mdi-sync"
              variant="elevated"
              style="border-radius: 10px; color: var(--text-color-dark)"
              @click="store.listAllTasks(route.params.idFollowup)"
            >
              <template v-slot:loader>
                <v-icon id="loadTask">mdi-sync</v-icon>
              </template>
            </v-btn>

            <v-btn
              class="mr-3"
              size="38"
              icon="mdi-plus"
              variant="elevated"
              style="border-radius: 10px; color: var(--text-color-dark)"
              @click="store.createTask(router, route.params.idFollowup, store.followup.filter((p) => p._id === route.params.idFollowup)[0].phases[0].id)"
            ></v-btn>

            <v-tooltip location="bottom center" text="Em breve">
              <template v-slot:activator="{ props }">
                <v-btn
                  class="mr-3"
                  v-bind="props"
                  :disabled="false"
                  size="38"
                  icon="mdi-filter-variant"
                  variant="text"
                  style="border-radius: 10px; color: var(--text-color-dark); background-color: gray"
                >
                </v-btn>
              </template>
            </v-tooltip>
            <!-- <Filter /> -->

            <div class="mr-3" style="display: flex; color: var(--text-color-dark); width: 200px; border: solid 1px #bfbfbf; border-radius: 14px; overflow: hidden">
              <v-text-field v-model="search_task" density="compact" label="Buscar aqui" variant="solo" single-line hide-details append-inner-icon="mdi-magnify"></v-text-field>
            </div>

            <v-tooltip location="bottom center" text="Em breve">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" class="mr-3" size="38" icon="mdi-account-multiple" variant="text" style="border-radius: 10px; color: var(--text-color-dark); background-color: gray"></v-btn>
              </template>
            </v-tooltip>

            <!-- <FollowupConfig
              :title="`Configurações do seguimento ➜ `"
              :new="false"
              :followupId="route.params.idFollowup"
              :obj="returnIdFollowup"
            /> -->
            <v-btn icon="mdi-cog" size="38" variant="elevated" style="border-radius: 10px; color: var(--text-color-dark)" @click="router.push({ name: 'followup-config' })"></v-btn>
          </template>
        </v-list-item>
      </v-card>
    </div>

    <div id="main-phases">
      <Phase
        v-for="(phase, index) in store.followup.filter((p) => p._id === route.params.idFollowup)[0].phases"
        :key="index"
        :title="phase.title"
        :id="phase.id"
        :tasks="store.tasks[`${route.params.idFollowup}`].filter((t) => t.phase_id === phase.id && t.followup_id === route.params.idFollowup) || []"
        :search="search_task"
      />
    </div>
  </main>
</template>

<style scoped>
#main-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem 0 0;
  background-image: url("../assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  color: var(--text-color-dark);
}

#main-header {
  display: flex;
  width: 100%;
  padding: 0 1rem 0 0.7rem;

  & .header {
    display: flex;
    align-items: center;
    height: 55px;
    width: 100%;
    /* background-color: var(--bg-color-gray); */
    background-color: transparent;
    color: var(--text-color-dark);

    & .title-followup {
      font-weight: 700;
      font-size: 23px;
      color: var(--primary-color);
    }
  }
}

#main-phases {
  display: flex;
  height: 100%;
  padding: 1rem 1rem 1rem;
  gap: 0.5rem;
  background: transparent;
  width: 100%;
  overflow-x: auto;
}

#main-phases::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}

#main-phases::-webkit-scrollbar-track {
  background-color: transparent;
}

#main-phases::-webkit-scrollbar-thumb {
  background-color: var(--text-color-dark);
  border-radius: 20px;
}

#loadTask {
  animation: loadButtonTask 1s infinite forwards;
}

@keyframes loadButtonTask {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
}
</style>
