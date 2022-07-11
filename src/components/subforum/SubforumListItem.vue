<template>
  <div class="subforum-list-item ">
    <div class="flex">
      <div class="w-12 h-auto flex-shrink-0 mr-4 p-2 flex items-center bg-knockoutGray-700">
        <img class="max-w-full" :src="threadIconUrl" alt=""/>
      </div>

      <div class="flex flex-col py-2 pr-4">
        <p class="text-sm mb-1 ion-activatable ripple-parent" @click="onClick" @contextmenu="emit('longPress', thread)" >
          {{thread.title}}
          <ion-ripple-effect></ion-ripple-effect>
        </p>
        <div class="unreadPosts-container">
          <div v-if="thread.unreadPostCount"  class="inner ion-activatable ripple-parent" @click="onUnreadButtonClick">
            {{thread.unreadPostCount}} new posts
            <ion-ripple-effect></ion-ripple-effect></div>
        </div>
        <p class="text-xs text-neutral-400"><username :user="thread.user"/></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IonRippleEffect, actionSheetController, pickerController } from '@ionic/vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { getIcon } from '../../utils/icons';
import Username from '../shared/username.vue';
import { numberPicker } from "../../utils/picker";
import { unreadPostPage } from '../../utils/postsPerPage.js'

const props = defineProps({
  thread: Object,
})

const emit = defineEmits(['longPress'])

const router = useRouter()

const threadIconUrl = computed(() => {
  const url = getIcon(props.thread.iconId).url
  if (!url.startsWith('http')) return `https://knockout.chat/${url}`
  return url
})

const onClick = () => {
  router.push(`/thread/${props.thread.id}/1`)
}

const onUnreadButtonClick = () => {
  router.push(`/thread/${props.thread.id}/${unreadPostPage(props.thread.unreadPostCount, props.thread.postCount)}#post-${props.thread.firstUnreadId}`)
}
</script>

<style lang="scss" scoped>
  .subforum-list-item {
    @apply bg-knockoutGray-800 rounded mb-2 overflow-hidden;
  }

  .unreadPosts-container {
    .inner {
      @apply bg-sky-600 inline-block rounded py-1 px-2 text-sm mt-1 mb-1;
    }

  }

  .ripple-parent {
    position: relative;
    overflow: hidden;
  }
</style>