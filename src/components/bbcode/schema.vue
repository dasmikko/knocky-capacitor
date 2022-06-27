<template>
  <template v-if="nodeType === 'TextNode'">
    <span v-html="textNodeContent"></span>
  </template>

  <template v-if="nodeType === 'ShortCodeNode'">
    
    <template v-if="tag === 'img'">
      <ImageNode :url="node.text"/>
    </template>

    <template v-else-if="tag === 'b'">
      <BoldNode :text="node.text"/>
    </template>

    <template v-else-if="tag === 'ul'">
      <UnorderedListNode :node="node"/>
    </template>

     <template v-else-if="tag === 'li'">
      <ListItemNode :node="node"/>
    </template>

    <template v-else>
      {{node.shortcode.name}}
    </template>

  </template>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import { computed } from '@vue/reactivity';
import ImageNode from './Schemas/img.vue';
import BoldNode from './Schemas/b.vue';
import UnorderedListNode from './Schemas/ul.vue';
import ListItemNode from './Schemas/li.vue';



export default {
  name: "Schema",
  components: { 
    ImageNode,
    BoldNode,
    UnorderedListNode,
    ListItemNode
  },
  props: {
      node: Object,
  },
  setup(props) {
    const nodeType = computed(() => {
      if (props.node instanceof TextNode)
        return "TextNode";
      if (props.node instanceof ShortcodeNode)
        return "ShortCodeNode";
    });

    const tag = computed(() => {
      return props.node.shortcode.name;
    }); 

    const textNodeContent = computed(() => {
      const trimNewLine = props.node.text && props.node.text[0] === '\n';
      if (trimNewLine) return props.node.text.substring(1)
      return props.node.text
    }); 

    onMounted(() => {
      console.log(props.node);
    });

    return {
      nodeType,
      tag,
      textNodeContent
    };
  },
}

</script>

<style lang="scss">
  
</style>