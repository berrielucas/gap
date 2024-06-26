<script setup>
import { ref } from 'vue';

const url_base = ref(import.meta.env.VITE_URL_BASE_API);

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
});

</script>

<template>
    <div :id="id" :data_url_base="url_base" class="card-item" draggable="true" ondragstart="dragTask(event)">
        <!-- <v-skeleton-loader
            class="mx-auto border w-100"
            type="article"
            style="cursor: grab !important;"
        ></v-skeleton-loader> -->
        <p><b>{{ title }}</b></p>
    </div>
</template>

<style scoped>

.card-item {
    cursor: grab !important;
    background-color: #fff;
    box-shadow: 0 0 10px #535353; 
    display: flex; 
    border-radius: 4px;
    padding: .3rem;
    color: var(--text-color-dark)
}

.card-item:active {
    cursor: grabbing !important;
    box-shadow: 0 0 0 transparent !important;
}

.card-item:active > .etapa-cards:hover { 
    cursor: grabbing !important;
}

</style>