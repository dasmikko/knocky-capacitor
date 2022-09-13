<template>
  <div class="bg-knockoutGray-800 mb-4 rounded" :id="`post-${post.id}`">
    <header>
      <div
        class="user-info"
        :class="{
          'is-new': postIsNew
        }"
      >
        <img class="mr-4" :src="`https://cdn.knockout.chat/image/${post.user.avatarUrl}`" alt="">
        <Username class="font-bold" :user="post.user" />
      </div>
      <div class="user-background">
        <img class=" " :src="`https://cdn.knockout.chat/image/${post.user.backgroundUrl}`" alt=""/>
      </div>
      
    </header>
    <div class="toolbar">
      {{timeago.format(post.createdAt)}} <span v-if="postIsEdited">(edited)</span> #{{post.threadPostNumber}}
    </div>
    <div class="post-content">
      <BbcodeRenderer
        :postIsVisible="true"
        :postId="post.id"
        :bbcode="post.content"
      />
    </div>

    <div class="flex p-3" v-if="post.ratings.length">
      <div
        class="flex flex-col mr-3 justify-center items-center"
        v-for="rating in post.ratings">
        <img class="w-5 mb-1" :src="ratingList[rating.rating].url" :alt="ratingList[rating.rating].name">
        <span class="text-xs text-neutral-300">{{rating.count}}</span>
      </div>
      <div
        :id="`post-${post.id}-click-trigger`"
        class="flex flex-col mr-3 justify-center items-center ion-activatable">

      </div>
      <Popper>
        <template #content>
          <div class="bg-neutral-900 rounded overflow-auto shadow-xl" style="max-height: 300px">
            <ul v-for="rating in post.ratings">
              <li class="font-bold flex px-4 py-2 mb-1 bg-neutral-700">
                <img class="w-5 h-5 mr-2" :src="ratingList[rating.rating].url" :alt="ratingList[rating.rating].name">
                {{ ratingList[rating.rating].name }}
              </li>
              <li v-for="user in rating.users"
                  class="px-4 py-1">
                <Username :user="user"/>
              </li>
            </ul>
          </div>
        </template>
        <EyeIcon class="text-neutral-400"/>
      </Popper>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import BbcodeRenderer from '../../bbcode/bbcodeRenderer.vue';
import Username from '../../shared/username.vue';
import ratingList from '../../../utils/ratingList.json'
import EyeIcon  from 'vue-material-design-icons/Eye.vue'
import Popper from "vue3-popper"
import * as timeago from 'timeago.js';

const props = defineProps({
  containerRef: Object,
  readThreadLastSeen: String,
  post: Object,
})

const headerStyles = computed(() => {
  return {
    'background-image': `https://cdn.knockout.chat/image/${props.post.user.backgroundUrl}`
  }
})

const postIsEdited = computed(() => {
  return props.post.createdAt !== props.post.updatedAt
})

const postIsNew = computed(() => {
  if (!props.readThreadLastSeen) return false
  return new Date(props.readThreadLastSeen) < new Date(props.post.createdAt)
})

</script>

<style lang="scss" scoped>
  header {
    @apply h-14 relative items-center justify-start overflow-hidden rounded-t;

    .user-info {
      @apply h-full relative z-20 p-2 flex items-center;

      &.is-new {
        @apply border-l-2 border-blue-400;
      }

      img {
        @apply h-10;
      }
    }

    .user-background {
      @apply absolute z-10 inset-0  w-full relative;
      filter: brightness(0.5) contrast(0.925);
      transition: filter 500ms ease-in-out 0s;

      img {
        @apply absolute w-full top-1/2 -translate-y-1/2;
      }
    }
  }
  .toolbar {
    @apply bg-knockoutGray-600 px-2 py-1 text-gray-300 text-sm;
  }

  .post-content {
    @apply p-3;
  }
</style>
