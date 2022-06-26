<template>
  <div class="subforum-list-item ion-activatable ripple-parent">
    <div class="flex">
      <img class="w-12 mr-4" :src="threadIconUrl" alt=""/>
      <div class="flex flex-row">
        <p>{{thread.title}}</p>
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

export default {
  name: "ForumListItem",
  components: {
    IonRippleEffect,
    ChatBubbleIcon,
    ReplyAllIcon
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
    @apply bg-neutral-900 rounded p-4 mb-2 overflow-hidden;
  }

  .ripple-parent {
    position: relative;
    overflow: hidden;
  }
</style>