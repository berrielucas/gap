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
    <div :id="id" :class="id" ondrop="dropPhase(event, id)" ondragenter="enter(event, id)" ondragleave="leave(event, id)" ondragover="allowDropPhase(event)" style="height: 100%; position: relative;"  >
        <v-card :id="`etapa-${id}`" elevation="10" class="etapa">
            <div :id="`etapa-header-${id}`"  class="etapa-header">
                <v-list-item style="width: 100%; margin: 0; padding: 0 .3rem 0 .7rem;">
                    <v-list-item-title class="h4">{{ title }}</v-list-item-title>
                    <template v-slot:append>
                        <v-btn icon="mdi-plus" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark);"></v-btn>
                        <v-btn icon="mdi-dots-vertical" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark);"></v-btn>
                    </template>
                </v-list-item>
            </div>
            <section :id="`etapa-cards-${id}`" class="etapa-cards">
                <CardTask v-for="task, index in tasks" :key="index" :id="task._id" :title="task.title" />
            </section>
            <div :id="`model-${id}`" class="model"></div>
        </v-card>
    </div>
</template>

<style scoped>

.etapa{
    background-color: #ececec3a;
    height: auto;
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
    box-shadow: 0 0 10px #9e9e9e; 

    & .h4{
        font-weight: 700;
        font-size: 17px;
    }
}

.etapa-cards{
    height: auto;
    display: flex; 
    flex-direction: column; 
    padding: .8rem .5rem; 
    overflow: auto;
    gap: .8rem;
    /* padding-bottom: .8rem; */
    /* background-color: #ececec3a;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(5px); */
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

.model{
    height: 40px;
    border: dashed 1px var(--text-color-dark);
    border-radius: 10px;
    margin-inline: .5rem;
    margin-bottom: .8rem;
    display: none;
}

</style>