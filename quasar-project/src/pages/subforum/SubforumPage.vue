<template>
  <q-page padding>
    <template v-if="subforum">
      <Pagination
        class="tw-pb-2"
        v-model:page="page"
        :per-page="40"
        :total-count="subforum.totalThreads"/>

      <div
        v-if="subforum.threads.length"
        class="tw-p-2 threads">
        <SubForumListItem
          v-for="thread in subforum.threads"
          v-on:long-press="onLongPress"
          :key="thread.id"
          :thread="thread"
        />
      </div>

      <Pagination
        v-model:page="page"
        :per-page="40"
        :total-count="subforum.totalThreads"/>
    </template>
  </q-page>
</template>

<script setup>
import {getSubforum} from '../../utils/api.js'
import {onMounted, ref, watch} from 'vue'
import {useQuasar} from 'quasar'
import { useRoute } from 'vue-router'
import Pagination from '../../components/shared/pagination/pagination.vue'
import SubForumListItem from '../../components/subforum/SubforumListItem.vue'


const route = useRoute()
const $q = useQuasar()
const page = ref(parseInt(route.params.page))
const isFetching = ref(false)
const subforum = ref(null)

const loadSubforum = async (event) => {
  try {
    isFetching.value = true
    subforum.value = await getSubforum(route.params.id, page.value)
    isFetching.value = false
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'Failed to get threads.',
    })
    isFetching.value = false
  }
}

const onLongPress = async (thread) => {

}

onMounted(async () => {
  loadSubforum()
})

watch(
  page,
  async (newPage, oldPage) => {
    loadSubforum()
    //getContent().scrollToTop(500)
  }
)
</script>

<style scoped>

</style>
