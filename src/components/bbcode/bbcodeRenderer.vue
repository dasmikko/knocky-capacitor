<template>
  <div class="bbcode-content">
    <Schema
      v-if="nodeTree.children.length"
      v-for="(node, index) in nodeTree.children"
      :nodes="nodeTree.children"
      :index="index"
      :node="node"
    />
    <span v-else>{{bbcode}}</span>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import { computed } from 'vue';

export default {
  name: "BBCodeRenderer",
  props: {
      bbcode: String,
  },
  setup(props) {
    const nodeTree = computed(() => {
        return ShortcodeTree.parse(props.bbcode);
    });

    return {
        nodeTree
    };
  },
  
}

</script>

<style lang="scss">
  .bbcode-content {
    @apply text-sm;
    line-height: 130%;

    span {
      @apply whitespace-pre-wrap;
      overflow-wrap: break-word;
    }
  }
</style>