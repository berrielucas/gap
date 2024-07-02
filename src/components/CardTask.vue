<script setup>
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter';
import router from '@/router';
const store = useCounterStore();
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
});

const card = ref(JSON.parse(props.content));
function clear() {
    document.querySelectorAll('.model-task').forEach(e=>{e.style.display='none';})
}
</script>

<template>
    <div :id="id" class="card-item" @dragend="clear()" draggable="true" @dragstart="store.dragTask($event)">
        <v-btn @click="router.push({name:'task-unique', params: { idTask: card._id }})" class="btn-edit" style="" icon="mdi-pencil" size="26"></v-btn>
        <div class="content">
            <p class="mb-1" style="font-size: 16px; font-weight: 400; font-style: italic;"><b>{{ card.title }}</b></p>
            <v-divider></v-divider>
            <!-- <p><b>Descrição: </b>{{ card.description }}</p> -->
            <p><b>Solicitante: </b>Ricardo Belinato</p>
            <p><b>Responsável: </b>Lucas Berriel</p>
            <p><b>Data: </b>10/06/2005</p>
        </div>
    </div>
</template>

<style scoped>

.card-item {
    position: relative;
    transition: all .2s ease-in-out;
}

.content{
    cursor: grab !important;
    background-color: #fff;
    box-shadow: 0 0 10px #535353; 
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: .5rem;
    position: relative;
    color: var(--text-color-dark);
    gap: .2rem;
    font-size: 15px;
}

.content:active {
    cursor: grabbing !important;
    box-shadow: 0 0 0 transparent !important;
    opacity: .5;
}

.content:active > .etapa-cards:hover { 
    cursor: grabbing !important;
}

.btn-edit{
    display: none; 
    position: absolute;
    top: .4rem;
    right: .5rem; 
    font-size: 10px; 
    background-color: var(--text-color-dark); 
    color: var(--text-color-light); 
    z-index: 10;
}

.card-item:hover .btn-edit{
    display: flex;
}

</style>