<template>
  <div class="bbcode-content" :id="'post-' + postId">
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
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { computed } from 'vue';

export default {
  name: "BBCodeRenderer",
  props: {
    postId: Number,
    bbcode: String,
  },
  setup(props) {
    const lightbox = ref(null)

    const nodeTree = computed(() => {
        return ShortcodeTree.parse(props.bbcode);
    });

    onMounted(() => {
      console.log(lightbox.value)
      if (lightbox.value === null) {
        console.log('init lightbox', '#post-' + props.postId)
        lightbox.value = new PhotoSwipeLightbox({
          gallery: '#post-' + props.postId,
          children: 'a.image',

          pswpModule: () => import('photoswipe'),
        });
        lightbox.value.init();
      }
    })

    return {
        nodeTree
    };
  },
  
}

</script>

<style lang="scss">
  .bbcode-content {
    @apply text-sm select-text;
    line-height: 130%;

    span {
      @apply whitespace-pre-wrap;
      overflow-wrap: break-word;
    }
  }

  .pswp__button--arrow {
    display: none;
  }
</style>