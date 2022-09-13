<template>
  <div
    class="px-4 py-4 flex ion-activatable ripple-parent"
    :class="{
      'opacity-50 pointer-events-none': disabled
    }"
  >
    <div v-if="$slots['icon']" class="mr-4"><slot name="icon"></slot></div>
    <div class="text-sm"><slot></slot></div>
    <ion-ripple-effect></ion-ripple-effect>
  </div>
</template>

<script setup>
defineProps({
  disabled: Boolean
})
</script>

<style lang="scss" scoped>

</style>