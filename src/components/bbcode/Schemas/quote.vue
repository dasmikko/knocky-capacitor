<template>
  <div 
    class="bg-knockoutGray-700 relative border border-neutral-900 rounded overflow-hidden"
  > 
    <header class="bg-knockoutGray-800 p-2">{{node.shortcode.properties.username}} posted:</header>
    <div class="content p-2"
      :class="{
        'expanded': expanded
      }"
    >
      <Schema
        v-if="node.children.length"
        v-for="(cnode, index) in node.children"
        :index="index"
        :nodes="node.children"
        :node="cnode"
      />
      <span v-else>{{node.text}}</span>
    </div>
    <div class="expander" @click="expanded = !expanded">
      <div class="bg-knockoutGray-700 w-full flex justify-center items-center absolute bottom-0 p-1">
        <chevron-down-icon v-if="!expanded"/>
        <chevron-up-icon v-else/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ShortcodeTree, ShortcodeNode, TextNode } from 'shortcode-tree';
import ChevronUpIcon from 'vue-material-design-icons/ChevronUp.vue'
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import { computed } from '@vue/reactivity';

const props = defineProps({
  node: Object
})

const expanded = ref(false)


</script>

<style lang="scss" scoped>
  .content {
    @apply transition-all;
    max-height: 200px;
    &.expanded {
      @apply mb-8;
      max-height: unset;
    }
  }

  .expander {
    @apply h-full w-full top-0 absolute;
    min-height: 200px;
  }
</style>