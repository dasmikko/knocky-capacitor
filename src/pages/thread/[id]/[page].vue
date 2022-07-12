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
            <PopoverListItem v-if="!thread.subscribed" @click="subscribeThread">
              <template #icon><BellIcon/></template>
              Subscribe
            </PopoverListItem>
            <PopoverListItem v-else @click="unsubscribeThread">
              <template #icon><BellOffIcon/></template>
              Unsubscribe
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

        <div
          v-motion
          :initial="initialState"
          :enter="{
            opacity: 1, y: 0,
            transition: {
              type: 'spring',
              stiffness: 250,
              damping: 30,
              mass: 0.5,
            },
          }"
          v-if="thread.posts.length"
          class="p-2">
          <post-list-item
            v-for="post in thread.posts"
            :key="post.id"
            :post="post"
            :read-thread-last-seen="thread.readThreadLastSeen"
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
import {createAlert, getThread, readThreads, unsubscribe} from '../../../utils/api'
import PostListItem from '../../../components/thread/post/postListItem.vue';
import Pagination from '../../../components/shared/pagination/pagination.vue'
import PopoverListItem from '../../../components/shared/popoverListItem.vue'
import { toastController, loadingController } from '@ionic/vue'
import ReloadIcon from 'vue-material-design-icons/Reload.vue'
import BellIcon from 'vue-material-design-icons/Bell.vue'
import BellOffIcon from 'vue-material-design-icons/BellOff.vue'

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

const initialState = computed(() => {
  if (route.hash) {
    return { opacity: 0, y: 0 }
  }
  return { opacity: 0, y: 100 }
})


onMounted(async () => {
  await loadThread()
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
      if (route.hash && !hasScrolledToPost.value) {
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

const subscribeThread = async () => {
  const lastPostNumber = thread.value.posts[thread.value.posts.length - 1].threadPostNumber;

  const loadingDialog = await loadingController.create({
    message: 'Subscribing thread...',
  })

  loadingDialog.present()

  try {
    // Subscribe to the thread
    await createAlert(thread.value.id, lastPostNumber)

    // Show a toast
    let toast = await toastController.create({
      message: 'Successfully subscribed to thread.',
      color: 'success',
      duration: 2000
    })
    toast.present()

    // Refresh thread
    doRefresh()
  } catch(e) {
    let toast = await toastController.create({
        message: 'Failed to subscribe to thread.',
        color: 'danger',
        duration: 2000
      })
      toast.present()
  } finally {
    loadingDialog.dismiss()
  }


}

const unsubscribeThread = async () => {
  const loadingDialog = await loadingController.create({
    message: 'Unsubscribing thread...',
  })

  loadingDialog.present()

  try {
    await unsubscribe(thread.value.id)

    // Show a toast
    let toast = await toastController.create({
      message: 'Successfully unsubscribed thread.',
      color: 'success',
      duration: 2000
    })
    toast.present()

    doRefresh()
  } catch (e) {
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

// Subscriptions
const updateAlerts = () => {
  const lastPostNumber = thread.value.posts[thread.value.posts.length - 1].threadPostNumber;

  if (thread.value.subscribed) {
    if (thread.value.subscriptionLastPostNumber == null ||
      thread.value.subscriptionLastPostNumber < lastPostNumber) {
      createAlert(thread.value.id, lastPostNumber)
    }
  }
}

// Read thread
const updateReadThread = () => {
  const lastPostDate = thread.value.posts[thread.value.posts.length - 1].createdAt;
  if (thread.value.readThreadLastSeen == null ||
    new Date(thread.value.readThreadLastSeen) < new Date(lastPostDate)) {
    readThreads(thread.value.id, lastPostDate)
  }
}



watch(
  page,
  async (newPage, oldPage) => {
    await loadThread()
    await nextTick(() => {
      getContent().scrollToTop(500)
    })

  }
)

watch(
  thread,
  (newThreadData) => {
    updateAlerts()
    updateReadThread()
  }
)
</script>


<style lang="scss">

</style>
