import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useCounterStore = defineStore('counter', () => {

  const auth = ref(false);
  const user = ref({});
  const environments = ref([]);
  const followup = ref([]);
  const tasks = ref([]);

  function login(obj) {
    auth.value = true;
    user.value = obj.user;
    user.value.token = obj.token;
    listAllFollowup();
  }

  function logout() {
    auth.value = false;
    user.value = {};
  }

  function listAllEnvironment(router=null) {
    axios.post(`${import.meta.env.VITE_URL_BASE_API}/Environment/listAllEnvironment`, {
      tokenUser: user.value.token
  })
  .then(function (response) {
      if (response.data.success) {
        environments.value = response.data.data;
        if (router!==null) {
          if (environments.value.length===1) {
            router.push(`/${environments.value[0].url}/`);
          } else {
            router.push({name:'all-env'});
          }
        }
      }
  })
  .catch(function (error) { console.log(error) })
  }

  function listAllFollowup() {
    axios.post(`${import.meta.env.VITE_URL_BASE_API}/Followup/listAllFollowup`, {
      tokenUser: user.value.token
  })
  .then(function (response) {
      if (response.data.success) {
        followup.value = response.data.data;
      }
  })
  .catch(function (error) { console.log(error) })
  }

  function listAllTasks(followup) {
    axios.post(`${import.meta.env.VITE_URL_BASE_API}/Followup/listAllTasks`, {
      followupId: followup,
      tokenUser: user.value.token
  })
  .then(function (response) {
      if (response.data.success) {
        tasks.value = response.data.data;
      }
  })
  .catch(function (error) { console.log(error) })
  }

  return { auth, user, environments, followup, tasks, login, logout, listAllEnvironment, listAllFollowup, listAllTasks }
}, { persist: true })
