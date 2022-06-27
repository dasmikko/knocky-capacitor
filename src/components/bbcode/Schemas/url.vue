<template>
  <a :href="node.shortcode.properties.href">
    <template v-if="!node.shortcode.content">{{node.shortcode.properties.href}}</template>
    <template v-else>{{node.shortcode.content}}</template>
  </a>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import { computed } from '@vue/reactivity';

export default {
  name: 'URLNode',
  props: {
    node: Object
  },
  setup(props) {
  }
}

</script>

<style lang="scss">
  
</style>