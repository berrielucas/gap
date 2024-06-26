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

.btn-add {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: var(--text-color-light);
  background-color: var(--bg-color-dark);
  text-transform: initial;
  
  & h4{
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-family) !important;
    /* border: solid 1px red;        */
    font-weight: 600;
    font-size: 16px;
    min-width: 90px;
  }

  *{
    margin: 0;
    padding: 0;
    display: flex
  }
}

</style>