<template>
  <h2 class="text-lg font-bold">
    <Schema
      v-if="node.children.length"
      v-for="(cnode, index) in node.children"
      :index="index"
      :nodes="node.children"
      :node="cnode"
    />
    <span v-else>{{node.text}}</span>
  </h2>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import { computed } from '@vue/reactivity';

export default {
  name: 'H2Node',
  props: {
    node: Object
  },
  setup(props) {
  }
}

</script>

<style lang="scss">
  
</style>