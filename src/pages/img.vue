<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Image</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content
      id="main-content">   
      <img :src="route.query.url" alt="">
    </ion-content>
  </ion-page>
</template>


<script>
import { useRoute, useRouter } from 'vue-router';

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

export default {
  components: {
  },
  setup () {
    const router = useRouter();
    const route = useRoute();

    return {
      router,
      route
    }
  }
}
</script>


<style lang="scss">

</style>
