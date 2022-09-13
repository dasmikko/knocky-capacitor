<template>
  <div
    class="subforum-list-item"
    :class="{ 'has-read': thread.read && thread.hasRead && !(thread.unreadPostCount || unreadPosts) }"
  >
    <div class="flex">
      <div class="w-12 h-auto flex-shrink-0 p-2 flex items-center bg-knockoutGray-700">
        <img class="max-w-full" :src="threadIconUrl" alt=""/>
      </div>

      <div class="relative flex flex-col w-full ">
        <div
          @click="onClick" @contextmenu="emit('longPress', thread)"
          class="background-trigger ion-activatable ripple-parent">
        </div>
        <div class="py-2 px-4">
          <p class="text-sm mb-1">
            <NoteIcon v-if="thread.pinned" :size="14" class="inline-block align-text-top text-green-500"/>
            <LockIcon v-if="thread.locked" :size="14" class="inline-block align-text-top text-yellow-500"/>
            {{thread.title}}
          </p>
          <div class="unreadPosts-container">
            <div v-if="thread.unreadPostCount || unreadPosts" class="inner ion-activatable ripple-parent" @click="onUnreadButtonClick">
              {{thread.unreadPostCount || unreadPosts}} new {{thread.unreadPostCount === 1 || unreadPosts === 1 ? 'post' : 'posts'}}
            </div>
          </div>
          <p class="text-xs text-neutral-400" v-if="thread.tags && thread.tags.length">
            <span
              v-for="tag in Object.values(thread.tags[0])"
              :key="tag"
              class="mr-2 bg-gray-600 text-white p-1"
            >{{ tag }}</span>
            <username :user="thread.user"/>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { getIcon } from '../../utils/icons';
import Username from '../shared/UsernameLabel.vue';
import { numberPicker } from "../../utils/picker";
import { unreadPostPage } from '../../utils/postsPerPage.js'
import NoteIcon from 'vue-material-design-icons/Note.vue'
import LockIcon from 'vue-material-design-icons/Lock.vue'

const props = defineProps({
  thread: Object,
  firstUnreadId: Number,
  unreadPosts: Number
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
  if (props.firstUnreadId) {
    router.push(`/thread/${props.thread.id}/${unreadPostPage(props.unreadPosts, props.thread.postCount)}#post-${props.firstUnreadId}`)
  } else {
    router.push(`/thread/${props.thread.id}/${unreadPostPage(props.thread.unreadPostCount, props.thread.postCount)}#post-${props.thread.firstUnreadId}`)
  }

}
</script>

<style lang="scss" scoped>
  .subforum-list-item {
    @apply bg-knockoutGray-800 rounded mb-2 overflow-hidden;

    .background-trigger {
      @apply absolute h-full w-full top-0 -mr-4;
    }

    &.has-read {
      @apply opacity-60;
    }
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
