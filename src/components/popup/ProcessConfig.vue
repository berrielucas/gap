<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import draggable from 'vuedraggable'
// import BtnPersonalizado from '../standard/BtnPersonalizado.vue';
import BtnAddSimple from '../standard/BtnAddSimple.vue';
import InputText from '../standard/InputText.vue';
import { normalizeClass } from 'vue';
const dialog = ref(false);

const props = defineProps({
  new: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
});
const emits = defineEmits({
  enviar_paramns: null,
});

const newProcess = ref(props.new);


function adicionarCampo() {
  emits('enviar_paramns', "");
}



const drag = ref(false);
const itens = ref([
  {
    id: "01",
    name: "Lucas Berriel"
  },
  {
    id: "02",
    name: "Letícia Lima"
  },
]);
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
  };
});
function removeAt(idx) {
  itens.value.splice(idx, 1);
}


const tab = ref("phases");

</script>


<template>
  <div>
    <v-dialog v-model="dialog" max-width="1000" style="height: 500px;" persistent locatio>
      <template v-slot:activator="{ props: activatorProps }">

        <!-- <v-btn v-if="new" text="Novo" prepend-icon="mdi-plus" variant="tonal" style="border-radius: 10px; background-color: var(--button-color); color: var(--text-color-dark);" v-bind="activatorProps"></v-btn> -->

        <v-btn v-if="newProcess" variant="tonal" class="text-none btn-new" flat v-bind="activatorProps">
            <v-icon icon="mdi-plus"></v-icon>
            <h4>Novo Projeto</h4>
        </v-btn>

        <v-btn v-else icon="mdi-cog" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark);" v-bind="activatorProps"></v-btn>
      </template>

      
      <v-card style="color: var(--text-color);">
        <v-card-title elevation="3" style="display: flex; align-items: center; justify-content: space-between; padding: .2rem .5rem .2rem .5rem; background-color: var(--bg-color-gray); color: var(--text-color-dark); box-shadow: 0 0 5px #939393;" >
            <h4>{{ title }}</h4>
            <v-btn icon="mdi-close" variant="text" density="comfortable" style="border-radius: 10px; color: var(--text-color-dark);" @click="dialog=false"></v-btn>
        </v-card-title>
        <v-card-text style="padding: 1rem; height: 500px;">
          <v-row dense>
            <v-col cols="12" sm="4">
              <v-row dense>
                <v-col cols="12" sm="12">
                  <InputText text="Código" :required="false" />
                </v-col>
                <v-col cols="12" sm="12">
                  <InputText text="Nome *" :required="true" />
                </v-col>
              </v-row>
            </v-col>
<!-- 
            



v-bind="dragOptions"




-->


            <v-col cols="12" sm="8">
              <v-tabs
                v-model="tab"
                style="color: var(--text-color-dark); background-color: var(--bg-color-gray); "
              >
                <v-tab value="phases" ><button style="font-size: 16px; font-weight: 600;">Etapas</button></v-tab>
                <v-tab value="properties"  ><button style="font-size: 16px; font-weight: 600;">Propriedades</button></v-tab>
              </v-tabs>

              <v-window v-model="tab">

                <v-window-item value="phases">
                  <v-container fluid>

                    <draggable
                      tag="ul"
                      class="list-group"
                      handle=".handle"
                      item-key="id"
                      :list="itens"
                      v-bind="dragOptions"
                      @start="drag = true"
                      @end="drag = false"
                    >
                      <template #item="{ element }">
                        <li class="list-group-item">
                          <v-icon class="handle" icon="mdi-dots-grid"></v-icon>
                          <div style="overflow-y: hidden; width: 100%;">
                            <v-text-field density="comfortable" variant="solo" hide-details v-model="element.name"></v-text-field>
                          </div>
                          <v-btn class="trash" icon="mdi-trash-can" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark); margin-right: .5rem; font-size: 14px;"  @click="removeAt(index)"></v-btn>
                        </li>
                      </template>
                    </draggable>
                  </v-container>
                </v-window-item>

                <v-window-item value="properties">
                  <v-container fluid>

                    <p>Propriedades aqui</p>
                    
                  </v-container>
                </v-window-item>

              </v-window>
              
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <BtnAddSimple style="margin: 0rem .4rem;" @click="adicionarCampo" text="Salvar"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>

h4{
  display: flex;
  font-weight: 500;
  padding-inline: .5rem;
  font-size: 19px; 
  font-weight: 500;
}

.btn-new{
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  /* background-color: var(--bg-color-dark); */
  color: var(--button-color);
  text-transform: initial;
  width: 100%;
  border-radius: 8px;
  border: solid 1px #00c79c37;
  
  & h4{
    font-family: var(--font-family) !important;
    font-weight: 600;
    font-size: 16px;
    min-width: 90px;
  }
}


/*  */

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.7;
  background: #c8ebfb41;
  border: dashed 1px;
}

.ghost * {
  opacity: .2;
}

.list-group {
  min-height: 20px;
  list-style: none;
}

.list-group-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-color-dark);
  padding: 0rem 1rem;
}

.handle {
  cursor: grab;
}

.handle:active {
  cursor: grabbing;
}


</style>