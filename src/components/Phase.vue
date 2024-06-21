<script setup>

import CardTask from "./CardTask.vue";

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tasks: {
        type: Array,
        required: true
    }
});

</script>

<template>
     <v-card elevation="10" class="etapa">
        <div class="etapa-header">
            <v-list-item style="width: 100%; margin: 0; padding: 0 .3rem 0 .7rem;">
                <v-list-item-title class="h4">{{ title }}</v-list-item-title>
                <template v-slot:append>
                    <v-btn icon="mdi-plus" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark);"></v-btn>
                    <v-btn icon="mdi-dots-vertical" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark);"></v-btn>
                </template>
            </v-list-item>
        </div>
        <div :id="id" class="etapa-cards" ondrop="dropPhase(event, id)" ondragover="allowDropPhase(event)">
            <CardTask v-for="task, index in tasks" :key="index" :id="task._id" /> 
        </div>
    </v-card>
</template>

<style scoped>

.etapa{
    background-color: #ececec3a;
    height: 100%;
    display: flex; 
    flex-direction: column; 
    min-width: 290px;
    max-width: 290px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(5px);
}

.etapa-header{
    display: flex;
    height: 45px;
    background-color: var(--bg-color-gray);
    align-items: center;
    justify-content: space-between;
    color: var(--text-color-dark);

    & .h4{
        font-weight: 700;
        font-size: 17px;
    }
}

.etapa-cards{
    height: 100%;
    display: flex; 
    flex-direction: column; 
    padding: .8rem .5rem; 
    overflow: auto;
    gap: .5rem;
}

.etapa-cards::-webkit-scrollbar{
    width: 5px;
    height: 6px;
}
.etapa-cards::-webkit-scrollbar-track{
    background-color: transparent;
}
.etapa-cards::-webkit-scrollbar-thumb{
    background-color: var(--scroll-color-thumb);
    border-radius: 20px;
}

</style>