<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useCounterStore } from '../../stores/counter.js'
import draggable from 'vuedraggable'
import BtnAddSimple from '../standard/BtnAddSimple.vue';
import InputText from '../standard/InputText.vue';
import { useRoute, useRouter } from 'vue-router';
// const emits = defineEmits({});
const route = useRoute();
const router = useRouter();
const props = defineProps({
  envId: {
    type: String,
    required: false
  },
  followupId: {
    type: String,
    required: false
  },
  obj: {
    type: String,
    required: false
  },
  new: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
});
const newFollowup = ref(props.new);

// Configs
const store = useCounterStore();
const dialog = ref(false);
const dialogConfirm = ref(false);
const messageConfirm = ref("");
const tab = ref("general");
const modeColor = ref("hex");
const drag = ref(false);
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
  };
});


const followupOrigin = props.obj;
const followup = ref(JSON.parse(props.obj));

function removeAt(idx) {
  followup.value.phases = followup.value.phases.filter(i => i.id !== idx);
}

function addPhase() {
  followup.value.phases.unshift({
    id: `${followup.value.phases.length+1}.${Date.now}.${store.user._id}`,
    title: "Nova Etapa",
    color: "#ededed",
    visible: true
  });
}


const verify = computed(() => {
  if (newFollowup.value) {
    return followup.value.name !== "" ? false : true;
  }
  return followupOrigin !== JSON.stringify(followup.value) && followup.value.name !== "" ? false : true;
});

function closeDialog() {
  if (followupOrigin !== JSON.stringify(followup.value) && dialogConfirm.value === false) {
    messageConfirm.value = newFollowup.value ? "Você ainda não salvou o seguimento, deseja mesmo sair?" : "Você tem alterações ainda não salvas, deseja mesmo sair?";
    dialogConfirm.value = true;
  } else {
    dialogConfirm.value = false;
    messageConfirm.value = "";
    dialog.value = false;
    followup.value = JSON.parse(followupOrigin);
    tab.value = "general";
  }
}

</script>


<template>
  <div>
    <v-btn v-if="newFollowup" variant="tonal" class="text-none btn-new" flat @click="dialog = true">
      <v-icon icon="mdi-plus"></v-icon>
      <h4>Novo Seguimento</h4>
    </v-btn>
    <v-btn v-else icon="mdi-cog" size="38" variant="elevated"
      style="border-radius: 10px; color: var(--text-color-dark);" @click="dialog = true"></v-btn>

    <!-- Popup Confirm -->
    <v-dialog v-model="dialogConfirm" width="auto" persistent>
      <v-card max-width="350" style="border-radius: 20px;">
        <v-banner style="font-size: 15px; width: 100%; color: var(--text-color-dark);">
          <template v-slot:prepend>
            <v-icon size="40">mdi-weather-cloudy-clock</v-icon>
          </template>
          <p>{{ messageConfirm }}</p>
        </v-banner>
        <template v-slot:actions>
          <v-btn density="comfortable" class="ms-auto text-none" text="Cancelar"
            style="border-radius: 5px; border: solid 1px;" @click="dialogConfirm = false"></v-btn>
          <v-btn class="me-2 text-none" text="Sair mesmo assim" color="error" variant="tonal" density="comfortable"
            style="border-radius: 5px; " @click="closeDialog"></v-btn>
        </template>
      </v-card>
    </v-dialog>

    <!-- Popup principal -->
    <v-dialog v-model="dialog" style="padding: 0; margin: 0;" persistent>
      <v-card
        style="display: flex; max-width: 1000px; max-height: 600px; height: 100vh; width: 100%; border-radius: 20px; color: var(--text-color-dark); align-self: center; ">
        <!-- Titulo/Header do Popup -->
        <v-card-title
          style="display: flex; align-items: center; justify-content: space-between; padding: .2rem .5rem .2rem .5rem; background-color: var(--bg-color-gray); color: var(--primary-color); box-shadow: 0 0 5px #939393; z-index: 1000;">
          <h4>{{ !newFollowup ? title+followup.name : title  }}</h4>
          <span>
            <v-btn icon="mdi-close" variant="text" density="comfortable"
              style="border-radius: 10px; color: var(--primary-color);" @click="closeDialog"></v-btn>
          </span>
        </v-card-title>

        <v-divider></v-divider>

        <!-- Content -->
        <v-card-text style="display: flexbox; padding: 0; gap: 1rem; height: 100%; overflow: hidden;">

          <div style="display: flex; gap: 1rem; height: 100%; width: 100%; overflow: hidden;">

            

            <div style="display: flexbox; height: 100%; width: 100%; position: relative;">
              <div style="overflow: hidden; height: 100%; width: 100%;">

                <v-tabs v-model="tab"
                  style="position: relative; color: var(--text-color-dark);">
                  <v-tab value="general"><button style="font-size: 16px; font-weight: 600;">Configurações gerais</button></v-tab>
                  <v-tab value="phases"><button style="font-size: 16px; font-weight: 600;">Etapas</button></v-tab>
                  <!-- <v-tab value="properties"><button style="font-size: 16px; font-weight: 600;">Propriedades</button></v-tab> -->
                </v-tabs>
                <v-divider></v-divider>
                <v-window v-model="tab" style="flex-grow: 1; height: 100%; width: 100%;">

                  <v-window-item value="general">
                    <v-container fluid>

                      <v-col cols="12" sm="4" style="padding: 0;">
                        <v-row dense>
                          <v-col cols="12" sm="12">
                            <InputText v-model="followup.name" text="Nome *"
                              :required="true" />
                          </v-col>
                        </v-row>
                      </v-col>

                    </v-container>
                  </v-window-item>

                  <v-window-item value="phases" style="height: 90%; width: 100%; overflow-y: auto;">
                    <v-container fluid>
                        <p v-if="followup.phases.length>0" class="mt-3" style="text-align: center; color: #a7a7a7; font-size: large;"><b>Organize ou crie etapas para seu seguimento</b></p>
                        <p v-else class="mt-3" style="text-align: center; color: #a7a7a7; font-size: large;"><b>É necessário criar ao menos uma etapa</b></p>
                        <draggable tag="ul" class="list-group mt-4" handle=".handle" item-key="id" :list="followup.phases"
                          v-bind="dragOptions" @start="drag = true" @end="drag = false">
                          <template #item="{ element }">
                            <li class="list-group-item">
                              <v-icon class="handle" icon="mdi-swap-vertical"></v-icon>
                              <div style="overflow-y: hidden; width: 100%;">
                                <v-text-field density="comfortable" variant="solo" hide-details
                                  v-model="element.title"></v-text-field>
                              </div>
  
                              <v-btn class="trash" :icon="element.visible ? 'mdi-eye' : 'mdi-eye-off'" variant="text"
                                density="compact"
                                style="border-radius: 10px; color: var(--text-color-dark); font-size: 14px; margin-right: .3rem;"
                                @click="element.visible = !element.visible"></v-btn>
  
                              <v-btn class="trash" icon="mdi-trash-can" variant="text" density="compact"
                                style="border-radius: 10px; color: var(--text-color-dark); margin-right: .5rem; font-size: 14px;"
                                @click="removeAt(element.id)"></v-btn>
  
                            </li>
                          </template>
                        </draggable>
                    </v-container>
                  </v-window-item>

                  <!-- Seção propriedade -->
                  <v-window-item value="properties">
                    <v-container fluid>
                      <p>Propriedades aqui</p>
                    </v-container>
                  </v-window-item>

                </v-window>
              </div>

              <!-- Botão de adicionar nova etapa no seguimento -->
              <v-btn v-show="tab==='phases'" @click="addPhase()" variant="text" text="Adicionar" density="default"  class="ml-auto text-none mr-4 btn-add-phase">
                <template v-slot:prepend>
                  <v-icon style="display: flex; font-size: x-large; align-self: end;" class="mr-1">mdi-plus</v-icon>
                </template>
                <button style="display: flex;">Adicionar Etapa</button>
              </v-btn>
            </div>


          </div>

        </v-card-text>


        <!-- Footer -->
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="verify" class="text-none mr-2 mt-1 mb-1" text="Salvar" variant="text" style="border-radius: 10px; color: var(--text-color-light); background-color: var(--button-color); font-size: 17px; min-width: 100px; height: 40px;"></v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
::v-deep ::-webkit-scrollbar {
  width: 4px;
}

::v-deep ::-webkit-scrollbar-thumb {
  width: 4px;
  background-color: #c0c0c0;
}

::v-deep ::-webkit-scrollbar-track {
  background-color: transparent;
}


h4 {
  display: flex;
  font-weight: 500;
  padding-inline: .5rem;
  font-size: 19px;
  font-weight: 500;
}

.btn-new {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: var(--button-color);
  text-transform: initial;
  width: 100%;
  border-radius: 8px;
  border: solid 1px #4FD8F237;

  & h4 {
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
  border: dashed 1px !important;
  border-radius: 5px;
}

.ghost * {
  opacity: .2;
}

.list-group {
  width: 80%;
  min-height: 20px;
  list-style: none;
  margin: auto;
}

.list-group-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-color-dark);
  padding: .3rem 1rem;
  border-bottom: solid 1px #dcdcdc;
}

.handle {
  cursor: grab;
}

.handle:active {
  cursor: grabbing;
}

.btn-add-phase{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: .3rem;
  right: 0rem;
  font-size: 17px;
  color: var(--button-color);
  border-radius: 20px;
}
</style>