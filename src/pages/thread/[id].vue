<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ thread ? thread.title : 'Loading...' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content 
      id="main-content">
      <ion-refresher slot="fixed" id="refresher" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      
      <template v-if="thread">
        <div class="p-2">
          <post-list-item
            v-for="post in thread.posts"
            :post="post"
          />
        </div>
      </template>
    </ion-content>
  </ion-page>
</template>


<script>

import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getThread } from '../../utils/api';
import SubforumListItem from '../../components/subforum/SubforumListItem.vue';
import PostListItem from '../../components/thread/post/postListItem.vue';

export default {
  components: {
    SubforumListItem,
    PostListItem
},
  setup () {
    const router = useRouter();
    const route = useRoute();
    const thread = ref(null)

    onMounted(async () => {
      thread.value = await getThread(route.params.id)
    })

    const doRefresh = async (event) => {
      thread.value = await getThread(route.params.id)
      event.target.complete();
    }

    return {
      router,
      route,
      thread,
      doRefresh
    }
  }
}
</script>


<style lang="scss">

</style>
