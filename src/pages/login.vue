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
      <div class="flex flex-col px-4 justify-center h-full">
        <p class="text-center mb-2">Notice: This isn't working properly on iOS yet!</p>
        <IonButton @click="onClickLogin('google')"><GoogleIcon class="mr-2"/> Google</IonButton>
        <IonButton class="twitter" @click="onClickLogin('twitter')"><TwitterIcon class="mr-2"/> Twitter</IonButton>
        <IonButton class="github" @click="onClickLogin('github')"><GithubIcon class="mr-2"/> Github</IonButton>
        <IonButton class="steam" @click="onClickLogin('steam')"><SteamIcon class="mr-2"/> Steam</IonButton>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { Browser } from '@capacitor/browser';
import GoogleIcon from 'vue-material-design-icons/Google.vue'
import TwitterIcon from 'vue-material-design-icons/Twitter.vue'
import GithubIcon from 'vue-material-design-icons/Github.vue'
import SteamIcon from 'vue-material-design-icons/Steam.vue'

export default {
  name: 'login',
  components: {
    GoogleIcon,
    TwitterIcon,
    GithubIcon,
    SteamIcon,
  },
  setup () {
    const onClickLogin = async (provider) => {
      const browser = Browser
      await browser.open({ url: `https://api.knockout.chat/auth/${provider}/login` })
    }

    return {
      onClickLogin
    }
  }
}
</script>

<style lang="scss" scoped>
  .twitter {
    --background: #1DA1F2;
  }
  .github {
    --background: #333;
  }
  .steam {
    --background: #171a21;
  }
</style>