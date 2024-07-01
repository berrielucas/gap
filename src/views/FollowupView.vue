<script setup>
import { ref, reactive, onMounted  } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import axios from "axios";
import Phase from "@/components/Phase.vue";
import FollowupConfig from "@/components/popup/FollowupConfig.vue";
import { useCounterStore } from '../stores/counter.js'
const store = useCounterStore();
// const router = useRouter();
const route = useRoute();
store.listAllTasks(route.params.idFollowup);

const search_task = ref("");

</script>

<template>
    <main id="main-view">

        <div id="main-header">

            <v-card elevation="10" class="header" style="border-radius: 10px;">
                <v-list-item style="width: 100%; margin: 0; padding: 0 .7rem;">
                    <v-list-item-title class="title-followup">{{ store.followup.filter(p=>p._id===route.params.idFollowup)[0].name }}</v-list-item-title>
                    <template v-slot:append>
                        <v-btn class="mr-3" icon="mdi-sync" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark);" @click="store.listAllTasks(route.params.idFollowup)" ></v-btn>
                        
                        <v-btn class="mr-3" icon="mdi-plus" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark);"></v-btn>
                        
                        <v-btn class="mr-3" icon="mdi-filter-variant" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark);"></v-btn>

                        <div class="mr-3" style="display: flex; color: var(--text-color-dark); width: 200px; border: solid 1px #bfbfbf; border-radius: 14px; overflow: hidden;">
                            <v-text-field v-model="search_task" density="compact" label="Buscar aqui" variant="solo" single-line hide-details append-inner-icon="mdi-magnify"></v-text-field>
                        </div>

                         <FollowupConfig title="Configurações do projeto" :new="false" :followupId="route.params.idFollowup" :obj="JSON.stringify(store.followup.filter(f=>f._id===route.params.idFollowup)[0])" />
                    </template>
                </v-list-item>
            </v-card>
            
        </div>

        <div id="main-phases">
            <Phase v-for="phase, index in store.followup.filter(p=>p._id===route.params.idFollowup)[0].phases" :key="index" :title="phase.title" :id="phase.id" :tasks="store.tasks.filter(t=>t.phase_id===phase.id&&t.followup_id===route.params.idFollowup)" :search="search_task" />
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

        & .title-followup{
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
    overflow-x: auto;
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