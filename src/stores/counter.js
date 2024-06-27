import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useCounterStore = defineStore('counter', () => {

  const auth = ref(true);
  const user = reactive({});
  const environments = ref([]);
  const followup = ref([]);
  const tasks = ref([]);

  function login() {
    auth.value = true;
  }

  function logout() {
    auth.value = false;
  }

  function listAllEnvironment() {
    axios.post(`${import.meta.env.VITE_URL_BASE_API}/Environment/listAllEnvironment`, {
      tokenUser: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2MyMDRlY2QxMzdlZDZjZWZlNzUxOCIsImVtYWlsIjoibHVjYXNiZXJyaWVsQGVtYWlsLmNvbSIsImlhdCI6MTcxOTQ0ODIxNCwiZXhwIjoxNzE5NTM0NjE0fQ.Ocj37o3UEnABV4kJfaPoPOBTkMh-2JKbshcJZyD_OrA"
  })
  .then(function (response) {
      if (response.data.success) {
        environments.value = response.data.data;
      }
  })
  .catch(function (error) { console.log(error) })
  }

  function listAllFollowup() {
    axios.post(`${import.meta.env.VITE_URL_BASE_API}/Followup/listAllFollowup`, {
      tokenUser: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2MyMDRlY2QxMzdlZDZjZWZlNzUxOCIsImVtYWlsIjoibHVjYXNiZXJyaWVsQGVtYWlsLmNvbSIsImlhdCI6MTcxOTQ0ODIxNCwiZXhwIjoxNzE5NTM0NjE0fQ.Ocj37o3UEnABV4kJfaPoPOBTkMh-2JKbshcJZyD_OrA"
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
      tokenUser: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2MyMDRlY2QxMzdlZDZjZWZlNzUxOCIsImVtYWlsIjoibHVjYXNiZXJyaWVsQGVtYWlsLmNvbSIsImlhdCI6MTcxOTQ0ODIxNCwiZXhwIjoxNzE5NTM0NjE0fQ.Ocj37o3UEnABV4kJfaPoPOBTkMh-2JKbshcJZyD_OrA"
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
