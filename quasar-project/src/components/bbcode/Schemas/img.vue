<template>
  <a
    ref="target"
    class="image"
    :href="url"
    :data-pswp-width="imageSize.width"
    :data-pswp-height="imageSize.height">
    <img
      v-lazy="url"
      ref="img"
      @load="onImageLoad"
      alt=""/>
  </a>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import {useIntersectionObserver} from '@vueuse/core'

const props = defineProps({
  url: String,
})

const target = ref(false)
const tweetRef = ref(null)
const targetIsVisible = ref(false)


const router = useRouter()
const img = ref()
const imageSize = reactive({
  width: 0,
  height: 0
})

const onImageLoad = (ev) => {
  console.log('imageLoad')
  imageSize.width = img.value.naturalWidth
  imageSize.height = img.value.naturalHeight
}

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting
  },
)


</script>

<style lang="scss" scoped>
  .image {
    @apply inline-block;
  }
  img {
    @apply inline-block mb-2;
  }
</style>