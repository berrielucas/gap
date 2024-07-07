<script setup>
document.head.querySelector("title").innerText = "Login";
import { ref, reactive } from "vue";
import { useCounterStore } from "../stores/counter.js";
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
const store = useCounterStore();
const option = ref("Login");
const visible = ref(false);
const snackbar = ref(false);
const timeout = ref(4000);
const message_error = ref("");
const load = ref(false);

const dataLogin = reactive({
  email: "",
  password: "",
});

const dataRegister = reactive({
  name: "",
  email: "",
  password: "",
});


function login() {
  load.value = true;
  axios
    .post(`${import.meta.env.VITE_URL_BASE_API}/Auth/authenticateUser`, dataLogin)
    .then(function (response) {
      if (response.data.success) {
        store.login(response.data.data);
        store.listAllEnvironment(router);
      } else {
        load.value = false;
        message_error.value = response.data.error;
        snackbar.value = true;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
</script>

<template>
  <div v-show="!store.auth" class="body-login" style="display: flex; width: 100%; height: 100%; align-items: center; justify-content: center; color: var(--text-color-dark)">
    

      <v-card class="mx-auto pa-12 pb-8" max-width="800" elevation="8" rounded="lg" style="background-color: var(--bg-color-light); color: var(--text-color-dark); position: relative; overflow-y: auto;">
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-empty-state>
              <template v-slot:media>
                <img src="../assets/checklist.svg" width="100%" alt="" />
              </template>
            </v-empty-state>
          </v-col>

          <v-col cols="12" sm="6">
            <div class="text-subtitle-1 mb-8" style="display: flex; align-items: center; justify-content: center; gap: 1rem">
              <v-icon icon="mdi-checkbox-marked-circle-outline" size="50" style="color: var(--button-color)"></v-icon>
              <h2 style="font-size: 27px; font-weight: 500">GAP | Project Menager</h2>
            </div>

            <v-text-field density="compact" placeholder="Email" prepend-inner-icon="mdi-email-outline" variant="outlined" v-model="dataLogin.email"></v-text-field>

            <v-text-field
              :append-inner-icon="!visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Senha"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              v-model="dataLogin.password"
            ></v-text-field>

            <v-card class="mb-8 mt-1" variant="tonal">
              <v-card-text class="text-caption" style="color: var(--text-color-dark); text-align: justify">
                <b>Atenção:</b> Entre com seus dados Email e Senha que utilizou para criar sua conta
              </v-card-text>
            </v-card>

            <v-btn class="mb-5" size="large" block style="background-color: var(--button-color); color: var(--text-color-light)" @click="login()">
              <button type="submit">Entrar</button>
            </v-btn>

            <v-card-text class="text-center">
              <a class="text-decoration-none" rel="noopener noreferrer" @click="" style="color: var(--button-color); cursor: pointer">
                Registre aqui <v-icon icon="mdi-chevron-right"></v-icon>
              </a>
            </v-card-text>
          </v-col>

          <!-- <v-col cols="12" sm="6">
            <v-empty-state>
              <template v-slot:media>
                <img src="../assets/checklist.svg" width="100%" alt="" />
              </template>
            </v-empty-state>
          </v-col> -->

        </v-row>
        <div class="load" v-if="load">
          <v-progress-circular indeterminate :size="37" style="color: var(--button-color)"></v-progress-circular>
        </div>

        
        <!-- <v-window v-model="option">
          <v-window-item value="Login">
          </v-window-item> -->

          <!-- <v-window-item value="Register">
            <v-container fluid style="padding: 0">
              <v-text-field density="compact" placeholder="Nome" prepend-inner-icon="mdi-account-outline" variant="outlined" v-model="dataRegister.name"></v-text-field>

              <v-text-field density="compact" placeholder="Email" prepend-inner-icon="mdi-email-outline" variant="outlined" v-model="dataRegister.email"></v-text-field>

              <v-text-field
                :append-inner-icon="!visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Senha"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
                v-model="dataRegister.password"
              ></v-text-field>

              <v-text-field
                :append-inner-icon="!visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Confirme sua senha"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
                v-model="dataRegister.password"
              ></v-text-field>

              <v-card class="mb-8 mt-1" variant="tonal">
                <v-card-text class="text-caption" style="color: var(--text-color-dark); text-align: justify">
                  <b>Atenção:</b> Escolha uma senha forte, pois dará acesso à todas as suas informações.
                </v-card-text>
              </v-card>
              <v-btn class="mb-5" size="large" block style="background-color: var(--button-color); color: var(--text-color-light)" @click="load = true">
                <button>Registrar-se</button>
              </v-btn>

              <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" rel="noopener noreferrer" @click="changeOption('Login')" style="color: var(--button-color); cursor: pointer">
                  <v-icon icon="mdi-chevron-left"></v-icon> Entrar
                </a>
              </v-card-text>
            </v-container>
          </v-window-item> -->
        <!-- </v-window> -->
      </v-card>
  </div>

  <!-- Mensagem de Erro -->
  <v-snackbar v-model="snackbar" :timeout="timeout" style="color: darkred" variant="tonal">
    <h4>{{ message_error }}</h4>

    <template v-slot:actions>
      <v-btn variant="text" icon="mdi-window-close" @click="snackbar = false" style="color: darkred"></v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
.load {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background-color: #ffffff1e;
  z-index: 1000;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: all 0.2s ease-in-out;
}

.body-login{
  background-image: url("../assets/bg-gradiente.png");
}
</style>
