<script setup>
import { ref } from 'vue';
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  modelo: {
    type: String,
    required: false
  },
  required: {
    type: Boolean,
    required: false
  },
  hide_details: {
    type: Boolean,
    required: false
  },
})
const value = ref('');
const hide = ref(false);
const rules = ref([
  value => {
    if (value) return true
    return "Campo Obrigatório"
  },
]);
if (props.modelo!==undefined) {
  value.value = props.modelo;
}
</script>

<template>
    <v-text-field v-model="value" :label="text" required :on-update:model-value="$emit('value', value)" :rules="required?rules:undefined" :hide-details="hide_details?true:false"></v-text-field>
</template>