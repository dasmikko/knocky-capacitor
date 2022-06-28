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
      id="main-content">
      <ion-refresher slot="fixed" id="refresher" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      
      <template v-if="subforum">
        <Pagination
          class="pt-4 pb-2"
          v-model:page="page"
          :per-page="40"
          :total-count="subforum.totalThreads"/>

        <div class="p-2">
          <subforum-list-item
            v-for="thread in subforum.threads"
            :thread="thread"
          />
        </div>

        <Pagination
          class="pb-4"
          v-model:page="page"
          :per-page="40"
          :total-count="subforum.totalThreads"/>
      </template>
    </ion-content>
  </ion-page>
</template>


<script>

import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import {getSubforum, getThread} from '../../utils/api'
import SubforumListItem from '../../components/subforum/SubforumListItem.vue';
import Pagination from '../../components/shared/pagination/pagination.vue';

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
    const page = ref(1)
    const isFetching = ref(false)
    const subforum = ref(null)

    const loadSubforum = async (event) => {
      isFetching.value = true
      subforum.value = await getSubforum(route.params.id, page.value)
      isFetching.value = false
    }

    onMounted(async () => {
      loadSubforum()
    })

    const doRefresh = async (event) => {
      await loadSubforum()
      event.target.complete();
    }

    watch(
      page,
      async (newPage, oldPage) => {
        loadSubforum()
      }
    )

    return {
      router,
      route,
      subforum,
      doRefresh,
      page,
      isFetching
    }
  }
}
</script>


<style lang="scss">

</style>
