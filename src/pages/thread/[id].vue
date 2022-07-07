<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="defaultHref"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ thread ? thread.title : 'Loading...' }}</ion-title>

        <ion-buttons slot="primary">
          <ion-button id="click-trigger">
            <ion-icon slot="icon-only" :ios="ellipsisHorizontal" :md="ellipsisVertical"></ion-icon>
          </ion-button>
        </ion-buttons>

        <ion-popover trigger="click-trigger" trigger-action="click">
          <ion-list>
            <ion-item class="ion-activatable ripple-parent" @click="doRefresh">
              Reload
              <ion-ripple-effect></ion-ripple-effect>
            </ion-item>
          </ion-list>
        </ion-popover>

        <ion-progress-bar v-if="isFetching" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>

    <ion-content
      ref="contentRef"
      id="thread-content">
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
import {toastController, useBackButton} from '@ionic/vue'
import { useElementVisibility, useIntersectionObserver } from '@vueuse/core';

import {
  ellipsisHorizontal,
  ellipsisVertical,
} from 'ionicons/icons';

export default {
  name: 'ThreadPage',
  components: {
    Pagination,
    SubforumListItem,
    PostListItem,
  },
  setup () {
    const router = useRouter();
    const route = useRoute();
    const thread = ref(null)
    const page = ref(1)
    const isFetching = ref(false)
    const contentRef = ref()
    
    const getContent = () => {
      return document.querySelector('#thread-content')
    }
   

    onMounted(async () => {
      loadThread()
    })

    /*useBackButton(10, (processNextHandler) => {
      console.log('Handler was called!');

      console.log(lightbox.value)

      if (!lightBoxOpen.value) {
        processNextHandler();
      } else {
        lightbox.value.pswp.close()
      }

    });*

     */

    const defaultHref = computed(() => {
      if (thread.value) return `/subforum/${thread.value.subforumId}`
    })

    const loadThread = async (event) => {
      try {
        isFetching.value = true
        thread.value = await getThread(route.params.id, page.value)
        isFetching.value = false
      } catch (e) {
        const toast = await toastController
        .create({
          message: 'Failed to get thread.',
          color: 'danger',
          duration: 2000
        })
        isFetching.value = false
        return toast.present()
      }
    }

    const doRefresh = async (event) => {
      console.log(event)
      await loadThread()
      event.target.complete();
    }

    watch(
      page,
      async (newPage, oldPage) => {
        loadThread()
        getContent().scrollToTop(500)
      }
    )

    return {
      ellipsisHorizontal,
      ellipsisVertical,
      router,
      route,
      thread,
      contentRef,
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
