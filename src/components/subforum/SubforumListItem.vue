<template>
  <div class="subforum-list-item ion-activatable ripple-parent">
    <div class="flex">
      <div class="w-12 h-auto flex-shrink-0 mr-4 p-2 flex items-center bg-neutral-800">
        <img class="max-w-full" :src="threadIconUrl" alt=""/>
      </div>

      <div class="flex flex-col py-2 pr-4">
        <p class="text-sm mb-1">{{thread.title}}</p>
        <p class="text-xs text-neutral-400"><username :user="thread.user"/></p>
      </div>
    </div>
    
    
    <ion-ripple-effect></ion-ripple-effect>
  </div>
</template>

<script>
import { IonRippleEffect } from '@ionic/vue';
import ChatBubbleIcon from 'vue-material-design-icons/Chat.vue';
import ReplyAllIcon from 'vue-material-design-icons/ReplyAll.vue';
import * as timeago from 'timeago.js';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { getIcon } from '../../utils/icons';
import Username from '../shared/username.vue';

export default {
  name: "ForumListItem",
  components: {
    IonRippleEffect,
    ChatBubbleIcon,
    ReplyAllIcon,
    Username
},
  props: {
    thread: Object,
  },
  setup (props) {
    const router = useRouter()
    const statsClasses = computed(() => {
      return ['id-'+props.item.id]
    })

    const threadIconUrl = computed(() => {
      const url = getIcon(props.thread.iconId).url
      if (!url.startsWith('http')) return `https://knockout.chat/${url}`
      return url
    })


    return {
      router,
      timeago,
      statsClasses,
      getIcon,
      threadIconUrl
    }
  }
}
</script>

<style lang="scss">
  .subforum-list-item {
    @apply bg-neutral-900 rounded mb-2 overflow-hidden;
  }

  .ripple-parent {
    position: relative;
    overflow: hidden;
  }
</style>