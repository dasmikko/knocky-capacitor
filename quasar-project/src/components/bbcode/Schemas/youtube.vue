<template>
  <iframe
    class="w-full aspect-video my-4"
    :src="youtubeUrl" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen></iframe>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import { computed } from '@vue/reactivity';

export default {
  name: 'YouTubeNode',
  props: {
    url: String,
  },
  setup(props) {
    const youtubeUrl = computed(() => {
      if (props.url.includes('youtu.be/')) return props.url.replace('youtu.be/', 'youtube.com/embed/')
      if (props.url.includes('www.youtube.com/watch?v=')) return props.url.replace('www.youtube.com/watch?v=', 'youtube.com/embed/')
    })

    return {
      youtubeUrl
    }
  }
}

</script>

<style lang="scss">
  
</style>