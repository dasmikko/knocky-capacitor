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
        :postId="post.id"
        :bbcode="post.content"
      />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import BbcodeRenderer from '../../bbcode/bbcodeRenderer.vue';
import Username from '../../shared/username.vue';
export default {
    name: "PostListItem",
    props: {
        post: Object,
    },
    components: { BbcodeRenderer, Username },
    setup(props) {
      const headerStyles = computed(() => {
        return {
          'background-image': `https://cdn.knockout.chat/image/${props.post.user.backgroundUrl}`
        }
      })

      return {
        headerStyles
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
