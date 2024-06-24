import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {

  const auth = ref(false);
  const user = reactive({});

  function login() {
    auth.value = true;
  }

  function logout() {
    auth.value = false;
  }

  return { auth, user, login, logout }
})
