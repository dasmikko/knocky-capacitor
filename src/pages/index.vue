
<script>
import { useBackButton, useIonRouter } from '@ionic/vue';
import { App } from '@capacitor/app';
import HelloWorld from '../components/HelloWorld.vue'

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

export default {
  components: {
    HelloWorld,
},
  setup () {
    return {}
  }
}
</script>

<template>
    Hello
    <HelloWorld/>
    <ion-button>Hello from Ionic</ion-button>
</template>

<style>

</style>
