<template>
  <div class="forum-list-item">
    <header class="p-2 flex ion-activatable ripple-parent bg-knockoutGray-700" @click="router.push(`/subforum/${item.id}/1`)">
      <div class="flex-1">
        <p class="text-lg font-bold">{{item.name}}</p>
        <div class="flex text-xs">
          <div class="flex items-center mr-4"><ChatBubbleIcon :size="14" class="mr-1" /> {{item.totalThreads}}</div>
          <div class="flex items-center "><ReplyAllIcon :size="14" class="mr-1"/> {{item.totalPosts}}</div>
        </div>
      </div>
      <div class="flex items-center justify-end">
        <img :src="item.icon"  alt="" class="h-11">
      </div>
      <ion-ripple-effect></ion-ripple-effect>
    </header>
    <section class="stats p-2 ion-activatable ripple-parent" :class="statsClasses" @click="router.push(`/thread/${item.lastPost.thread.id}/${item.lastPost.page}#post-${item.lastPost.id}`)">
      <p class="text-sm truncate text-ellipsis overflow-hidden">{{item.lastPost.thread.title}}</p>
      <p class="text-xs text-neutral-400">Last post by <UsernameLabel :user="item.lastPost.user"/> {{timeago.format(item.lastPost.updatedAt)}}</p>
      <ion-ripple-effect></ion-ripple-effect>
    </section>
  </div>
</template>

<script>
import { IonRippleEffect } from '@ionic/vue';
import ChatBubbleIcon from 'vue-material-design-icons/Chat.vue';
import ReplyAllIcon from 'vue-material-design-icons/ReplyAll.vue';
import * as timeago from 'timeago.js';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import UsernameLabel from '../shared/UsernameLabel.vue';

export default {
  name: "ForumListItem",
  components: {
    IonRippleEffect,
    ChatBubbleIcon,
    ReplyAllIcon,
    UsernameLabel
},
  props: {
    item: Object,
  },
  setup (props) {
    const router = useRouter()
    const statsClasses = computed(() => {
      return ['id-'+props.item.id]
    })


    return {
      router,
      timeago,
      statsClasses
    }
  }
}
</script>

<style lang="scss">
  .forum-list-item {
    @apply bg-knockoutGray-800 rounded mb-2 overflow-hidden;

    .stats {
      @apply relative;

      &::after {
        content: "";
        display: block;
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        width: 100%;
        height: 1px;
        background: white;
      }

      &.id-1::after {
        background: linear-gradient(270deg, rgb(255, 158, 57) 0%, rgb(241, 109, 15) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }

      &.id-2::after {
        background: linear-gradient(270deg, rgb(60, 255, 24) 0%, rgb(255, 206, 26) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }

      &.id-3::after {
        background: linear-gradient(270deg, rgb(27, 255, 177) 0%, rgb(45, 187, 255) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }

      &.id-4::after {
        background: linear-gradient(270deg, rgb(128, 216, 255) 0%, rgb(181, 63, 177) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }

      &.id-5::after {
        background: linear-gradient(270deg, rgb(175, 92, 45) 0%, rgb(117, 59, 36) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }

      &.id-6::after {
        background: linear-gradient(270deg, rgb(255, 124, 85) 0%, rgb(241, 90, 42) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }

      &.id-7::after {
        background: linear-gradient(270deg, rgb(25, 208, 166) 0%, rgb(37, 153, 165) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }

       &.id-8::after {
        background: linear-gradient(270deg, rgb(255, 249, 74) 0%, rgb(102, 149, 41) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }

      &.id-9::after {
        background: linear-gradient(270deg, rgb(148, 102, 34) 0%, rgb(222, 182, 124) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }

      &.id-10::after {
        background: linear-gradient(270deg, rgb(218, 70, 255) 0%, rgb(218, 35, 97) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }

      &.id-11::after {
        background: linear-gradient(270deg, rgb(76, 175, 232) 0%, rgb(59, 85, 146) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }

      &.id-12::after {
        background: linear-gradient(270deg, rgb(171, 121, 119) 0%, rgb(189, 64, 69) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }

      &.id-14::after {
        background: linear-gradient(270deg, rgb(148, 102, 34) 0%, rgb(222, 182, 124) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }

      &.id-16::after {
        background: linear-gradient(270deg, rgb(30, 95, 179) 0%, rgb(167, 189, 217) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0);
      }


    }
  }

  .ripple-parent {
    position: relative;
    overflow: hidden;
  }
</style>
