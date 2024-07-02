<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useCounterStore } from '../../stores/counter.js'
import BtnAddSimple from '../standard/BtnAddSimple.vue';
import InputText from '../standard/InputText.vue';
import { useRoute, useRouter } from 'vue-router';
// const emits = defineEmits({});
const route = useRoute();
const router = useRouter();
// const props = defineProps({});


// Configs
const store = useCounterStore();
const dialog = ref(true);


function teste() {
    console.log("passouu!!");
}

const task = store.tasks[`${route.params.idFollowup}`].filter(t=>t._id===route.params.idTask)[0];
const modelTask = ref(task);
  
</script>


<template>
    <!-- <v-btn v-if="newFollowup" variant="tonal" class="text-none btn-new" flat @click="dialog = true">
        <v-icon icon="mdi-plus"></v-icon>
        <h4>Novo Seguimento</h4>
    </v-btn> -->

    <!-- Popup principal -->
    <v-dialog v-model="dialog" style="padding: 0; margin: 0;"  persistent>
      <v-card style="display: flex; max-height: 750px; height: 100vh; width: 900px; border-radius: 20px; color: var(--text-color-dark); align-self: center; justify-self: center; background-color: #f9f9f9;">
        <!-- Titulo/Header do Popup -->
        <v-card-title elevation="3" style="display: flex; align-items: start; justify-content: end; padding: .2rem .5rem 0 .5rem;" >
          <span>
            <v-icon class="mt-5 ml-4" size="29">mdi-note-text-outline</v-icon>
          </span>
            <v-textarea v-model="modelTask.title" class="title-task" style="width: 100%;" placeholder="Nova Tarefa" single-line hide-details maxlength="60" variant="solo" rows="1" auto-grow shaped></v-textarea>
            <span>
              <v-btn icon="mdi-close" class="mt-4 mr-4" variant="text" size="30" density="comfortable" style="border-radius: 10px;" @click="router.push({name: 'followup-unique', params: { idFollowup: route.params.idFollowup }})"></v-btn>
            </span>
        </v-card-title>

        <!-- Content -->
        <v-card-text style="display: flex; gap: 1rem; padding: 0 0 1rem 1rem; overflow: hidden;">

            <v-row>
                <v-col cols="12" sm="8" style="display: flex;">

                  <span>
                    <v-icon class="mt-4 ml-2" size="29">mdi-text-long</v-icon>
                  </span>
                  <v-textarea v-model="modelTask.description" class="description-task" style="width: 100%;" placeholder="Descrição" hide-details maxlength="500" variant="solo" rows="8" auto-grow shaped></v-textarea>

                </v-col>

                <v-col cols="12" sm="4" style="border-left: solid 1px #dedede; max-height: 100%; width: 100%; overflow-y: auto;">

                  <p class="mt-1 ml-1" style="color: #aaaaaa; font-weight: 400;"><b>Definições</b></p>

                  <div class="selects-tasks mt-3 mr-3">
                    <v-select v-model="modelTask.phase_id" density="comfortable" variant="solo" label="Etapa" item-title="title" item-value="id":items="store.followup.filter(f=>f._id===route.params.idFollowup)[0].phases" single-line hide-details>
                      <template v-slot:prepend-inner>
                        <v-icon class="mr-1">mdi-list-status</v-icon>
                      </template>
                    </v-select>
                  </div>

                  <div class="selects-tasks mt-3 mr-3">
                    <v-select density="comfortable" variant="solo" placeholder="Membros" :items="['Teste']" single-line hide-details>
                      <template v-slot:prepend-inner>
                        <v-icon class="mr-1">mdi-account-group</v-icon>
                      </template>
                    </v-select>
                  </div>

                  <p class="mt-4 ml-1" style="color: #aaaaaa; font-weight: 400;"><b>Propriedades</b></p>

                  <div class="selects-tasks mt-3 mr-3">
                    <v-select density="comfortable" variant="solo" placeholder="Membros" :items="['Teste']" single-line hide-details>
                      <template v-slot:prepend-inner>
                        <v-icon class="mr-1">mdi-account-group</v-icon>
                      </template>
                    </v-select>
                  </div>

                  <div class="selects-tasks mt-3 mr-3">
                    <v-select density="comfortable" variant="solo" placeholder="Membros" :items="['Teste']" single-line hide-details>
                      <template v-slot:prepend-inner>
                        <v-icon class="mr-1">mdi-account-group</v-icon>
                      </template>
                    </v-select>
                  </div>

                  <div class="selects-tasks mt-3 mr-3">
                    <v-select density="comfortable" variant="solo" placeholder="Membros" :items="['Teste']" single-line hide-details>
                      <template v-slot:prepend-inner>
                        <v-icon class="mr-1">mdi-account-group</v-icon>
                      </template>
                    </v-select>
                  </div>

                  <div class="selects-tasks mt-3 mr-3">
                    <v-select density="comfortable" variant="solo" placeholder="Membros" :items="['Teste']" single-line hide-details>
                      <template v-slot:prepend-inner>
                        <v-icon class="mr-1">mdi-account-group</v-icon>
                      </template>
                    </v-select>
                  </div>

                  <div class="selects-tasks mt-3 mr-3">
                    <v-select density="comfortable" variant="solo" placeholder="Membros" :items="['Teste']" single-line hide-details>
                      <template v-slot:prepend-inner>
                        <v-icon class="mr-1">mdi-account-group</v-icon>
                      </template>
                    </v-select>
                  </div>

                  <div class="selects-tasks mt-3 mr-3">
                    <v-select density="comfortable" variant="solo" placeholder="Membros" :items="['Teste']" single-line hide-details>
                      <template v-slot:prepend-inner>
                        <v-icon class="mr-1">mdi-account-group</v-icon>
                      </template>
                    </v-select>
                  </div>

                  <div class="selects-tasks mt-3 mr-3">
                    <v-select density="comfortable" variant="solo" placeholder="Membros" :items="['Teste']" single-line hide-details>
                      <template v-slot:prepend-inner>
                        <v-icon class="mr-1">mdi-account-group</v-icon>
                      </template>
                    </v-select>
                  </div>

              
                    <!-- <div class="section-properties"></div> -->


                </v-col>
            </v-row>


            <!-- <h1>{{ route.params.idTask }}</h1> -->
          
          
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

::v-deep ::-webkit-scrollbar{
  width: 6px;
}

::v-deep ::-webkit-scrollbar-thumb{
  width: 4px;
  background-color: #c0c0c0;
}

::v-deep ::-webkit-scrollbar-track{
  background-color: transparent;
}

.title-task *{
    color: var(--text-color-dark);
    font-size: 26px !important;
    font-style: italic;
    font-weight: 600;
    box-shadow: none;
    background-color: transparent;
}

.description-task *{
    box-shadow: none;
    text-align: justify;
    font-weight: 400;
    font-size: 16px;
    background-color: transparent;
}

.selects-tasks{
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 5px #b3b3b3;
  /* height: 80px; */
}

/* .section-properties{
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 5px #b3b3b3;
  border-radius: 15px;
  background-color: var(--bg-color-light);
  padding: .5rem .8rem;
  overflow: auto;
  height: 100%;
} */

</style>