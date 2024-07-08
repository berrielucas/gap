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
    const tasks = ref({});

    // Loads do sistema
    const loadTasks = ref(false);
    const loadFollowups = ref(false);
    const loadEnvironments = ref(false);

    // Funções de autenticação
    function login(obj) {
      auth.value = true;
      user.value = obj.user;
      user.value.token = obj.token;
    }

    function logout(router) {
      auth.value = false;
      user.value = {};
      environments.value = [];
      followup.value = [];
      tasks.value = {};
      router.push({ name: 'login' });
    }

    function removeParamsURL(url) {
      const urlObj = new URL(url);
      urlObj.search = "";
      window.history.replaceState({}, "", urlObj.toString());
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
              if (JSON.stringify(tasks.value) === "{}") {
                followup.value.forEach((element) => {
                  tasks.value[`${element._id}`] = [];
                });
              }
            }
            loadFollowups.value = false;
          })
          .catch(function (error) {
            console.log(error);
            loadFollowups.value = false;
          });
      }, 1000);
    }

    function createFollowup(router, dataFollowup) {
      dataFollowup.tokenUser = user.value.token;
      axios
        .post(`${import.meta.env.VITE_URL_BASE_API}/Followup/createFollowup`, dataFollowup)
        .then(function (response) {
          if (response.data.success) {
            const followupCreated = response.data.data;
            followup.value.push(followupCreated);
            tasks.value[`${followupCreated._id}`] = [];
            router.push({ name: 'followup-unique', params: { idFollowup: followupCreated._id }});
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function deleteFollowup(idFollowup, idEnv, route, router) {
      axios
        .post(`${import.meta.env.VITE_URL_BASE_API}/Followup/deleteFollowup`, {
          followupId: idFollowup,
          environment_id: idEnv,
          tokenUser: user.value.token,
        })
        .then(function (response) {
          if (response.data.success) {
            const followupRemove = response.data.data;
            followup.value = followup.value.filter((t) => t._id !== followupRemove._id);
            delete tasks.value[`${followupRemove._id}`];
            if (route.params.idFollowup === followupRemove._id) {
              router.push(`/${environments.value.filter((e) => e._id === idEnv)[0].url}/`);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function updateFollowup(idFollowup, data, idEnv, router) {
      axios
        .put(`${import.meta.env.VITE_URL_BASE_API}/Followup/updateFollowup`, {
          followupId: idFollowup,
          dataFollowup: data,
          environment_id: idEnv,
          tokenUser: user.value.token,
        })
        .then(function (response) {
          if (response.data.success) {
            const followupUpdated = response.data.data;
            followup.value[followup.value.indexOf(followup.value.filter((f) => f._id === idFollowup)[0])] = response.data.data;
            // router.push(`/${environments.value.filter(e=>e._id===idEnv)[0].url}/seguimento/${idFollowup}/`);
            router.push({ name: 'followup-unique', params: { idFollowup: followupUpdated._id }});
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function listAllTasks(followup) {
      loadTasks.value = true;
      // tasks.value = [];
      setTimeout(() => {
        axios
          .post(`${import.meta.env.VITE_URL_BASE_API}/Followup/listAllTasks`, {
            followupId: followup,
            limit: 100,
            tokenUser: user.value.token,
          })
          .then(function (response) {
            if (response.data.success) {
              tasks.value[`${followup}`] = response.data.data;
            }
            loadTasks.value = false;
          })
          .catch(function (error) {
            console.log(error);
            loadTasks.value = false;
          });
      }, 1000);
    }

    function getTask(task, followup) {
      axios
        .post(`${import.meta.env.VITE_URL_BASE_API}/Task/getTask`, {
          taskId: task,
          tokenUser: user.value.token,
        })
        .then(function (response) {
          if (response.data.success) {
            tasks.value[`${followup}`][tasks.value[`${followup}`].indexOf(tasks.value[`${followup}`].filter((t) => t._id === task)[0])] = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function createTask(router, idFollowup, idPhase) {
      axios
        .post(`${import.meta.env.VITE_URL_BASE_API}/Task/createTask`, {
          title: "Nova Tarefa",
          description: "",
          followup_id: idFollowup,
          phase_id: idPhase,
          tokenUser: user.value.token,
        })
        .then(function (response) {
          if (response.data.success) {
            const taskCreated = response.data.data;
            tasks.value[`${idFollowup}`].unshift(taskCreated);
            followup.value.filter((f) => f._id === idFollowup)[0].countTasks += 1;
            router.push({ name: "task-unique", params: { idTask: taskCreated._id } });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function updateTask(idTask, data, idFollowup, router) {
      axios
        .put(`${import.meta.env.VITE_URL_BASE_API}/Task/updateTask`, {
          taskId: idTask,
          dataTask: data,
          followup_id: idFollowup,
          tokenUser: user.value.token,
        })
        .then(function (response) {
          if (response.data.success) {
            // const taskUpdated = response.data.data;
            router.push({ name: "followup-unique", params: { idFollowup: idFollowup } });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function deleteTask(idTask, idFollowup) {
      axios
        .post(`${import.meta.env.VITE_URL_BASE_API}/Task/deleteTask`, {
          taskId: idTask,
          followup_id: idFollowup,
          tokenUser: user.value.token,
        })
        .then(function (response) {
          if (response.data.success) {
            const taskRemove = response.data.data;
            tasks.value[`${idFollowup}`] = tasks.value[`${idFollowup}`].filter((t) => t._id !== taskRemove._id);
            followup.value.filter((f) => f._id === idFollowup)[0].countTasks -= 1;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // Funções Drag and Drop
    function allowDropPhase(ev) {
      ev.preventDefault();
    }

    function dragTask(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    }

    async function dropPhase(ev, id, followupId) {
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
        // document
        //   .getElementById(id)
        //   .querySelector(`#etapa-cards-${id}`)
        //   .appendChild(document.getElementById(data));
        getTask(data, followupId);
      }
    }

    let enterId = null;
    let leaveId = null;
    function dragEnter(ev, id) {
      enterId = id;
      document.getElementById(id).querySelector(".model-task").style.display = "flex";
      if (id !== leaveId && leaveId !== null) {
        document.getElementById(leaveId).querySelector(".model-task").style.display = "none";
      }
    }

    function dragLeave(ev, id) {
      leaveId = id;
      if (ev.target.id === id && enterId !== id) {
        document.getElementById(id).querySelector(".model-task").style.display = "none";
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
      removeParamsURL,
      listAllEnvironment,
      loadEnvironments,
      createFollowup,
      deleteFollowup,
      updateFollowup,
      listAllFollowup,
      loadFollowups,
      getTask,
      createTask,
      updateTask,
      deleteTask,
      listAllTasks,
      loadTasks,
      dragTask,
      dropPhase,
      allowDropPhase,
      dragEnter,
      dragLeave,
    };
  },
  { persist: true }
);
