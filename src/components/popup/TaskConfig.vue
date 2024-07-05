<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useCounterStore } from '../../stores/counter.js'
import BtnAddSimple from '../standard/BtnAddSimple.vue';
import InputText from '../standard/InputText.vue';
import { useRoute, useRouter } from 'vue-router';

// Configs
const route = useRoute();
const router = useRouter();
const store = useCounterStore();
const dialog = ref(true);
const dialogConfirm = ref(false);

// onMounted(()=>{
//   store.getTask(route.params.idTask, route.params.idFollowup);
// });

const task = ref(store.tasks[`${route.params.idFollowup}`].filter(t => t._id === route.params.idTask)[0]);
const modelTaskOrigin = JSON.stringify(store.tasks[`${route.params.idFollowup}`].filter(t => t._id === route.params.idTask)[0]);

function closeTask() {
  if (modelTaskOrigin!==JSON.stringify(task.value)) {
    console.log("alterado");
    store.updateTask(
      JSON.parse(modelTaskOrigin)._id, 
      {
        title: task.value.title, 
        description: task.value.description,
        subTasks: task.value.subTasks,
        comments: task.value.comments,
        properties: task.value.properties,
        phase_id: task.value.phase_id,
      }, 
      route.params.idFollowup, 
      router
    );
  } else {
    console.log("original");
    router.push({ name: 'followup-unique', params: { idFollowup: route.params.idFollowup } });
  }

}

function deleteTask() {
  store.deleteTask(JSON.parse(modelTaskOrigin)._id, route.params.idFollowup);
  router.push({ name: 'followup-unique', params: { idFollowup: route.params.idFollowup } });
}

function removeSubTask(idx) {
  task.value.subTasks = task.value.subTasks.filter(i => i.id !== idx);
}

function addSubTask() {
    task.value.subTasks.unshift({
      id: `${task.value.subTasks.length+1}.${store.user._id}.${Date.now()}`,
      title: `Subtarefa ${task.value.subTasks.length+1}`,
      complete: false
    });
}


</script>


<template>

  <v-dialog v-model="dialogConfirm" width="auto" persistent>
    <v-card max-width="350" style="border-radius: 20px;">
      <v-banner style="font-size: 15px; width: 100%; color: var(--text-color-dark);">
        <template v-slot:prepend>
          <v-icon size="40">mdi-alert</v-icon>
        </template>
        <p>Deseja realmente excluir a tarefa <b>{{ task.title }}</b></p>
      </v-banner>
      <template v-slot:actions>
        <v-btn density="comfortable" class="ms-auto text-none" text="Cancelar"
          style="border-radius: 5px; border: solid 1px;" @click="dialogConfirm = false"></v-btn>
        <v-btn class="me-2 text-none" text="Excluir" color="error" variant="tonal" density="comfortable"
          style="border-radius: 5px; " @click="deleteTask(); dialogConfirm=false;"></v-btn>
      </template>
    </v-card>
  </v-dialog>

  <!-- Popup principal -->
  <v-dialog v-model="dialog" style="padding: 0; margin: 0; width: auto;" persistent>
    <!-- <v-btn icon="mdi-chevron-double-left" style="display: flex; position: absolute; top: 50%; left: 0;"></v-btn> -->
    <!-- <v-btn icon="mdi-chevron-double-right" style="display: flex; position: absolute; top: 50%; right: 0;"></v-btn> -->

    <v-card
      style=" display: flex; max-height: 750px; height: 100vh;  width: 900px; border-radius: 20px; color: var(--text-color-dark); align-self: center; justify-self: center; background-color: #f9f9f9;">

      <!-- Titulo/Header do Popup -->
      <v-card-title elevation="3"
        style="display: flex; align-items: start; justify-content: end; padding: .2rem .5rem 0 .5rem;">
        <span>
          <v-icon class="mt-5 ml-4" size="29">mdi-note-text-outline</v-icon>
        </span>
        <v-textarea v-model="task.title" class="title-task" style="width: 100%;" placeholder="Nova Tarefa"
          single-line hide-details maxlength="60" variant="solo" rows="1" auto-grow shaped></v-textarea>
        <span>
          <v-btn icon="mdi-close" class="mt-4 mr-4" variant="text" size="30" density="comfortable"
            style="border-radius: 10px;"
            @click="closeTask()"></v-btn>
        </span>
      </v-card-title>

      <!-- Content -->
      <v-card-text style="display: flex; gap: 1rem; padding: 0 0 1rem 1rem; overflow: hidden; position: relative;">
        <v-row>

          <!-- Seção 01 -->
          <v-col cols="12" sm="8"
            style="padding-right: 0; display: flex; flex-direction: column; height: 100%; position: relative;">

            <div style="height: 100%; overflow-y: auto; padding-bottom: 100px;">

              <!-- Desciption -->
              <div style="display: flex;">
                <span style="color: #a7a7a7;">
                  <v-icon class="mt-2 ml-2" size="29">mdi-text-long</v-icon>
                </span>
                <div style="width: 100%;">
                  <h3 class="mt-2 ml-4" style="color: #aaaaaa; font-weight: 400;"><b>Descrição</b></h3>
                  <v-textarea v-model="task.description" class="description-task" style="width: 100%;"
                    placeholder="Escreva aqui ..." hide-details maxlength="500" variant="solo" rows="1" auto-grow
                    shaped></v-textarea>
                </div>
              </div>

              <v-divider></v-divider>

              <!-- Sub Task -->
              <div class="mt-6 mb-6" style="display: flex;">
                <span style="color: #a7a7a7;">
                  <v-icon class="mt-2 ml-2" size="29">mdi-checkbox-multiple-marked-circle-outline</v-icon>
                </span>
                <div style="width: 100%;">
                  <h3 class="mt-2 ml-4 mb-3"
                    style="color: #aaaaaa; font-weight: 400; display: flex; align-items: center;">
                    <b>Sub Tarefas</b>
                    <v-btn @click="addSubTask()" variant="text" density="compact" icon="mdi-plus" class="ml-auto mr-4"></v-btn>
                  </h3>

                  <v-card elevation="0" style="background-color: transparent;">
                    <v-slide-x-transition class="py-0" tag="v-list" group>
                      <template v-if="task.subTasks.length > 0" v-for="(st, i) in task.subTasks" :key="st.id">
                        <v-list-item class="checkbox">
                          <template v-slot:prepend>
                            <v-checkbox-btn v-model="st.complete" color="grey"></v-checkbox-btn>
                          </template>

                          <!-- <span :class="st.complete ? 'text-grey' : 'text-primary'">{{ st.title }}</span> -->

                          <div style="display: flex; height: auto; align-items: center; flex-grow: 1; color: var(--text-color-dark); overflow: hidden;">
                            <v-textarea :style="st.complete ? 'color: blue !important;' : 'color: red'" class="input-subtarefa" density="compact" v-model="st.title" placeholder="Nova Subtarefa" variant="solo" single-line hide-details rows="1" auto-grow shaped> 
                            </v-textarea>
                          </div>

                          <template v-slot:append>
                            <v-scale-transition>
                              <v-icon v-if="st.complete" color="success">mdi-check</v-icon>
                              <v-icon class="trash" v-if="!st.complete" icon="mdi-trash-can" variant="text"
                                density="comfortable" @click="removeSubTask(st.id)"></v-icon>
                            </v-scale-transition>
                          </template>
                        </v-list-item>
                      </template>
                    </v-slide-x-transition>
                  </v-card>
                  
                </div>
              </div>
              <v-scale-transition class="py-0" tag="v-list">
                <v-list-item v-if="task.subTasks.length===0">
                  <p class="mt-6 mb-6" style="opacity: .5; text-align: center;">Nenhuma tarefa vinculada</p>
                </v-list-item>
              </v-scale-transition>

              <v-divider></v-divider>

              <!-- Comments -->
              <div class="mt-6 mb-6" style="display: flex;">
                <span style="color: #a7a7a7;">
                  <v-icon class="mt-2 ml-2" size="29">mdi-comment-text-multiple-outline</v-icon>
                </span>
                <div style="width: 100%;">
                  <h3 class="mt-2 ml-4" style="color: #aaaaaa; font-weight: 400;"><b>Comentários</b></h3>
                </div>
              </div>
              <v-scale-transition class="py-0" tag="v-list">
                <v-list-item v-if="task.comments.length===0">
                  <p class="mt-6" style="opacity: .5; text-align: center;">Nenhum comentário</p>
                </v-list-item>
              </v-scale-transition>
              <!-- {{ task }} -->
            </div>


            <!-- Input de Comentario -->
            <div class="ml-4 mr-4 mb-3 mt-3"
              style="display: flex; align-items: end; gap: .5rem; position: absolute;  bottom: 0 !important; left: 0; right: 0;">
              <div
                style="display: flex; height: auto; align-items: center; flex-grow: 1; color: var(--text-color-dark); border: solid 1px #bfbfbf; border-radius: 10px; overflow: hidden;">
                <v-textarea density="compact" placeholder="Comente aqui..." variant="solo" single-line hide-details
                  max-rows="4" rows="1" auto-grow shaped>
                </v-textarea>
              </div>
              <v-btn size="42" icon="mdi-send" variant="text"
                style="display: flex; border-radius: 10px; color: var(--text-color-light); background-color: var(--button-color); font-size: 15px;"></v-btn>
            </div>

          </v-col>



          <!-- Seção 02 -->
          <v-col cols="12" sm="4"
            style="display: flex; flex-direction: column; border-left: solid 1px #dedede; max-height: 100%; width: 100%; overflow-y: auto;">

            <v-btn class="text-none ml-auto mr-3 mb-3" @click="dialogConfirm=true;" append-icon="mdi-trash-can" text="Excluir" variant="tonal"
                style="display: flex; border-radius: 10px; color: red; font-size: 15px; "></v-btn>

            <!-- Definições -->
            <p class="mt-1 ml-1" style="color: #aaaaaa; font-weight: 400;"><b>Definições</b></p>

            <!-- Input Etapa -->
            <div class="selects mt-3 mr-3">
              <v-select v-model="task.phase_id" density="comfortable" variant="solo" label="Etapa"
                item-title="title" item-value="id"
                :items="store.followup.filter(f => f._id === route.params.idFollowup)[0].phases" single-line
                hide-details>
                <template v-slot:prepend-inner>
                  <v-icon class="mr-1">mdi-list-status</v-icon>
                </template>
              </v-select>
            </div>

            <!-- Input Membros -->
            <!-- <div class="selects-tasks mt-3 mr-3">
              <v-select density="comfortable" variant="solo" placeholder="Membros" :items="['Teste']" single-line
                hide-details>
                <template v-slot:prepend-inner>
                  <v-icon class="mr-1">mdi-account-group</v-icon>
                </template>
              </v-select>
            </div> -->

            <!-- Propriedades -->
            <p class="mt-6 ml-1 mb-6" style="color: #aaaaaa; font-weight: 400;"><b>Propriedades</b></p>

            <p v-if="task.properties.length===0" class="mt-6" style="opacity: .5; text-align: center;">Sem propriedades</p>

            <!-- Seção de Propriedades -->
            <div style="height: 100%; overflow: auto;">
              
              <!-- <div class="selects mt-3 mr-3">
                <v-select density="comfortable" variant="solo" placeholder="Membros" :items="['Teste']" single-line hide-details>
                  <template v-slot:prepend-inner>
                    <v-icon class="mr-1">mdi-account-group</v-icon>
                  </template>
                </v-select>
              </div> -->
            </div>

          </v-col>
        </v-row>

      </v-card-text>


      <!-- Footer -->
      <!-- <v-divider></v-divider> -->
      <!-- <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions> -->

    </v-card>
  </v-dialog>
</template>

<style scoped>
::v-deep ::-webkit-scrollbar {
  width: 3px;
}

::v-deep ::-webkit-scrollbar-thumb {
  width: 4px;
  background-color: #c0c0c0;
}

::v-deep ::-webkit-scrollbar-track {
  background-color: transparent;
}

.input-subtarefa *{
  background-color: transparent;
  text-align: justify;
}

.title-task * {
  color: var(--text-color-dark);
  font-size: 26px !important;
  font-style: italic;
  font-weight: 600;
  box-shadow: none;
  background-color: transparent;

}

.description-task * {
  box-shadow: none;
  text-align: justify;
  font-weight: 400;
  font-size: 16px;
  background-color: transparent;
}

.selects {
  border-radius: 15px;
  border: solid 1px #dedede;
}

.selects *{
  box-shadow: none;
  border-radius: 15px;
}

.checkbox {
  text-align: justify;
  padding-left: .5rem;
  gap: .5rem;
}

.trash {
  display: none;
  border-radius: 10px;
  color: var(--text-color-dark);
}

.checkbox:hover {
  & .trash {
    display: flex;
  }
}
</style>