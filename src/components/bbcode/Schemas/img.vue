<template>
  <div class="image-container">
    <img :src="url" alt=""/>
  </div>
  
</template>

<script>
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import { computed } from '@vue/reactivity';

export default {
  name: 'ImageNode',
  props: {
    url: String,
  },
  setup(props) {
  }
}

</script>

<style lang="scss" scoped>
  .image-container {
    @apply relative overflow-hidden inline-block;

    img {
      @apply inline-block mb-2;
    }
  }
</style>