import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useCounterStore = defineStore(
  "counter",
  () => {
    // Variáveis de autenticação
    const auth = ref(false);
    const user = ref({});

    // Stores do sistema
    const environments = ref([]);
    const followup = ref([]);
    const tasks = ref([]);

    // Loads do sistema
    const loadTasks = ref(false);
    const loadFollowups = ref(false);
    const loadEnvironments = ref(false);

    // Funções de autenticação
    function login(obj) {
      auth.value = true;
      user.value = obj.user;
      user.value.token = obj.token;
      // listAllFollowup();
    }

    function logout() {
      auth.value = false;
      user.value = {};
      environments.value = [];
      followup.value = [];
      tasks.value = [];
    }

    // Funções de store
    function listAllEnvironment(router = null) {
      loadEnvironments.value = true;
      setTimeout(() => {
        axios
          .post(`${import.meta.env.VITE_URL_BASE_API}/Environment/listAllEnvironment`, {
            tokenUser: user.value.token,
          })
          .then(function (response) {
            if (response.data.success) {
              environments.value = response.data.data;
              if (router !== null) {
                if (environments.value.length === 1) {
                  router.push(`/${environments.value[0].url}/`);
                } else {
                  router.push({ name: "all-env" });
                }
              }
            }
            loadEnvironments.value = false;
          })
          .catch(function (error) {
            console.log(error);
            loadEnvironments.value = false;
          });
      }, 1000);
    }

    function listAllFollowup(env) {
      loadFollowups.value = true;
      setTimeout(() => {
        axios
          .post(`${import.meta.env.VITE_URL_BASE_API}/Followup/listAllFollowup`, {
            envId: env,
            tokenUser: user.value.token,
          })
          .then(function (response) {
            if (response.data.success) {
              followup.value = response.data.data;
            }
            loadFollowups.value = false;
          })
          .catch(function (error) {
            console.log(error);
            loadFollowups.value = false;
          });
      }, 1000);
    }

    function listAllTasks(followup) {
      loadTasks.value = true;
      // tasks.value = [];
      setTimeout(() => {
        axios
          .post(`${import.meta.env.VITE_URL_BASE_API}/Followup/listAllTasks`, {
            followupId: followup,
            tokenUser: user.value.token,
          })
          .then(function (response) {
            if (response.data.success) {
              tasks.value = response.data.data;
            }
            loadTasks.value = false;
          })
          .catch(function (error) {
            console.log(error);
            loadTasks.value = false;
          });
      }, 1000);
    }

    // Funções Drag and Drop
    function allowDropPhase(ev) {
      ev.preventDefault();
    }

    function dragTask(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    }

    async function dropPhase(ev, id) {
      ev.preventDefault();
      const data = ev.dataTransfer.getData("text");
      let response = await fetch(`${import.meta.env.VITE_URL_BASE_API}/Task/updatePhaseTask`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify({
          taskId: data,
          dataTask: {
            phase_id: id,
          },
          tokenUser: user.value.token,
        }),
      });
      if (response.ok) {
        document.getElementById(id).querySelector(`#etapa-cards-${id}`).appendChild(document.getElementById(data));
        // document.querySelectorAll(".model-task").forEach((element) => {
        //   element.style.display = "none";
        // });
      }
    }

    let enterId = null;
    let leaveId = null;
    function dragEnter(ev, id){
      enterId = id;
      document.getElementById(id).querySelector(".model-task").style.display = 'flex';
      if (id!==leaveId&&leaveId!==null) {
        document.getElementById(leaveId).querySelector(".model-task").style.display = 'none';
      }
    }

    function dragLeave(ev, id){
      leaveId = id;
      if (ev.target.id===id&&enterId!==id) {
        document.getElementById(id).querySelector(".model-task").style.display = 'none';
      }
    }

    return {
      auth,
      user,
      environments,
      followup,
      tasks,
      login,
      logout,
      listAllEnvironment,
      loadEnvironments,
      listAllFollowup,
      loadFollowups,
      listAllTasks,
      loadTasks,
      dragTask,
      dropPhase,
      allowDropPhase,
      dragEnter,
      dragLeave
    };
  },
  { persist: true }
);
