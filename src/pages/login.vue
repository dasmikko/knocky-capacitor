<template>
  <ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>Login</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    Login screen
    <IonButton @click="onClickLogin">Login</IonButton>
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
    const onClickLogin = async () => {
      const browser = Browser
      console.log(browser)
      browser.addListener('browserPageLoaded', (data) => {
        console.log('tesst', data)
      })
      browser.open({ url: 'https://knockout.chat/login' })
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