<template>
  <div 
    class="bg-neutral-700 relative border border-neutral-900 mb-4 rounded overflow-hidden"
  > 
    <header class="bg-neutral-800 p-2">{{node.shortcode.properties.username}} posted:</header>
    <div class="content p-2 mb-4"
      :class="{
        'max-h-48': !expanded
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
    <footer class="bg-neutral-700 w-full flex justify-center items-center absolute bottom-0 p-2" @click="expanded = !expanded">
      <chevron-down-icon v-if="!expanded"/>
      <chevron-up-icon v-else/>
    </footer>
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

<style lang="scss">
  
</style>