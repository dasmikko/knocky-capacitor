<template>
  <img :src="url" alt=""/>
  
</template>

<script>
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import { computed } from '@vue/reactivity';

export default {
  name: 'ImageNode',
  props: {
    url: String,
  },
  setup(props) {
  }
}

</script>

<style lang="scss">
  
</style>