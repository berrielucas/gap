<script setup>
import { ref } from 'vue';
const props = defineProps({
  text: {
    type: String,
    required: false
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
  single_line: {
    type: Boolean,
    required: false
  },
})
const value = ref('');
const hide = ref(props.hide_details?props.hide_details:false);
const single = ref(props.single_line?props.single_line:false);
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
    <v-text-field :single-line="single?true:false" v-model="value" :label="text || ''" required :on-update:model-value="$emit('value', value)" :rules="required?rules:undefined" :hide-details="hide?true:false"></v-text-field>
</template>