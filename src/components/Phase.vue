<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter";
import CardTask from "./CardTask.vue";
const store = useCounterStore();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array,
    required: true,
  },
  search: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    :id="id"
    :class="id"
    @drop="store.dropPhase($event, id, route.params.idFollowup)"
    @dragenter="store.dragEnter($event, id)"
    @dragleave="store.dragLeave($event, id)"
    @dragover="store.allowDropPhase($event)"
    style="height: 100%; position: relative"
  >
    <v-card :id="`etapa-${id}`" elevation="10" class="etapa">
      <div :id="`etapa-header-${id}`" class="etapa-header">
        <v-progress-circular v-if="store.loadTasks" class="ml-2" indeterminate :size="25"></v-progress-circular>
        <v-list-item style="flex-grow: 1; margin: 0; padding: 0 0.3rem 0 0.7rem">
          <v-list-item-title class="h4">{{ title }}</v-list-item-title>
          <template v-slot:append>
            <v-btn icon="mdi-plus" variant="text" density="compact" style="border-radius: 10px; color: var(--bg-color-gray)" @click="store.createTask(router, route.params.idFollowup, id)"></v-btn>
            <v-btn icon="mdi-dots-vertical" variant="text" density="compact" style="border-radius: 10px; color: var(--bg-color-gray)"></v-btn>
          </template>
        </v-list-item>
      </div>
      <section v-if="!store.loadTasks" :id="`etapa-cards-${id}`" class="etapa-cards">
        <CardTask v-for="(task, index) in tasks" :key="task._id" v-show="task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())" :id="task._id" :content="JSON.stringify(task)" />
      </section>
      <div :id="`model-${id}`" class="model-task"></div>
    </v-card>
  </div>
</template>

<style scoped>
.etapa {
  background-color: #ececec3a;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 300px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(5px);
  border-radius: 10px;
}

.etapa-header {
  display: flex;
  height: 45px;
  /* background-color: var(--bg-color-gray); */
  background: linear-gradient(30deg, rgba(0, 34, 55, 1) 0%, rgba(1, 12, 24, 1) 30% 70%, rgba(0, 34, 55, 1) 100%);
  align-items: center;
  justify-content: space-between;
  /* color: var(--text-color-dark); */
  color: var(--bg-color-gray);
  box-shadow: 0 0 10px #9e9e9e;
  transition: all 0.5s ease-in-out;

  & .h4 {
    font-weight: 700;
    font-size: 17px;
  }
}

.etapa-cards {
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0.5rem;
  overflow: auto;
  gap: 0.8rem;
  /* padding-bottom: .8rem; */
  /* background-color: #ececec3a;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(5px); */
}

.etapa-cards::-webkit-scrollbar {
  width: 5px;
  height: 6px;
}

.etapa-cards::-webkit-scrollbar-track {
  background-color: transparent;
}

.etapa-cards::-webkit-scrollbar-thumb {
  background-color: var(--scroll-color-thumb);
  border-radius: 20px;
}

.model-task {
  height: 40px;
  border: dashed 1px var(--text-color-dark);
  border-radius: 10px;
  margin-inline: 0.5rem;
  margin-bottom: 0.8rem;
  display: none;
}
</style>
