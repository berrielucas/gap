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
const tab = ref("phases");
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


const verify = computed(() => {
  if (newFollowup.value) {
    return followup.value.name !== "" ? true : false;
  }
  return followupOrigin !== JSON.stringify(followup.value) ? true : false;
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
    tab.value = "phases";
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
        style="display: flex; max-width: 1300px; max-height: 750px; height: 100vh; width: 100%; border-radius: 20px; color: var(--text-color-dark); align-self: center; ">
        <!-- Titulo/Header do Popup -->
        <v-card-title elevation="3"
          style="display: flex; align-items: center; justify-content: space-between; padding: .2rem .5rem .2rem .5rem; background-color: var(--bg-color-gray); color: var(--primary-color); box-shadow: 0 0 5px #939393;">
          <h4>{{ title }}</h4>
          <span>
            <v-btn v-show="verify" class="me-2 text-none" :text="newFollowup ? 'Salvar' : 'Salvar alterações'"
              :color="newFollowup ? '#00b5d9' : 'warning'" prepend-icon="mdi-check" variant="tonal"
              density="comfortable" style="border-radius: 10px; margin-right: .5rem; border: solid 1px;"></v-btn>
            <v-btn icon="mdi-close" variant="text" density="comfortable"
              style="border-radius: 10px; color: var(--primary-color);" @click="closeDialog"></v-btn>
          </span>
        </v-card-title>

        <!-- Content -->
        <v-card-text style="display: flexbox; gap: 1rem; padding: 1rem; height: 100%; overflow: hidden;">

          <div style="display: flex; gap: 1rem; height: 100%; width: 100%; overflow: hidden;">

            <v-col cols="12" sm="4" style="padding: 0;">
              <v-row dense>
                <!-- <v-col cols="12" sm="12">
                  <InputText v-model="followup.codigo" text="Código" :required="false" />
                </v-col> -->
                <v-col cols="12" sm="12">
                  <InputText density="comfortable" :single_line="true" v-model="followup.name" text="Nome *"
                    :required="true" />
                </v-col>
              </v-row>
            </v-col>

            <div style="display: flexbox; height: 100%; width: 100%;">
              <div style="overflow: hidden; height: 100%; width: 100%;">

                <v-tabs v-model="tab"
                  style="color: var(--text-color-dark); background-color: var(--bg-color-gray); color: var(--primary-color);">
                  <v-tab value="phases"><button style="font-size: 16px; font-weight: 600;">Etapas</button></v-tab>
                  <v-tab value="properties"><button
                      style="font-size: 16px; font-weight: 600;">Propriedades</button></v-tab>
                </v-tabs>

                <v-window v-model="tab" style="height: 90%; overflow-y: auto;">

                  <v-window-item value="phases">
                    <v-container fluid>

                      <draggable tag="ul" class="list-group" handle=".handle" item-key="id" :list="followup.phases"
                        v-bind="dragOptions" @start="drag = true" @end="drag = false">
                        <template #item="{ element }">
                          <li class="list-group-item">
                            <v-icon class="handle" icon="mdi-swap-vertical"></v-icon>
                            <div style="overflow-y: hidden; width: 100%;">
                              <v-text-field density="comfortable" variant="solo" hide-details
                                v-model="element.title"></v-text-field>
                            </div>

                            <!-- <v-menu transition="slide-y-transition" :close-on-content-click="false">
                              <template v-slot:activator="{ props }">
                                <v-avatar :color="element.color" size="23"v-bind="props" style="margin-right: .5rem;"></v-avatar>
                              </template>
                    <v-list
                      style="margin: .5rem .3rem 0 -.3rem; padding: 0; background-color: var(--bg-color-dark); color: var(--text-color-light);">
                      <v-color-picker v-model:mode="modeColor" v-model="element.color"></v-color-picker>
                    </v-list>
                    </v-menu> -->

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

                  <v-window-item value="properties">
                    <v-container fluid>

                      <p>Propriedades aqui</p>

                    </v-container>
                  </v-window-item>

                </v-window>
              </div>
            </div>


          </div>

        </v-card-text>


        <!-- Footer -->
        <!-- <v-divider></v-divider> -->
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions> -->

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
  min-height: 20px;
  list-style: none;
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
</style>