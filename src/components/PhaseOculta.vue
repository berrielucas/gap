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
});

const search = ref("");
</script>

<template>
    <div :id="id" :class="id" style="position: relative">
        <v-card :id="`etapa-${id}`" elevation="0" class="etapa">


            <v-menu transition="scale-transition" location="bottom center" :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                    <div v-bind="props" :id="`etapa-header-${id}`" class="etapa-header">
                        <v-progress-circular v-if="store.loadTasks" class="ml-2" indeterminate
                            :size="25"></v-progress-circular>
                        <v-list-item @click="" density="comfortable"
                            style="flex-grow: 1; margin: 0; padding: 0 0.7rem; text-align: start;">
                            <v-list-item-title class="h4">{{ title }}</v-list-item-title>
                            <template v-slot:append>
                                <p><b>{{ tasks.length }}</b></p>
                            </template>
                        </v-list-item>
                    </div>
                </template>
                <div
                    style="display: flex; flex-direction: column; box-shadow: 0 0 10px #363636; max-height: 80%; border-radius: 10px; overflow: auto; background-color: var(--bg-color-gray); ">
                    <v-list-item @click="" density="default"
                        style="flex-grow: 1; margin: 0; padding: 0 0.7rem; text-align: start; color: var(--text-color-dark);">
                        <v-list-item-title><b>{{ title }}</b></v-list-item-title>
                        <template v-slot:append>
                            <p><b>{{ tasks.length }}</b></p>
                        </template>
                    </v-list-item>
                    <v-text-field class="search mr-2 ml-2 mb-3" v-model="search" density="compact" label="Buscar aqui"
                        variant="solo" single-line hide-details append-inner-icon="mdi-magnify"></v-text-field>
                    <p v-if="tasks.length === 0" class="mb-2" style="color: var(--text-color-dark); text-align: center;">
                        Nenhum registro
                    </p>
                    <section v-if="!store.loadTasks && tasks.length > 0" :id="`etapa-cards-${id}`" class="etapa-cards">
                        <CardTask v-for="(task, index) in tasks" :key="task._id"
                            v-show="task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())" :id="task._id"
                            :content="JSON.stringify(task)" />
                    </section>
                </div>
            </v-menu>


        </v-card>
    </div>
</template>

<style scoped>
.etapa {
    display: flex;
    flex-direction: column;
    min-width: 250px;
    max-width: 250px;
    border-radius: 10px;
    max-height: 100%;
}

.etapa-header {
    display: flex;
    background-color: var(--bg-color-gray);
    align-items: center;
    justify-content: space-between;
    color: var(--text-color-dark);
    box-shadow: 0 0 10px #9e9e9e;
    transition: all 0.5s ease-in-out;
    cursor: pointer;

    & .h4 {
        font-weight: 700;
        font-size: 17px;
    }
}

.etapa-cards {
    display: flex;
    flex-direction: column;
    padding: 0.8rem 0.5rem;
    overflow: auto;
    gap: 0.8rem;
    border-radius: 10px;
    min-width: 300px;
    max-width: 300px;
    flex-grow: 1;
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

.search * {
    box-shadow: none;
    border-radius: 10px;
}
</style>
