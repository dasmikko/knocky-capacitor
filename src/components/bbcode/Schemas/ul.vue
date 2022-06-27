<template>
  <ul class="list-disc list-inside">
    <Schema
      v-for="(cnode, index) in listItems"
      :index="index"
      :node="cnode"
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