<template>
  <ion-page>
     <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Subscriptions</ion-title>
        <ion-progress-bar v-if="isFetching" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>

    <ion-content
      id="main-content">   
      <ion-refresher slot="fixed" id="refresher" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>   

      <ul class="p-2">
        <li v-for="item in items">
          <SubforumListItem
            :thread="item.thread"/>
        </li>
      </ul>
    </ion-content>
  </ion-page>
</template>


<script setup>
import { App } from '@capacitor/app';
import HelloWorld from '../components/HelloWorld.vue'
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import {getAlerts, getForum} from '../utils/api'
import ForumListItem from '../components/forum/ForumListItem.vue';
import SubforumListItem from '../components/subforum/SubforumListItem.vue';
import {useStore} from '../stores/auth.js'
import Username from '../components/shared/username.vue'
import DrawerListItem from '../components/drawer/drawerListItem.vue'
import { toastController } from '@ionic/vue';

const router = useRouter();
const items = ref([])
const isFetching = ref(false)
const authStore = useStore()

const onClick = () => {
  router.push('/test')
}

const loadSubscriptions = async () => {
  try {
    isFetching.value = true
    const fetchedItems = await getAlerts()
    items.value = fetchedItems.alerts
    isFetching.value = false
  } catch (e) {
    const toast = await toastController
    .create({
      message: 'Failed to get subscriptions.',
      color: 'danger',
      duration: 2000
    })

    isFetching.value = false
    return toast.present()
  }
}

const doRefresh = async (event) => {
  await loadSubscriptions()
  event.target.complete();
}

onMounted(async () => {
  loadSubscriptions()
})


</script>


<style lang="scss">

</style>
