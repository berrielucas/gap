<script setup>
import { ref, onMounted } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useCounterStore } from '../stores/counter.js'
const store = useCounterStore();
const route = useRoute();
const router = useRouter();
const theme = ref("light");
const menu = ref(false);

onMounted(()=>{
  if (!store.auth) {
    router.push({name: 'login'});
  }
});


</script>

<template>
  <v-app :theme="theme" v-if="store.auth">

    <v-app-bar
      height="60"
      style="background: linear-gradient(30deg, rgba(0,34,55,1) 0%, rgba(1,12,24,1) 30% 70%, rgba(0,34,55,1) 100%); color: var(--text-color-light);"
    >
      <v-avatar
        class="ms-2 mr-2"
        size="50"
        variant="flat"
        @click="router.push(`/${route.params.name}/`)"
        style="cursor: pointer; color: #4FD8F1;"
      >
        <v-icon size="38">mdi-checkbox-marked-circle-outline</v-icon>
      </v-avatar>
      <h3 style="font-weight: 500; font-size: 20px;">Project Manager</h3>

      <v-btn class="mr-4 ml-auto"icon="mdi-bell-ring-outline" variant="text" size="35" style="border-radius: 10px; color: var(--bg-color-gray);"></v-btn>
      
      <v-menu transition="scale-transition" location="bottom center" v-model="menu" >
        <template v-slot:activator="{ props }">
          <v-chip class="mr-3" :class="menu?'menu-active':'menu-deactive'" v-bind="props" style="transition: all .2s cubic-bezier(0.165, 0.84, 0.44, 1); border: solid 1px #a5a5a5;">
            <template v-slot:append>
              <v-icon id="icon-menu":icon="!menu?'mdi-chevron-down':'mdi-chevron-up'"></v-icon>
            </template>
            <p class="mr-2">{{ store.user.name }}</p>
          </v-chip>
        </template>

        <v-list class="mt-7" style=" width: 290px; padding: 0; background: linear-gradient(45deg, rgba(0,34,55,1) 0%, rgba(1,12,24,1) 50%, rgba(0,34,55,1) 100%); color: var(--text-color-light); border-radius: 20px;">
          <div class="mt-7 mb-5" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <v-icon style="color: #4FD8F1;" size="60">mdi-checkbox-marked-circle-outline</v-icon>
            <h2 class="mt-1" style="font-size: 24px; font-weight: 500;">{{ store.user.name }}</h2>
            <p class="" style="font-size: 16px;">{{ store.user.email }}</p>
          </div>
          <v-divider></v-divider>
          <v-list-item class="mb-1" append-icon="mdi-logout" style="font-size: 15px; padding-inline: 2.5rem;">
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <RouterView/>
  </v-app>
</template>

<style scoped>


#icon-menu{
  transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.menu-deactive #icon-menu{
  transform: rotate(0deg);
}

.menu-active #icon-menu{
  transform: rotate(-360deg);
}

.menu-deactive{
  background-color: transparent !important;
}


</style>