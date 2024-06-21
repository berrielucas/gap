<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from "axios";
import Phase from "@/components/Phase.vue";

const router = useRouter();
const route = useRoute();
const idProcess = route.params.idProcess;
const dataProcess = reactive({
    process: null,
    tasks: [],
});

onMounted(() => {
    loadTasks();
});

function loadTasks() {
    axios.post(`${import.meta.env.VITE_URL_BASE_API}/Task/listAllTasks`, {
        processId: idProcess,
        tokenUser: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzU4MjAxYTA3ZjhmN2U1YzY0MzE3MCIsImVtYWlsIjoibHVjYXNiZXJyaWVsQGVtYWlsLmNvbSIsImlhdCI6MTcxODk3NzAyNSwiZXhwIjoxNzE5MDYzNDI1fQ.zgjIkN0kaYFVT6nYXnoyGhXiTsrInG-bGZS2xLu4arU"
    })
    .then(function (response) {
        if (response.data.success) {
            dataProcess.process = response.data.data.process;
            dataProcess.tasks = response.data.data.tasks;
        }
    })
    .catch(function (error) { console.log(error) })
}
</script>

<template>
    <main id="main-view" v-if="dataProcess.process!==null">

        <div id="main-header">

            <v-card elevation="5" class="header">
                <v-list-item style="width: 100%; margin: 0; padding: 0 .7rem;">
                    <v-list-item-title class="title-process">{{ dataProcess.process.name }}</v-list-item-title>
                    <template v-slot:append>
                        <input type="text" placeholder="Buscar aqui" style="display: flex; border-radius: 10px; background-color: var(--bg-color-light); padding: .3rem 1rem; outline: none; border: solid 1px var(--scroll-color-thumb); color: var(--text-color-dark); margin-right: 1rem">

                        <v-btn icon="mdi-plus" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark); margin-right: .5rem"></v-btn>
                        
                        <v-btn icon="mdi-filter-variant" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark); margin-right: .5rem"></v-btn>

                        <v-btn icon="mdi-cog" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark);"></v-btn>
                    </template>
                </v-list-item>
            </v-card>
            
        </div>

        <div id="main-phases">
            <Phase v-for="phase, index in dataProcess.process.phases" :key="index" :title="phase.title" :id="phase.id" :tasks="dataProcess.tasks.filter(t=>t.phase_id===phase.id)" />
        </div>
    </main>
</template>

<style scoped>

#main-view{
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem 0 0;
    background-image: url('../assets/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    color: var(--text-color-dark);
}

#main-header{
    display: flex;
    width: 100%;
    padding: 0 1rem;
    
    & .header{
        display: flex;
        align-items: center;
        height: 55px;
        width: 100%;
        background-color: var(--bg-color-gray);
        color: var(--text-color-dark);

        & .title-process{
            font-weight: 700;
            font-size: 18px;
        }
    }
}

#main-phases{
    display: flex;
    height: 100%;
    padding: 1rem 1rem 1rem;
    gap: .5rem;
    background: transparent;
    width: 100%;
    overflow: auto;
}


#main-phases::-webkit-scrollbar{
    width: 4px;
    height: 6px;
}
#main-phases::-webkit-scrollbar-track{
    background-color: transparent;
}
#main-phases::-webkit-scrollbar-thumb{
    background-color: var(--text-color-dark);
    border-radius: 20px;
}

</style>