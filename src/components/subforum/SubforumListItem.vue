<template>
  <div class="subforum-list-item ">
    <div class="flex">
      <div class="w-12 h-auto flex-shrink-0 mr-4 p-2 flex items-center bg-neutral-800">
        <img class="max-w-full" :src="threadIconUrl" alt=""/>
      </div>

      <div class="flex flex-col py-2 pr-4">
        <p class="text-sm mb-1 ion-activatable ripple-parent" @click="onClick" @contextmenu="onLongPress" >
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

const onLongPress = async () => {
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
              const totalPages = Math.ceil(props.thread.postCount / 20)
              let picker = await numberPicker(1, totalPages, 1, {}, (val) => {
                router.push(`/thread/${props.thread.id}/${val}`)
              })
              await picker.present()
            },
          },
        ],
      });
  await actionSheet.present();
}
</script>

<style lang="scss" scoped>
  .subforum-list-item {
    @apply bg-neutral-900 rounded mb-2 overflow-hidden;
  }

  .unreadPosts-container {
    .inner {
<<<<<<< HEAD
      @apply bg-sky-600 inline-block rounded py-1 px-2 text-sm mb-2;
=======
      @apply bg-sky-600 inline-block rounded py-1 px-2 text-sm mt-1 mb-1;
>>>>>>> main
    }

  }

  .ripple-parent {
    position: relative;
    overflow: hidden;
  }
</style>