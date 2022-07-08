<template>
  <div class="subforum-list-item ion-activatable ripple-parent" @click="onClick" @contextmenu="onLongPress">
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
import { IonRippleEffect, actionSheetController, pickerController } from '@ionic/vue';
import { caretForwardCircle, close, heart, trash, share } from 'ionicons/icons';
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

    const threadIconUrl = computed(() => {
      const url = getIcon(props.thread.iconId).url
      if (!url.startsWith('http')) return `https://knockout.chat/${url}`
      return url
    })

    const onClick = () => {
      router.push(`/thread/${props.thread.id}`)
    }

    const onLongPress = async () => {
      console.log(trash)
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
                  const picker = await pickerController.create({
                    columns: [
                      {
                        name: 'languages',
                        options: [
                          {
                            text: 'JavaScript',
                            value: 'javascript',
                          },
                          {
                            text: 'TypeScript',
                            value: 'typescript',
                          },
                          {
                            text: 'Rust',
                            value: 'rust',
                          },
                          {
                            text: 'C#',
                            value: 'c#',
                          },
                        ],
                      },
                    ],
                    buttons: [
                      {
                        text: 'Cancel',
                        role: 'cancel',
                      },
                      {
                        text: 'Confirm',
                        handler: (value) => {
                          window.alert(`You selected: ${value.languages.value}`);
                        },
                      },
                    ],
                  });
                  await picker.present();
                },
              },
            ],
          });
      await actionSheet.present();
    }


    return {
      router,
      timeago,
      getIcon,
      onClick,
      threadIconUrl,
      onLongPress,
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