<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
const router = useRouter();
const route = useRoute();
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
    document.querySelectorAll('.model-task').forEach(e => { e.style.display = 'none'; })
}
</script>

<template>
    <div :id="id" class="card-item" @dragend="clear()" draggable="true" @dragstart="store.dragTask($event)">
        <v-btn @click="store.deleteTask(card._id, route.params.idFollowup);" class="btn-trash actions" style=""
            icon="mdi-trash-can" size="26"></v-btn>
        <v-btn @click="router.push({ name: 'task-unique', params: { idTask: card._id } })" class="btn-edit actions" style=""
            icon="mdi-pencil" size="26"></v-btn>
        <div class="content">
            <p class="mb-1" style="font-size: 16px; font-weight: 400; font-style: italic;"><b>{{ card.title }}</b></p>
            <v-divider></v-divider>
            <p v-if="card.description!==''&&card.description!==null"><b>Descrição: </b>{{ card.description }}</p>
            <p><b>Criado em: </b>{{ new Date(card.createAt).toLocaleDateString() }}</p>
        </div>
    </div>
</template>

<style scoped>
.card-item {
    position: relative;
    transition: all .2s ease-in-out;
}

.content {
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

.content:active>.etapa-cards:hover {
    cursor: grabbing !important;
}

.actions {
    display: none;
    position: absolute;
    font-size: 10px;
    background-color: var(--text-color-dark);
    color: var(--text-color-light);
    z-index: 10;
}

.btn-edit {
    top: .4rem;
    right: .5rem;
}

.btn-trash {
    top: .4rem;
    right: 2.5rem;
}

.card-item:hover .btn-edit,
.card-item:hover .btn-trash {
    display: flex;
}
</style>