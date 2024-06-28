<script setup>

import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from '../stores/counter.js'
const store = useCounterStore();
const router = useRouter();
</script>

<template>
    <v-main>

        <p>{{ store.environments }}</p>
    </v-main>
</template>