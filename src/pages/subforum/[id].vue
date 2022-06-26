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
      
      <template v-if="subforum">
        <div class="p-2">
        <subforum-list-item
          v-for="thread in subforum.threads"
          :thread="thread"
          />
        </div>
      </template>
      {{route.params.id}}
      <a href="https://knockout.chat/login">test login</a>
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
      console.log(subforum.value)
    })

    return {
      router,
      route,
      subforum
    }
  }
}
</script>


<style lang="scss">

</style>
