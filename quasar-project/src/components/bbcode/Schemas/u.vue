<template>
  <u>
    <Schema
      v-if="node.children.length"
      v-for="(cnode, index) in node.children"
      :index="index"
      :nodes="node.children"
      :node="cnode"
    />
    <template v-else>{{node.text}}</template>
  </u>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import { computed } from '@vue/reactivity';

export default {
  name: 'UnderlinedNode',
  props: {
    node: Object
  },
  setup(props) {
  }
}

</script>

<style lang="scss">
  
</style>