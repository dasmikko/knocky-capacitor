<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ subforum ? subforum.name : 'Loading...' }}</ion-title>
        <ion-progress-bar v-if="isFetching" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>

    <ion-content 
      ref="contentRef"
      id="subforum-content">
      <ion-refresher slot="fixed" id="refresher" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="container mx-auto">
        <template v-if="subforum">
          <Pagination
            class="pt-4 pb-2"
            v-model:page="page"
            :per-page="40"
            :total-count="subforum.totalThreads"/>

          <div
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{
              opacity: 1, y: 0,
              transition: {
                type: 'spring',
                stiffness: 250,
                damping: 30,
                mass: 0.5,
              },
            }"
            v-if="subforum.threads.length"
            class="p-2 threads">
            <subforum-list-item
              v-for="thread in subforum.threads"
              v-on:long-press="onLongPress"
              :key="thread.id"
              :thread="thread"
            />
          </div>

          <Pagination
            class="pb-4"
            v-model:page="page"
            :per-page="40"
            :total-count="subforum.totalThreads"/>
        </template>
      </div>
    </ion-content>
  </ion-page>
</template>


<script>

import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import {getSubforum, getThread} from '../../../utils/api.js'
import SubforumListItem from '../../../components/subforum/SubforumListItem.vue';
import Pagination from '../../../components/shared/pagination/pagination.vue';
import {actionSheetController, toastController} from '@ionic/vue'
import {numberPicker} from '../../../utils/picker.js'

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

export default {
  components: {
    SubforumListItem,
    Pagination
},
  setup () {
    const router = useRouter();
    const route = useRoute();
    const page = ref(parseInt(route.params.page))
    const isFetching = ref(false)
    const subforum = ref(null)
    const contentRef = ref(null)

    const loadSubforum = async (event) => {
      try {
        isFetching.value = true
        subforum.value = await getSubforum(route.params.id, page.value)
        isFetching.value = false
      } catch (e) {
        const toast = await toastController
        .create({
          message: 'Failed to get threads.',
          color: 'danger',
          duration: 2000
        })

        isFetching.value = false
        return toast.present()
      }
    }

    const getContent = () => {
      return document.querySelector('#subforum-content')
    }

    onMounted(async () => {
      loadSubforum()
    })

    const doRefresh = async (event) => {
      await loadSubforum()
      event.target.complete();
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
          ],
        });
      await actionSheet.present();
    }

    watch(
      page,
      async (newPage, oldPage) => {
        loadSubforum()
        getContent().scrollToTop(500)
      }
    )

    return {
      router,
      route,
      subforum,
      contentRef,
      doRefresh,
      page,
      isFetching,
      onLongPress
    }
  }
}
</script>


<style lang="scss">
  .threads {
    margin-bottom: env(safe-area-inset-bottom);
  }
</style>
