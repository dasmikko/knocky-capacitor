<template>
  <ion-page>
    <ion-menu
      maxEdgeStart="20"
      side="start"
      content-id="main-content">
      <ion-header>
        <ion-toolbar translucent>
          <ion-title>BOO!</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <a href="https://knockout.chat/login">test login</a>
        <ion-button @click="router.push('/login')">Login</ion-button>
        <ion-button @click="router.push('/subpage')">Page</ion-button>
        <ion-button @click="onClick">Go to another page</ion-button>
      </ion-content>
    </ion-menu>

    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Knocky</ion-title>
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

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

export default {
  components: {
    HelloWorld,
    ForumListItem
},
  setup () {
    const router = useRouter();
    
    const items = ref([])

    const onClick = () => {
      router.push('/test')
    }

    const doRefresh = async (event) => {
      const fetchedItems = await getForum()
      items.value = fetchedItems.list
      event.target.complete();
    }

    onMounted(async () => {
      const fetchedItems = await getForum()
      items.value = fetchedItems.list
      console.log(items.value)
    })

    return {
      router,
      onClick,
      items,
      doRefresh
    }
  }
}
</script>


<style lang="scss">

</style>
