<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import FollowupConfig from "@/components/popup/FollowupConfig.vue";
import { useCounterStore } from '../stores/counter.js'
const store = useCounterStore();
const route = useRoute();
const router = useRouter();
const Env = store.environments.filter(e => e.url===route.params.name)[0];

const drawer = ref(true);
const menu = ref(false);
const search = ref("");

const followupModel = {
  codigo: null,
  name: "",
	phases: [
		{
			id: "1",
			title: "Primeira Etapa",
			color: "#ededed",
			visible: true
		},
		{
			id: "2",
			title: "Segunda Etapa",
			color: "#ededed",
			visible: true
		},
		{
			id: "3",
			title: "Terceira Etapa",
			color: "#ededed",
			visible: true
		}
	],
  environment_id: Env._id,
}

</script>

<template>
  <v-navigation-drawer v-model="drawer" permanent elevation="5" >
    <div class="d-flex px-2 my-2 justify-center">
      <v-menu transition="slide-y-transition" v-model="menu" persistent>
        <template v-slot:activator="{ props }">
          <v-list-item :class="menu?'env-active':'env-deactive'" v-bind="props" style="width: 100%; margin: 0; transition: all .2s ease-in-out;">
            <template v-slot:append>
              <v-icon id="icon-env":icon="!menu?'mdi-chevron-down':'mdi-close'"></v-icon>
            </template>
            <v-list-item-title>{{ Env.name }}</v-list-item-title>
          </v-list-item>
        </template>

        <v-list style="margin: .5rem .3rem 0 -.3rem; padding: 0; background-color: var(--bg-color-dark); color: var(--text-color-light);">
          <v-list-item>
            <v-list-item-title>Lucas Berriel</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="px-2 my-2 mt-5">

      <!-- <v-skeleton-loader
        class="mx-auto border mb-2"
        type="list-item-two-line"
      ></v-skeleton-loader> -->
      <div style="display: flex; align-items: center; justify-content: center; color: var(--text-color-dark); border: solid 1px #bfbfbf; border-radius: 10px; overflow: hidden; padding: .5rem; gap: .5rem; margin-block: 1rem;">
        <v-icon icon="mdi-magnify" size="23"></v-icon>
        <input v-model="search" type="text" placeholder="Buscar aqui" style="display: flex;  background-color: var(--bg-color-light);  border: none; outline: none; color: var(--text-color-dark); width: 100%;">
      </div>

      <FollowupConfig title="Novo Seguimento" :new="true" :envId="Env._id" :obj="JSON.stringify(followupModel)" />
    </div>

    <div class=" my-2 mt-5">

        <v-list-item v-for="followup, index in store.followup" :key="index" style="padding: .8rem .5rem .8rem .8rem; color: var(--text-color-dark); transition: all .2s cubic-bezier(0.075, 0.82, 0.165, 1);" @click="router.push({name:'followup-unique',params:{idFollowup: followup._id}}); store.listAllTasks(followup._id); search = '';" :class="route.params.idFollowup===followup._id ? 'followup-active' : ''" v-show="followup.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())||search===''">
          <v-list-item-title><b>{{ followup.name }}</b></v-list-item-title>
          <p style="color: #8f8f8f; font-size: 14px;">57 registros</p style="color: #efefef;">

          <template v-slot:append>
              <v-menu transition="slide-x-transition" :close-on-content-click="false" location="end top">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text" density="compact" style="border-radius: 10px; color: var(--text-color-dark);"></v-btn>
                </template>
                <v-list style="padding: 0; margin-left: .3rem;">
                  <v-list-item append-icon="mdi-content-duplicate" title="Duplicar" style="font-size: 14px;"></v-list-item>
                  <v-list-item append-icon="mdi-trash-can" title="Excluir" style="font-size: 14px;"></v-list-item>
                </v-list>
              </v-menu>
          </template>
        </v-list-item>
    
    </div>
  </v-navigation-drawer>

  <v-main id="main">
    <RouterView/>
    <h1 v-if="!route.params.idFollowup">Lucas</h1>
  </v-main>
</template>

<style scoped>

#icon-env{
  transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.env-deactive #icon-env{
  transform: rotate(0deg);
  scale: 1;
}

.env-active #icon-env{
  transform: rotate(-90deg);
  scale: 0.8;
}

#main{
  overflow: auto; 
  height: 100%;
  background-color: var(--bg-color-gray);
}
.followup-active{
  padding-left: 1.7rem !important;
}

.followup-active::before{
  content: " ";
  background-color: #009877;
  height: 80%;
  width: 7px;
  position: absolute;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  left: 1px;
}



</style>