<template>
  <div class="image-container">
    <img :src="url" alt="" @click="onImageClick"/>
  </div>
  
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'ImageNode',
  props: {
    url: String,
  },
  setup(props) {
    const router = useRouter()

    const onImageClick = () => {
      router.push(`/img?url=`+props.url)
    }

    return {
      router,
      onImageClick
    }
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