<template>
  <ion-page>
    <ion-menu
      maxEdgeStart="20"
      side="start"
      content-id="main-content">
      <ion-content>
        <header
          class="p-4"
          :style="{
            'background-image': `url(https://cdn.knockout.chat/image/${authStore.isAuthenticated ? authStore.userInfo.background_url : null})`,
            'background-size': 'cover',
            'background-position': 'center',
          }"
        >
          <template v-if="authStore.isAuthenticated">
            <img
              class="rounded-full h-16 mb-10"
              :src="'https://cdn.knockout.chat/image/' + authStore.userInfo.avatar_url" alt="">

            <div>
              <div>{{authStore.userInfo.username}}</div>
            </div>
          </template>

          <template v-if="!authStore.isAuthenticated">
            Not Logged in
          </template>
        </header>

        <ion-list>
          <ion-item class="ion-activatable">
            <ion-label>Subcriptions</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Latest threads</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Popular threads</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Settings</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Knocky</ion-title>
        <ion-progress-bar v-if="isFetching" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>

    <ion-content
      :fullscreen="true" 
      id="main-content">   
      <ion-refresher slot="fixed" id="refresher" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>   

      <ul class="p-2">
        <li v-for="item in items">
          <forum-list-item
            :item="item"/>
        </li>
      </ul>
    </ion-content>
  </ion-page>
</template>


<script>

import { App } from '@capacitor/app';
import HelloWorld from '../components/HelloWorld.vue'
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getForum } from '../utils/api'
import ForumListItem from '../components/forum/ForumListItem.vue';
import {useStore} from '../stores/auth.js'
import Username from '../components/shared/username.vue'
import { toastController } from '@ionic/vue'; 
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

export default {
  components: {
    Username,
    HelloWorld,
    ForumListItem
},
  setup () {
    const router = useRouter();
    const items = ref([])
    const isFetching = ref(false)
    const authStore = useStore()

    const onClick = () => {
      router.push('/test')
    }

    const loadSubforums = async () => {
      try {
        isFetching.value = true
        const fetchedItems = await getForum()
        items.value = fetchedItems.list
        isFetching.value = false
      } catch (e) {
        const toast = await toastController
        .create({
          message: 'Failed to get subforums.',
          color: 'danger',
          duration: 2000
        })

        isFetching.value = false
        return toast.present()
      }
    }

   const doRefresh = async (event) => {
      await loadSubforums()
      event.target.complete();
    }

    onMounted(async () => {
      loadSubforums()
    })

    return {
      router,
      onClick,
      items,
      doRefresh,
      isFetching,
      authStore
    }
  }
}
</script>


<style lang="scss">

</style>
