<template>
  <h1 class="text-xl font-bold">
    <Schema
      v-if="node.children.length"
      v-for="(cnode, index) in node.children"
      :index="index"
      :nodes="node.children"
      :node="cnode"
    />
    <span v-else>{{node.text}}</span>
  </h1>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import { computed } from '@vue/reactivity';

export default {
  name: 'H1Node',
  props: {
    node: Object
  },
  setup(props) {
  }
}

</script>

<style lang="scss">
  
</style>