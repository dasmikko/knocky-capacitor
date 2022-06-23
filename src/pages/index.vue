<template>
  <ion-page>
    <ion-menu
      maxEdgeStart="20"
      side="start"
      content-id="main-content">
      <ion-header>
        <ion-toolbar translucent>
          <ion-title>BOO!</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        Drawer
      </ion-content>
    </ion-menu>

    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Knocky</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content id="main-content">

      <p class="mb-9">Hello</p>

      <ul>
        <li v-for="item in items">
          {{item.name}}
        </li>
      </ul>

      <ion-button @click="router.push('/login')">Login</ion-button>
      <ion-button @click="onClick">Go to another page</ion-button>
    </ion-content>
  </ion-page>
</template>


<script>
import {
  IonMenu,
  IonMenuButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonButton } from '@ionic/vue';
import { App } from '@capacitor/app';
import HelloWorld from '../components/HelloWorld.vue'
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getSubforum } from '../utils/api'

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

export default {
  components: {
    IonPage,
    HelloWorld,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonButton,
    IonMenu,
    IonMenuButton
},
  setup () {
    const router = useRouter();
    
    const items = ref([])

    const onClick = () => {
      router.push('/test')
    }

    onMounted(async () => {
      const fetchedItems = await getSubforum()
      items.value = fetchedItems.list
      console.log(items.value)

      console.log('cookies', window.location)
    })

    return {
      router,
      onClick,
      items
    }
  }
}
</script>



<style>

</style>
