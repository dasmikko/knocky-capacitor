<template>
  <div class="bg-neutral-800 mb-4 rounded">
    <header>
      <div class="user-info">
        <img class="mr-4" :src="`https://cdn.knockout.chat/image/${post.user.avatarUrl}`" alt="">
        <Username class="font-bold" :user="post.user" />
      </div>
      <div class="user-background">
        <img class=" " :src="`https://cdn.knockout.chat/image/${post.user.backgroundUrl}`" alt=""/>
      </div>
      
    </header>
    <div class="toolbar">

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
        <EyeIcon class="text-neutral-400"/>
      </div>
      <ion-popover
        :trigger="`post-${post.id}-click-trigger`"
        trigger-action="click"
        dismiss-on-select>
        <div style="max-height: 200px">
          <ul v-for="rating in post.ratings">
            <li class="font-bold flex p-2 bg-neutral-700">
              <img class="w-5 h-5 mr-2" :src="ratingList[rating.rating].url" :alt="ratingList[rating.rating].name">
              {{ ratingList[rating.rating].name }}
            </li>
            <li v-for="user in rating.users"
                class="px-2 py-1">
              <Username :user="user"/>
            </li>
          </ul>
        </div>

      </ion-popover>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import BbcodeRenderer from '../../bbcode/bbcodeRenderer.vue';
import Username from '../../shared/username.vue';
import ratingList from '../../../utils/ratingList.json'
import EyeIcon  from 'vue-material-design-icons/Eye.vue'

export default {
    name: "PostListItem",
    props: {
      containerRef: Object,
      post: Object,
    },
    components: {
      BbcodeRenderer,
      Username,
      EyeIcon
    },
    setup(props) {
      const headerStyles = computed(() => {
        return {
          'background-image': `https://cdn.knockout.chat/image/${props.post.user.backgroundUrl}`
        }
      })

      return {
        headerStyles,
        ratingList
      }
    }
}

</script>

<style lang="scss" scoped>
  header {
    @apply h-14 relative items-center justify-start overflow-hidden rounded-t;

    .user-info {
      @apply h-full relative z-20 p-2 flex items-center;

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
    @apply bg-neutral-700 h-4;
  }

  .post-content {
    @apply p-3;
  }
</style>
