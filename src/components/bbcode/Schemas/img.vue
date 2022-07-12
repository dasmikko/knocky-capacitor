<template>
  <a 
    class="image"
    :href="url" 
    :data-pswp-width="imageSize.width"
    :data-pswp-height="imageSize.height" >
    <ion-img
      :src="url" 
      ref="img"
      @ionImgDidLoad="onImageLoad"
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
      console.log(ev)
      imageSize.width = ev.target.clientWidth
      imageSize.height = ev.target.clientHeight
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