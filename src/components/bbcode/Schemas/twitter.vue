<template>
  <div ref="tweetRef"></div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import { computed } from '@vue/reactivity';

export default {
  name: 'TwitterNode',
  props: {
    url: String,
  },
  setup(props) {
    const tweetRef = ref(null)

    const getTweetId = (src) => {
      const twitterRegx = /^https?:\/\/(?:mobile\.)?twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/;
  
      const tweet = twitterRegx.exec(src);
      if (!tweet) return null;
      const tweetId = tweet[3];
      if (!tweetId) return null;

      return tweetId;
    };

    const tweetId = computed(() => getTweetId(props.url))

    onMounted(() => {
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

    })

    return {
      tweetRef
    }
  }
}

</script>

<style lang="scss">
  
</style>