<template>
  <template v-if="nodeType === 'TextNode'">
    <span v-html="textNodeContent"></span>
  </template>

  <template v-if="nodeType === 'ShortCodeNode'">
    
    <template v-if="tag === 'img'">
      <ImageNode :url="node.text"/>
    </template>

    <template v-else-if="tag === 'b'">
      <BoldNode :node="node"/>
    </template>

    <template v-else-if="tag === 'i'">
      <ItalicNode :node="node"/>
    </template>

    <template v-else-if="tag === 'h1'">
      <H1Node :node="node"/>
    </template>

    <template v-else-if="tag === 'h2'">
      <H2Node :node="node"/>
    </template>

    <template v-else-if="tag === 'url'">
      <UrlNode :node="node"/>
    </template>

    <template v-else-if="tag === 'ul'">
      <UnorderedListNode :node="node"/>
    </template>

    <template v-else-if="tag === 'li'">
      <ListItemNode :node="node"/>
    </template>

    <template v-else-if="tag === 'quote'">
      <QuoteNode :node="node"/>
    </template>

     <template v-else-if="tag === 'blockquote'">
      <BlockquoteNode :node="node"/>
    </template>

    <template v-else-if="tag === 'video'">
      <VideoNode :url="node.shortcode.content"/>
    </template>

    <template v-else-if="tag === 'youtube'">
      <YouTubeNode :url="node.shortcode.content"/>
    </template>

    <template v-else-if="tag === 'twitter'">
      <TwitterNode :url="node.shortcode.content"/>
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
import ItalicNode from './Schemas/i.vue';
import UnorderedListNode from './Schemas/ul.vue';
import ListItemNode from './Schemas/li.vue';
import UrlNode from './Schemas/url.vue';
import H1Node from './Schemas/h1.vue';
import H2Node from './Schemas/h2.vue';
import BlockquoteNode from './Schemas/blockquote.vue';
import QuoteNode from './Schemas/quote.vue';
import VideoNode from './Schemas/video.vue';
import YouTubeNode from './Schemas/youtube.vue';
import TwitterNode from './Schemas/twitter.vue';


export default {
  name: "Schema",
  components: {
    ImageNode,
    BoldNode,
    ItalicNode,
    UnorderedListNode,
    ListItemNode,
    UrlNode,
    H1Node,
    H2Node,
    QuoteNode,
    VideoNode,
    YouTubeNode,
    TwitterNode,
    BlockquoteNode
  },
  props: {
    node: Object,
    nodes: Array,
    index: Number,
  },
  setup(props) {
    const UNPARSED_TAGS = ['code', 'noparse'];
    const NON_BLOCK_TAGS = ['b', 'i', 'u', 's', 'url', 'spoiler', 'noparse', 'img', 'video'];

    const nodeType = computed(() => {
      if (props.node instanceof TextNode || (props.node instanceof ShortcodeNode && props.node.shortcode === null))
        return "TextNode";
      if (props.node instanceof ShortcodeNode)
        return "ShortCodeNode";
    });

    const shouldCheckNewLine = (node) => {
      return node instanceof ShortcodeNode && !NON_BLOCK_TAGS.includes(node.shortcode.name);
    }

    const checkForNewline = computed(() => {
      console.log(props.index, props.nodes[props.index-1])
      return props.index > 0 && shouldCheckNewLine(props.nodes[props.index-1])
    }); 



    const tag = computed(() => {
      return props.node.shortcode.name;
    }); 

    const textNodeContent = computed(() => {
      const trimNewLine = (checkForNewline.value && props.node.text && props.node.text[0] === '\n')
      if (trimNewLine) return props.node.text.substring(1)
      return props.node.text
    }); 

    onMounted(() => {
      //console.log(props.node);
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