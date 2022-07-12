<template>
  <div ref="tweetRef"></div>
</template>

<script>
import { onMounted, ref, computed, watch } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import {useIntersectionObserver} from '@vueuse/core'

export default {
  name: 'TwitterNode',
  props: {
    url: String,
  },
  setup(props) {
    const tweetIsLoaded = ref(false)
    const tweetRef = ref(null)
    const targetIsVisible = ref(false)

    const { stop } = useIntersectionObserver(
      tweetRef,
      ([{ isIntersecting }], observerElement) => {
        targetIsVisible.value = isIntersecting
      },
    )

    const getTweetId = (src) => {
      const twitterRegx = /^https?:\/\/(?:mobile\.)?twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/;
  
      const tweet = twitterRegx.exec(src);
      if (!tweet) return null;
      const tweetId = tweet[3];
      if (!tweetId) return null;

      return tweetId;
    };

    const tweetId = computed(() => getTweetId(props.url))

    const initTweet = () => {
      window.twttr = ((d, s, id) => {
        const fjs = d.getElementsByTagName(s)[0];
        const t = window.twttr || {};
        if (d.getElementById(id)) return t;
        const js = d.createElement(s);
        js.id = id;
        js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = (f) => {
          t._e.push(f);
        };

        return t;
      })(document, 'script', 'twitter-wjs');

      window.twttr.ready((twttr) => {
        twttr.widgets.createTweet(tweetId.value, tweetRef.value, {
          theme: 'dark',
        });
      });
    }

    watch(
      targetIsVisible,
      (newIsVisible) => {
        if (newIsVisible) {
          if (!tweetIsLoaded.value) {
            initTweet()
            tweetIsLoaded.value = true
          }

        }
      }
    )

    return {
      tweetRef
    }
  }
}

</script>

<style lang="scss">
  
</style>