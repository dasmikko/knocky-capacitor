<template>
  <div ref="target" class="bbcode-content" :id="'post-' + postId">
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

<script setup>
import {onMounted, onUnmounted, ref, watch, defineProps} from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { computed } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';



const props = defineProps({
  postId: Number,
  bbcode: String,
})

const lightbox = ref(null)
const lightBoxOpen = ref(false)

const nodeTree = computed(() => {
    return ShortcodeTree.parse(props.bbcode);
});

const target = ref(null)
const targetIsVisible = ref(false)

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting
  },
) 

onUnmounted(() => {
  if (lightbox.value !== null) {
    lightbox.value.destroy();
    lightbox.value = null
  }
})

watch(
  targetIsVisible,
  (newIsVisible) => {
    if (newIsVisible) {
      if (lightbox.value === null) {
        lightbox.value = new PhotoSwipeLightbox({
          gallery: '#post-' + props.postId,
          children: 'a.image',
          pswpModule: () => import('photoswipe'),
        });

        lightbox.value.on('beforeOpen', () => {
          lightBoxOpen.value = true
          // photoswipe starts to open
        })

        lightbox.value.on('close', () => {
          lightBoxOpen.value = false
          // photoswipe starts to open
        })
        lightbox.value.init();
      }
    } else {
      if (lightbox.value !== null) {
        lightbox.value.destroy();
        lightbox.value = null
      }
    }
  }
)

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