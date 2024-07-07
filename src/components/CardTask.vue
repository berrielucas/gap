<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter";
const router = useRouter();
const route = useRoute();
const store = useCounterStore();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const card = ref(JSON.parse(props.content));
const dialogConfirm = ref(false);
function clear() {
  document.querySelectorAll(".model-task").forEach((e) => {
    e.style.display = "none";
  });
  // store.getTask(card.value._id, route.params.idFollowup);
}
</script>

<template>
  <div :id="id" class="card-item" @dragend="clear()" draggable="true" @dragstart="store.dragTask($event)">
    <v-dialog v-model="dialogConfirm" width="auto" persistent>
      <v-card max-width="350" style="border-radius: 20px">
        <v-banner style="font-size: 15px; width: 100%; color: var(--text-color-dark)">
          <template v-slot:prepend>
            <v-icon size="40">mdi-alert</v-icon>
          </template>
          <p>
            Deseja realmente excluir a tarefa <b>{{ card.title }}</b>
          </p>
        </v-banner>
        <template v-slot:actions>
          <v-btn density="comfortable" class="ms-auto text-none" text="Cancelar" style="border-radius: 5px; border: solid 1px" @click="dialogConfirm = false"></v-btn>
          <v-btn
            class="me-2 text-none"
            text="Excluir"
            color="error"
            variant="tonal"
            density="comfortable"
            style="border-radius: 5px"
            @click="
              store.deleteTask(card._id, route.params.idFollowup);
              dialogConfirm = false;
            "
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-btn @click="dialogConfirm = true" class="btn-trash actions" style="" icon="mdi-trash-can" size="30"></v-btn>
    <v-btn @click="router.push({ name: 'task-unique', params: { idTask: card._id } })" class="btn-edit actions" style="" icon="mdi-pencil" size="30"></v-btn>
    <div class="content">
      <p class="mb-1" style="font-size: 17px; font-weight: 400; font-style: italic; padding: 0;">
        <b>{{ card.title }}</b>
      </p>
      <!-- <v-divider></v-divider> -->
      <p class="mt-1" style="text-align: justify; font-size: 16px" v-if="card.description !== '' && card.description !== null"><b>Descrição: </b>{{ card.description }}</p>
      <!-- <p class="mt-1" style="padding: 0; font-size: 16px"><b>Criado em: </b>{{ `${new Date(card.createdAt).toLocaleDateString()} às ${new Date(card.createdAt).toLocaleTimeString()}` }}</p> -->
      <v-divider class="mt-2 mb-2"></v-divider>
      <div class="footer">
        <span style="display: flex; align-items: center;">
          <v-icon style="font-size: medium;">mdi-comment-text-multiple</v-icon>
          <p class="ml-1"><b>{{ card.comments.length }}</b></p>
        </span>
        <span v-if="card.subTasks.length>0" style="display: flex; align-items: center;" :style="card.subTasks.filter(t=>t.complete).length===card.subTasks.length ? 'color: green;' : ''">
          <v-icon style="font-size: medium;">mdi-checkbox-multiple-marked</v-icon>
          <p class="ml-1"><b>{{ `${card.subTasks.filter(t=>t.complete).length}/${card.subTasks.length}` }}</b></p>
        </span>
        <p class="ml-auto mr-0" style="font-size: small;"><b>{{ `${new Date(card.createdAt).toLocaleDateString()} às ${new Date(card.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` }}</b></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-item {
  position: relative;
  transition: all 0.2s ease-in-out;
}

.content {
  cursor: grab !important;
  background-color: #fff;
  box-shadow: 0 0 10px #535353;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 0.7rem;
  position: relative;
  color: var(--text-color-dark);
  gap: 0.2rem;
  font-size: 15px;

  & .footer{
    display: flex;
    align-items: center;
    gap: .5rem;
    font-size: 14px;
    color: #a7a7a7;
  }
}

.content:active {
  cursor: grabbing !important;
  box-shadow: 0 0 0 transparent !important;
  opacity: 0.5;
}

.content:active > .etapa-cards:hover {
  cursor: grabbing !important;
}

.actions {
  display: none;
  position: absolute;
  font-size: 13px;
  background-color: var(--text-color-dark);
  color: var(--text-color-light);
  z-index: 10;
}

.btn-edit {
  top: 0.6rem;
  right: 0.7rem;
}

.btn-trash {
  top: 0.6rem;
  right: 3rem;
  background-color: red;
}

.card-item:hover .btn-edit,
.card-item:hover .btn-trash {
  display: flex;
}
</style>
