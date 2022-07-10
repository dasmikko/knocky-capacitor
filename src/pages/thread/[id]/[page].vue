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

        <ion-popover trigger="click-trigger" trigger-action="click" dismiss-on-select>
          <ion-list>
            <PopoverListItem @click="doRefresh">
              <template #icon><ReloadIcon/></template>
              Reload
            </PopoverListItem>
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
            :key="post.id"
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


<script setup>

import { useRoute, useRouter } from 'vue-router';
import {onMounted, ref, watch, computed, nextTick} from 'vue'
import { getThread } from '../../../utils/api';
import PostListItem from '../../../components/thread/post/postListItem.vue';
import Pagination from '../../../components/shared/pagination/pagination.vue'
import PopoverListItem from '../../../components/shared/popoverListItem.vue'
import { toastController } from '@ionic/vue'
import ReloadIcon from 'vue-material-design-icons/Reload.vue'

import {
  ellipsisHorizontal,
  ellipsisVertical,
} from 'ionicons/icons';

const router = useRouter();
const route = useRoute();
const thread = ref(null)
const page = ref(parseInt(route.params.page))
const isFetching = ref(false)
const contentRef = ref()
const hasScrolledToPost = ref(false)

const getContent = () => {
  return document.querySelector('#thread-content')
}


onMounted(async () => {
  loadThread()
})

const defaultHref = computed(() => {
  if (thread.value) return `/subforum/${thread.value.subforumId}/1`
})

const loadThread = async (event) => {
  try {
    isFetching.value = true
    thread.value = await getThread(route.params.id, page.value)
    isFetching.value = false

    await nextTick(() => {
      if (route.hash && !hasScrolledToPost) {
        let element = document.querySelector(route.hash);
        if (element) {
          element.scrollIntoView();
          hasScrolledToPost.value = true
        }
      }
    })

  } catch (e) {
    console.log(e)
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
  await loadThread()
  if (event) event.target.complete();
}

watch(
  page,
  async (newPage, oldPage) => {
    loadThread()
    getContent().scrollToTop(500)

    // Update the page inside the url
    history.pushState(
      {},
      null,
      `/thread/${route.params.id}/${newPage}`
    );
  }
)
</script>


<style lang="scss">

</style>
