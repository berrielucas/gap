<script setup>
import { ref } from 'vue';
defineProps({
  text: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: false
  },
})
const value = ref('');
const show = ref(false);
const rules = ref([
  value => {
    if (value) return true
    return "Campo Obrigatório"
  },
]);
</script>

<template>
    <v-text-field v-model="value" :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" class="input-group--focused" :label="text" @click:append-inner="show = !show" required :on-update:model-value="$emit('value', value)" :rules="required?rules:undefined"></v-text-field>
</template>