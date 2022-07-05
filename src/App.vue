
<script>
import { IonButton, IonApp, IonRouterOutlet } from '@ionic/vue';
import { useBackButton, useIonRouter } from '@ionic/vue';
import { App } from '@capacitor/app';
import HelloWorld from './components/HelloWorld.vue'
import { useRoute, useRouter } from 'vue-router';
import {onMounted} from 'vue'
import {getSyncData, getUser} from './utils/api.js'
import {useStore} from './stores/auth.js'

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
    const router = useRouter()
    const ionRouter = useIonRouter();
    const authStore = useStore()

    App.addListener('appUrlOpen', function (event) {
      // url: 'https://api.knockout.chat/auth/finish?user=%257B%2522id%2522%253A73%252C%2522username%2522%253A%2522tisseman890%2522%252C%2522avatar_url%2522%253A%252273.webp%2522%252C%2522background_url%2522%253A%252273-bg.webp%2522%252C%2522usergroup%2522%253A1%252C%2522role%2522%253A%257B%2522id%2522%253A4%252C%2522code%2522%253A%2522basic-user%2522%252C%2522description%2522%253A%2522A%2520basic%2520user%2520with%2520normal%2520forum%2520access%2522%252C%2522permissionCodes%2522%253A%255B%255D%252C%2522createdAt%2522%253A%25222021-10-25T23%253A41%253A10.000Z%2522%252C%2522updatedAt%2522%253A%25222021-10-25T23%253A41%253A10.000Z%2522%257D%257D'
      // Example url: https://beerswift.app/tabs/tabs2
      // slug = /tabs/tabs2
      console.log(event)
      const slug = event.url.split('.app').pop();

      // We only push to the route if there is a slug present
      if (slug) {
        router.push({
          path: slug,
        });
      }
    });

    useBackButton(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });

    const checkAuthState = async () => {
      try {
        const syncData = await getSyncData()
        const { user } = await getUser()
        console.log(syncData)
        authStore.$patch({
          isAuthenticated: true,
          userInfo: user
        })
      } catch(e) {
        // Not logged in
      }

    }

    onMounted(async () => {
      checkAuthState()
    })


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
