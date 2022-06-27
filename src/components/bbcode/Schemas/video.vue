<template>
  <video 
    id="video" 
    class="my-4"
    controls="" 
    preload="metadata">
    <source :src="url">
  </video>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import { computed } from '@vue/reactivity';

export default {
  name: 'VideoNode',
  props: {
    url: String,
  },
  setup(props) {
  }
}

</script>

<style lang="scss">
  
</style>