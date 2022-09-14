<template>
  <div
    class="subforum-list-item"
    :class="{ 'has-read': thread.read && thread.hasRead && !(thread.unreadPostCount || unreadPosts) }"
  >
    <div class="tw-flex">
      <div class="tw-w-12 tw-h-auto tw-flex-shrink-0 tw-p-2 tw-flex tw-items-center tw-bg-knockoutGray-700">
        <img class="tw-max-w-full" :src="threadIconUrl" alt=""/>
      </div>

      <div class="tw-relative tw-flex tw-flex-col tw-w-full ">
        <div
          @click="onClick" @contextmenu="emit('longPress', thread)"
          class="tw-background-trigger">
        </div>
        <div class="tw-py-2 tw-px-4">
          <p class="tw-text-sm tw-mb-1">
            <NoteIcon v-if="thread.pinned" :size="14" class="tw-inline-block tw-align-text-top tw-text-green-500"/>
            <LockIcon v-if="thread.locked" :size="14" class="tw-inline-block tw-align-text-top tw-text-yellow-500"/>
            {{thread.title}}
          </p>
          <div class="unreadPosts-container">
            <div v-if="thread.unreadPostCount || unreadPosts" class="inner ion-activatable ripple-parent" @click="onUnreadButtonClick">
              {{thread.unreadPostCount || unreadPosts}} new {{thread.unreadPostCount === 1 || unreadPosts === 1 ? 'post' : 'posts'}}
            </div>
          </div>
          <p class="tw-text-xs tw-text-neutral-400" v-if="thread.tags && thread.tags.length">
            <span
              v-for="tag in Object.values(thread.tags[0])"
              :key="tag"
              class="tw-mr-2 tw-bg-gray-600 tw-text-white tw-p-1"
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
