<template>
  <ul class="list-disc list-outside pl-4 my-2">
    <Schema
      v-for="(cnode, index) in listItems"
      :index="index"
      :node="cnode"
      :nodes="listItems"
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