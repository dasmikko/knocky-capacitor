<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ subforum ? subforum.name : 'Loading...' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content 
      id="main-content">
      <ion-refresher slot="fixed" id="refresher" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      
      <template v-if="subforum">
        <div class="p-2">
        <subforum-list-item
          v-for="thread in subforum.threads"
          :thread="thread"
          />
        </div>
      </template>
    </ion-content>
  </ion-page>
</template>


<script>

import { App } from '@capacitor/app';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getSubforum } from '../../utils/api';
import SubforumListItem from '../../components/subforum/SubforumListItem.vue';

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

export default {
  components: {
    SubforumListItem
},
  setup () {
    const router = useRouter();
    const route = useRoute();

    const subforum = ref(null)

    onMounted(async () => {
      subforum.value = await getSubforum(route.params.id)
    })

    const doRefresh = async (event) => {
      subforum.value = await getSubforum(route.params.id)
      event.target.complete();
    }

    return {
      router,
      route,
      subforum,
      doRefresh
    }
  }
}
</script>


<style lang="scss">

</style>
