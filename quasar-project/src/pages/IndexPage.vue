<template>
  <q-page padding>
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
const $q = useQuasar()


const items = ref([])
const isFetching = ref(false)



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
