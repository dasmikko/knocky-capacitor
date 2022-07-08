<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <p>This isn't working yet, it'a just for testing!</p>
      <div class="flex flex-col px-4 justify-center h-full">
        <IonButton @click="onClickLogin('google')">Google</IonButton>
        <IonButton @click="onClickLogin('twitter')">Twitter</IonButton>
        <IonButton @click="onClickLogin('github')">Github</IonButton>
        <IonButton @click="onClickLogin('steam')">Steam</IonButton>
      </div>
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
import { Browser } from '@capacitor/browser';


export default {
  name: 'login',
  components: {
    IonMenu,
    IonMenuButton,
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonButton
  },
  setup () {
    const onClickLogin = async (provider) => {
      const browser = Browser
      console.log(browser)
      browser.addListener('browserPageLoaded', (data) => {
        console.log('tesst', data)
      })
      browser.open({ url: `https://api.knockout.chat/auth/${provider}/login` })
      console.log('finish')
    }

    return {
      onClickLogin
    }
  }
}
</script>

<style scoped>

</style>