<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useCounterStore } from "../../stores/counter.js";
import draggable from "vuedraggable";
import BtnAddSimple from "../standard/BtnAddSimple.vue";
import InputText from "../standard/InputText.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

// Configs
const store = useCounterStore();
const newFollowup = ref(route.meta.new);
const dialog = ref(true);
const dialogConfirm = ref(false);
const messageConfirm = ref("");
const tab = ref("general");
const drag = ref(false);
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: disable.value,
    ghostClass: "ghost",
  };
});

const model = newFollowup.value
  ? {
      codigo: null,
      name: "",
      phases: [
        {
          id: `1.${Date.now()}.${store.user._id}`,
          title: "Primeira Etapa",
          color: "#ededed",
          visible: true,
        },
        {
          id: `2.${Date.now()}.${store.user._id}`,
          title: "Segunda Etapa",
          color: "#ededed",
          visible: true,
        },
        {
          id: `3.${Date.now()}.${store.user._id}`,
          title: "Terceira Etapa",
          color: "#ededed",
          visible: true,
        },
      ],
      environment_id: store.environments.filter((e) => e.url === route.params.name).length > 0 ? store.environments.filter((e) => e.url === route.params.name)[0]._id : null,
    }
  : store.followup.filter((p) => p._id === route.params.idFollowup)[0];

const followupOrigin = JSON.stringify(model);
const followup = ref(model);

function removeAt(idx) {
  if ((!newFollowup.value && store.user.environment.filter(e=>e.id===followup.value.environment_id)[0].permissions.includes('edit-followup'))||(newFollowup.value && store.user.environment.filter(e=>e.id===followup.value.environment_id)[0].permissions.includes('create-followup'))) {
    followup.value.phases = followup.value.phases.filter((i) => i.id !== idx);
  }
}

function addPhase() {
  if ((!newFollowup.value && store.user.environment.filter(e=>e.id===followup.value.environment_id)[0].permissions.includes('edit-followup'))||(newFollowup.value && store.user.environment.filter(e=>e.id===followup.value.environment_id)[0].permissions.includes('create-followup'))) {
    followup.value.phases.unshift({
      id: `${followup.value.phases.length + 1}.${Date.now()}.${store.user._id}`,
      title: "Nova Etapa",
      color: "#ededed",
      visible: true,
    });
  }
}

function saveFollowup() {
  if (newFollowup.value) {
    if (store.user.environment.filter(e=>e.id===followup.value.environment_id)[0].permissions.includes('create-followup')) {
      store.createFollowup(router, followup.value);
      followup.value = JSON.parse(followupOrigin);
    } else {
      router.push(`/${route.params.name}/`);
    }
  } else {
    if (store.user.environment.filter(e=>e.id===followup.value.environment_id)[0].permissions.includes('edit-followup')) {
      store.updateFollowup(route.params.idFollowup, followup.value, followup.value.environment_id, router);
    } else {
      router.push({
        name: "followup-unique",
        params: { idFollowup: route.params.idFollowup },
      });
    }
  }
  dialogConfirm.value = false;
  messageConfirm.value = "";
}

const verify = computed(() => {
  if (newFollowup.value) {
    return followup.value.name !== "" && followup.value.phases.length > 0 ? false : true;
  }
  return followupOrigin !== JSON.stringify(followup.value) && followup.value.name !== "" ? false : true;
});

const disable = computed(() => {
  return ((!newFollowup.value && store.user.environment.filter(e=>e.id===followup.value.environment_id)[0].permissions.includes('edit-followup'))||(newFollowup.value && store.user.environment.filter(e=>e.id===followup.value.environment_id)[0].permissions.includes('create-followup'))) ? false : true;
});

const vIf = computed(() => {
  return ((!newFollowup.value && store.user.environment.filter(e=>e.id===followup.value.environment_id)[0].permissions.includes('edit-followup'))||(newFollowup.value && store.user.environment.filter(e=>e.id===followup.value.environment_id)[0].permissions.includes('create-followup'))) ? true : false;
});

function closeDialog() {
  if (vIf.value) {
    if (followupOrigin !== JSON.stringify(followup.value) && dialogConfirm.value === false) {
      messageConfirm.value = newFollowup.value ? "Você ainda não salvou o seguimento, deseja mesmo sair?" : "Você tem alterações ainda não salvas, deseja mesmo sair?";
      dialogConfirm.value = true;
    } else {
      Object.keys(followup.value).forEach(element => {
        followup.value[`${element}`] = JSON.parse(followupOrigin)[`${element}`];
      });
      dialogConfirm.value = false;
      messageConfirm.value = "";
      if (!newFollowup.value) {
        router.push({ name: "followup-unique", params: { idFollowup: route.params.idFollowup } });
      } else {
        router.push(`/${route.params.name}/`);
      }
    }
  } else {
    if (!newFollowup.value) {
      router.push({ name: "followup-unique", params: { idFollowup: route.params.idFollowup } });
    } else {
      router.push(`/${route.params.name}/`);
    }
  }
}
</script>

<template>
  <div>

    <!-- Popup Confirm -->
    <v-dialog v-model="dialogConfirm" width="auto" persistent>
      <v-card max-width="392" style="border-radius: 20px">
        <v-banner style="font-size: 15px; width: 100%; color: var(--text-color-dark)">
          <template v-slot:prepend>
            <v-icon size="40">mdi-weather-cloudy-clock</v-icon>
          </template>
          <p>{{ messageConfirm }}</p>
        </v-banner>
        <template v-slot:actions>
          <v-btn density="comfortable" class=" text-none" text="Cancelar" style="border-radius: 5px; border: solid 1px" @click="dialogConfirm = false"></v-btn>
          <v-btn class=" text-none" text="Salvar e sair" color="success" variant="tonal" density="comfortable" style="border-radius: 5px" @click="saveFollowup"></v-btn>
          <v-btn class="me-2 text-none" text="Sair mesmo assim" color="error" variant="tonal" density="comfortable" style="border-radius: 5px" @click="closeDialog"></v-btn>
        </template>
      </v-card>
    </v-dialog>

    <!-- Popup principal -->
    <v-dialog v-model="dialog" style="padding: 0; margin: 0" persistent>
      <v-card style="display: flex; max-width: 1000px; max-height: 600px; height: 100vh; width: 100%; border-radius: 20px; color: var(--text-color-dark); align-self: center">
        <!-- Titulo/Header do Popup -->
        <v-card-title
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.2rem 0.5rem 0.2rem 0.5rem;
            background-color: var(--bg-color-gray);
            color: var(--primary-color);
            box-shadow: 0 0 5px #939393;
            z-index: 1000;
          "
        >
          <h4>{{ !newFollowup ? `Configurações do seguimento ➜ ` + followup.name : `Novo Seguimento` }}</h4>
          <span>
            <v-btn icon="mdi-close" variant="text" density="comfortable" style="border-radius: 10px; color: var(--primary-color)" @click="closeDialog"></v-btn>
          </span>
        </v-card-title>

        <v-divider></v-divider>

        <!-- Content -->
        <v-card-text style="display: flexbox; padding: 0; gap: 1rem; height: 100%; overflow: hidden">
          <div style="display: flex; gap: 1rem; height: 100%; width: 100%; overflow: hidden">
            <div style="display: flexbox; height: 100%; width: 100%; position: relative">
              <div style="overflow: hidden; height: 100%; width: 100%">
                <v-tabs v-model="tab" style="position: relative; color: var(--text-color-dark)">
                  <v-tab value="general"><button style="font-size: 16px; font-weight: 600">Configurações gerais</button></v-tab>
                  <v-tab value="phases"><button style="font-size: 16px; font-weight: 600">Etapas</button></v-tab>
                  <!-- <v-tab value="properties"><button style="font-size: 16px; font-weight: 600;">Propriedades</button></v-tab> -->
                </v-tabs>
                <v-divider></v-divider>
                <v-window v-model="tab" style="flex-grow: 1; height: 100%; width: 100%">
                  <v-window-item value="general">
                    <v-container fluid>
                      <v-col cols="12" sm="4" style="padding: 0">
                        <v-row dense>
                          <v-col cols="12" sm="12">
                            <InputText :disabled="disable" v-model="followup.name" text="Nome *" :required="true" />
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-container>
                  </v-window-item>

                  <v-window-item value="phases" style="height: 90%; width: 100%; overflow-y: auto">
                    <v-container fluid>
                      <p v-if="followup.phases.length > 0" class="mt-3" style="text-align: center; color: #a7a7a7; font-size: large"><b>Organize ou crie etapas para seu seguimento</b></p>
                      <p v-else class="mt-3" style="text-align: center; color: #a7a7a7; font-size: large"><b>É necessário criar ao menos uma etapa</b></p>
                      <draggable tag="ul" class="list-group mt-4" handle=".handle" item-key="id" :list="followup.phases" v-bind="dragOptions" @start="drag = true" @end="drag = false">
                        <template #item="{ element }">
                          <li class="list-group-item">
                            <v-icon class="handle" icon="mdi-swap-vertical"></v-icon>
                            <div style="overflow-y: hidden; width: 100%">
                              <v-text-field :disabled="disable" density="comfortable" variant="solo" hide-details v-model="element.title"></v-text-field>
                            </div>

                            <v-btn
                              v-if="vIf"
                              :disabled="disable"
                              class="trash"
                              :icon="element.visible ? 'mdi-eye' : 'mdi-eye-off'"
                              variant="text"
                              density="compact"
                              style="border-radius: 10px; color: var(--text-color-dark); font-size: 14px; margin-right: 0.3rem"
                              @click="element.visible = !element.visible"
                            ></v-btn>

                            <v-btn
                              v-if="vIf"
                              :disabled="disable"
                              class="trash"
                              icon="mdi-trash-can"
                              variant="text"
                              density="compact"
                              style="border-radius: 10px; color: var(--text-color-dark); margin-right: 0.5rem; font-size: 14px"
                              @click="removeAt(element.id)"
                            ></v-btn>
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
              <v-btn v-if="vIf" :disabled="disable" v-show="tab === 'phases'" @click="addPhase()" variant="text" text="Adicionar" density="default" class="ml-auto text-none mr-4 btn-add-phase">
                <template v-slot:prepend>
                  <v-icon style="display: flex; font-size: x-large; align-self: end" class="mr-1">mdi-plus</v-icon>
                </template>
                <button style="display: flex">Adicionar Etapa</button>
              </v-btn>
            </div>
          </div>
        </v-card-text>

        <!-- Footer -->
        <v-divider></v-divider>
        <v-card-actions v-if="vIf">
          <v-spacer></v-spacer>
          <v-btn
            v-if="vIf"
            :disabled="verify"
            @click="saveFollowup"
            class="text-none mr-2 mt-1 mb-1"
            text="Salvar"
            variant="text"
            style="border-radius: 10px; color: var(--text-color-light); background-color: var(--button-color); font-size: 17px; min-width: 100px; height: 40px"
          ></v-btn>
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
  padding-inline: 0.5rem;
  font-size: 19px;
  font-weight: 500;
}

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
  opacity: 0.2;
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
  padding: 0.3rem 1rem;
  border-bottom: solid 1px #dcdcdc;
}

.handle {
  cursor: grab;
}

.handle:active {
  cursor: grabbing;
}

.btn-add-phase {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0.3rem;
  right: 0rem;
  font-size: 17px;
  color: var(--button-color);
  border-radius: 20px;
}
</style>
