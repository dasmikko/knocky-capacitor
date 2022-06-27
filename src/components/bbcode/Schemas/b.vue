<template>
  <strong>{{text}}</strong>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import { computed } from '@vue/reactivity';

export default {
  name: 'BoldNode',
  props: {
    text: String,
  },
  setup(props) {
  }
}

</script>

<style lang="scss">
  
</style>