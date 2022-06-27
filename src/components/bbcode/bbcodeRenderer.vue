<template>
  <div class="bbcode-content">
    <Schema
      v-if="nodeTree.children.length"
      v-for="node in nodeTree.children"
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
    span {
      @apply whitespace-pre-wrap;
      overflow-wrap: break-word;
    }
  }
</style>