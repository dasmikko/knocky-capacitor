<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="defaultHref"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ thread ? thread.title : 'Loading...' }}</ion-title>
        <ion-progress-bar v-if="isFetching" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>

    <ion-content 
      id="main-content">
      <ion-refresher slot="fixed" id="refresher" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <template v-if="thread">
        <Pagination
          class="pt-4 pb-2"
          v-model:page="page"
          :total-count="thread.postCount"/>

        <div class="p-2">
          <post-list-item
            v-for="post in thread.posts"
            :post="post"
          />
        </div>

        <Pagination
          class="pb-4"
          v-model:page="page"
          :total-count="thread.postCount"/>
      </template>
    </ion-content>
  </ion-page>
</template>


<script>

import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { getThread } from '../../utils/api';
import SubforumListItem from '../../components/subforum/SubforumListItem.vue';
import PostListItem from '../../components/thread/post/postListItem.vue';
import { computed } from '@vue/reactivity';
import Pagination from '../../components/shared/pagination/pagination.vue'

export default {
  name: 'ThreadPage',
  components: {
    Pagination,
    SubforumListItem,
    PostListItem
  },
  setup () {
    const router = useRouter();
    const route = useRoute();
    const thread = ref(null)
    const page = ref(1)
    const isFetching = ref(false)

    onMounted(async () => {
      loadThread()
    })

    const defaultHref = computed(() => {
      if (thread.value) return `/subforum/${thread.value.subforumId}`
    })

    const loadThread = async (event) => {
      isFetching.value = true
      thread.value = await getThread(route.params.id, page.value)
      isFetching.value = false
    }

    const doRefresh = async (event) => {
      loadThread()
      event.target.complete();
    }

    watch(
      page,
      async (newPage, oldPage) => {
        loadThread()
      }
    )

    return {
      router,
      route,
      thread,
      doRefresh,
      defaultHref,
      page,
      isFetching
    }
  }
}
</script>


<style lang="scss">

</style>
