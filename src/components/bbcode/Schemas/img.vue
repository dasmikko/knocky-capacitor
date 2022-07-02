<template>
  <a 
    class="image"
    :href="url" 
    :data-pswp-width="imageSize.width"
    :data-pswp-height="imageSize.height" >
    <img
      :src="url" 
      ref="img"
      @load="onImageLoad"
      alt=""/>
  </a>
</template>

<script>
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';


export default {
  name: 'ImageNode',
  props: {
    url: String,
  },
  setup(props) {
    const router = useRouter()
    const img = ref()
    const imageSize = reactive({
      width: 0,
      height: 0
    })

    const onImageLoad = (ev) => {
      imageSize.width = img.value.naturalWidth
      imageSize.height = img.value.naturalHeight
    }

    return {
      router,
      img,
      imageSize,
      onImageLoad
    }
  }
}

</script>

<style lang="scss" scoped>
  img {
    @apply inline-block mb-2;
  }
</style>