<template>
  <div class="forum-list-item">
    <header class="p-2">
      {{item.name}}
    </header>
    <section>
      <ChatBubbleIcon />
      <ReplyAllIcon/>
    </section>
  </div>
</template>

<script>
import ChatBubbleIcon from 'vue-material-design-icons/Chat.vue';
import ReplyAllIcon from 'vue-material-design-icons/ReplyAll.vue';

export default {
  name: "ForumListItem",
  components: {
    ChatBubbleIcon,
    ReplyAllIcon
  },
  props: {
    item: Object,
  },
  setup (props) {


    return {

    }
  }
}
</script>

<style lang="scss">
  .forum-list-item {
    @apply bg-neutral-800 rounded mb-4; 
  }
</style>