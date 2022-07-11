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
            v-on:long-press="onLongPress"
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
import {getAlerts, getForum, unsubscribe} from '../utils/api'
import ForumListItem from '../components/forum/ForumListItem.vue';
import SubforumListItem from '../components/subforum/SubforumListItem.vue';
import {useStore} from '../stores/auth.js'
import Username from '../components/shared/username.vue'
import DrawerListItem from '../components/drawer/drawerListItem.vue'
import {actionSheetController, loadingController, toastController, alertController} from '@ionic/vue'
import {numberPicker} from '../utils/picker.js'

const router = useRouter();
const items = ref([])
const isFetching = ref(false)
const authStore = useStore()



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
  if(event && event.target) event.target.complete();
}

const unsubscribeThread = async (thread) => {
  const loadingDialog = await loadingController.create({
    message: 'Unsubscribing thread...',
  })

  loadingDialog.present()

  try {
    await unsubscribe(thread.id)

    // Show a toast
    let toast = await toastController.create({
      message: 'Successfully unsubscribed thread.',
      color: 'success',
      duration: 2000
    })
    toast.present()

    doRefresh()
  } catch (e) {
    console.error(e)
    let toast = await toastController.create({
      message: 'Failed to unsubscribe thread.',
      color: 'danger',
      duration: 2000
    })
    toast.present()
  } finally {
    loadingDialog.dismiss()
  }
}

const onLongPress = async (thread) => {
  const actionSheet = await actionSheetController
    .create({
      buttons: [
        {
          text: 'Jump to page',
          role: 'jump',
          icon: `data:image/svg+xml;utf8,<svg style="width:24px;height:24px" viewBox="0 0 24 24">
<path fill="currentColor" d="M21.5 14.5L16 20L10.5 14.5L11.91 13.09L15 16.17V10.5C15 8 13 6 10.5 6S6 8 6 10.5V18H4V10.5C4 6.91 6.91 4 10.5 4S17 6.91 17 10.5V16.17L20.09 13.08L21.5 14.5Z" />
</svg>`,
          id: 'jump-to-page-button',
          data: {
            type: 'delete'
          },
          handler: async () => {
            const totalPages = Math.ceil(thread.postCount / 20)
            let picker = await numberPicker(1, totalPages, 1, {}, (val) => {
              router.push(`/thread/${thread.id}/${val}`)
            })
            await picker.present()
          },
        },
        {
          text: 'Unsubscribe',
          role: 'unsubscribe',
          icon: `data:image/svg+xml;utf8,<<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M20.84,22.73L18.11,20H3V19L5,17V11C5,9.86 5.29,8.73 5.83,7.72L1.11,3L2.39,1.73L22.11,21.46L20.84,22.73M19,15.8V11C19,7.9 16.97,5.17 14,4.29C14,4.19 14,4.1 14,4A2,2 0 0,0 12,2A2,2 0 0,0 10,4C10,4.1 10,4.19 10,4.29C9.39,4.47 8.8,4.74 8.26,5.09L19,15.8M12,23A2,2 0 0,0 14,21H10A2,2 0 0,0 12,23Z" />
</svg>`,
          id: 'unsubscribe-button',
          handler: async () => {
            const alert = await alertController.create({
              header: 'Are you sure?',
              buttons: [
                {
                  text: 'No',
                  role: 'cancel',
                  handler: () => { }
                },
                {
                  text: 'Yes',
                  role: 'confirm',
                  handler: () => { unsubscribeThread(thread) }
                }
              ]
            });

            await alert.present();

          },
        },
      ],
    });
  await actionSheet.present();
}

onMounted(async () => {
  loadSubscriptions()
})


</script>


<style lang="scss">

</style>
