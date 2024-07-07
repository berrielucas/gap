<script setup>
import { ref } from "vue";
import BtnAddSimple from "./standard/BtnAddSimple.vue";
import DateInput from "./standard/DateInput.vue";
const props = defineProps({
  itemsPerPageFilter: {
    type: Number,
    required: false,
  },
  dataFilter: {
    type: Date,
    required: false,
  },
  statusFilter: {
    type: Array,
    required: false,
  },
});
const emit = defineEmits({
  itemsPerPage: null,
  dataRealizada: null,
  status: null,
});
const menu = ref(false);
const itemsPerPage = ref();
const data = ref(null);
const status_filter = ref([]);

function enviarParams() {
  if (itemsPerPage.value === "" || itemsPerPage.value === null || itemsPerPage.value === undefined) {
    itemsPerPage.value = 0;
  }
  emit("itemsPerPage", itemsPerPage.value);
  emit("dataRealizada", data.value);
  emit("status", status_filter.value);
  menu.value = false;
}

if (props.itemsPerPageFilter) {
  itemsPerPage.value = props.itemsPerPageFilter;
}
if (props.dataFilter) {
  data.value = props.dataFilter;
}
if (props.statusFilter) {
  status_filter.value = props.statusFilter;
}
</script>

<template>
  <v-menu location="bottom right" v-model="menu" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="mr-3" size="38" icon="mdi-filter-variant" variant="elevated" style="border-radius: 10px; color: var(--text-color-dark)"></v-btn>
    </template>
    <v-card class="container mt-4">
      <h3 style="font-size: 19px; font-weight: 600; color: var(--text-color)">Novo Filtro</h3>
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-text-field v-model="itemsPerPage" label="Itens por página" hide-details type="number"></v-text-field>
          <!-- <v-number-input :min="0" v-model="itemsPerPage" label="Itens por página" hide-details control-variant="stacked" inset></v-number-input> -->
        </v-col>
        <v-col cols="12" sm="6">
          <DateInput :hide_details="true" text="Data Realizada" v-on:date="data = $event" :modelo="data" />
        </v-col>
        <v-col cols="12" sm="10">
          <v-chip-group selected-class="color" style="color: var(--text-color-dark)" v-model="status_filter" column multiple>
            <v-chip text="Aguardando" value="Ag" variant="outlined" filter></v-chip>
            <v-chip text="Andamento" value="Ad" variant="outlined" filter></v-chip>
            <v-chip text="Finalizado" value="F" variant="outlined" filter></v-chip>
          </v-chip-group>
        </v-col>
        <!-- <v-col cols="12" sm="5"> -->
        <BtnAddSimple style="margin-left: auto; margin-right: 0; margin-block: auto; background-color: var(--primary-color)" text="Aplicar" @click="enviarParams" />
        <!-- </v-col> -->
      </v-row>
    </v-card>
  </v-menu>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  /* box-shadow: 0 3px 5px rgb(196, 196, 196); */
  box-shadow: 0 0;
  padding: 1rem;
  background-color: white;
  width: 500px;
  gap: 1rem;
}

.color {
  color: var(--button-color);
}
</style>
