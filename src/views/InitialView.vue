<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

</script>


<template>
  <v-empty-state headline="Organize suas Tarefas">
    <template v-slot:media>
      <img src="../assets/sticky-note.svg" width="400" alt="" />
    </template>
    <template v-slot:title>
      <p>Selecione ou <a class="link-new-followup" style="color: var(--button-color); cursor: pointer;" @click="router.push({ name: 'new-followup' })"><b>crie</b></a> um seguimento para organizar suas tarefas de maneira eficiente.</p>
    </template>
  </v-empty-state>
</template>
