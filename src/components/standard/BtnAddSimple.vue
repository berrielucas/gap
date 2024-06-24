<script setup>
defineProps({
  dialog: {
    type: Boolean,
    required: false,
    default: false
  },
  prop: {
    type: Object,
    required: false
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <v-btn class="btn-add" elevation="3"  v-bind="dialog ? prop : null">
    <h4>{{ text }}</h4>
  </v-btn>
</template>

<style scoped>

.btn-add{
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background-color: var(--bg-color-dark);
  color: var(--text-color-light);
  text-transform: initial;
  
  & h4{
    font-family: var(--font-family) !important;
    font-weight: 600;
    font-size: 17px;
    min-width: 90px;
  }
}

</style>