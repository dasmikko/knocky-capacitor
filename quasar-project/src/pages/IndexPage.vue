<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >

    {{ items }}

    <div class="forum-items">
      <ForumListItem
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </div>
  </q-page>
</template>

<script setup>
import {getForum} from '../utils/api.js'
import { useQuasar } from 'quasar'
import { ref, onMounted } from 'vue'
import ForumListItem from '../components/forum/ForumListItem.vue'

console.log('hello?')

const items = ref([])
const isFetching = ref(false)

const $q = useQuasar()

const loadSubforums = async () => {
  try {
    isFetching.value = true
    const fetchedItems = await getForum()
    items.value = fetchedItems.list
    isFetching.value = false
  } catch (e) {
    console.error(e)

    $q.notify({
      type: 'negative',
      message: 'Failed to get subforums.',
    })

    isFetching.value = false
  }
}


onMounted( () => {
  console.log('On mounted')
  loadSubforums()
})

</script>
