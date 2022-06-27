<template>
  <ul class="list-disc list-inside">
    <Schema
      v-for="node in listItems"
      :node="node"
    />
  </ul>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import { computed } from '@vue/reactivity';

export default {
    name: "UnorderedListNode",
    props: {
        node: Object,
    },
    setup(props) {
        const listItems = computed(() => {
            return props.node.children.filter(o => o instanceof ShortcodeNode);
        });
        return {
            listItems
        };
    },
}

</script>

<style lang="scss">
  
</style>