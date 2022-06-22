
<script>
import { IonButton, IonApp, IonRouterOutlet } from '@ionic/vue';
import { useBackButton, useIonRouter } from '@ionic/vue';
import { App } from '@capacitor/app';
import HelloWorld from './components/HelloWorld.vue'

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

export default {
  components: {
    HelloWorld,
    IonButton,
    IonApp,
    IonRouterOutlet
  },
  setup () {
    const ionRouter = useIonRouter();

    useBackButton(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });


    return {}
  }
}
</script>

<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<style>
</style>
