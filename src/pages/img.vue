<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Image</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="h-full flex justify-center items-center overflow-hidden" ref="imgContainerRef">
          <img
            class="relative"
            ref="imgRef"
            :src="route.query.url" alt=""
            :style="{
              left: `${imgStyle.x}px`,
              top: `${imgStyle.y}px`,
              transform: `scale(${imgStyle.scale})`,
            }"
          >
        </div>
    </ion-content>
  </ion-page>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router';
import { watch, reactive, ref} from 'vue'
import { useGesture } from '@vueuse/gesture'


// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

const router = useRouter();
const route = useRoute();
const imgRef = ref(null)
const imgContainerRef = ref(null)

const imgStyle = reactive({
  x: 0,
  y: 0,
  scale: 2
})

const maybeAdjustImage = () => {
  let newCrop = imgStyle;
  let imageBounds = imgRef.value.getBoundingClientRect();
  let containerBounds = imgContainerRef.value.getBoundingClientRect();
  console.log(containerBounds)
  let originalWidth = imgRef.value.clientWidth;
  let widthOverhang = (imageBounds.width - originalWidth) / 2;
  let originalHeight = imgRef.value.height;
  let heightOverhang = (imageBounds.height - originalHeight) / 2;

  if (imageBounds.left > containerBounds.left) {
    newCrop.x = widthOverhang / imgStyle.scale;
  } else if (imageBounds.right < containerBounds.right) {
    newCrop.x = -(imageBounds.width - containerBounds.width) + widthOverhang;
  }

  imgStyle.x = newCrop.x
  imgStyle.y = newCrop.y
}

useGesture(
  {
    onDrag: (state) => {
      let imageBounds = imgRef.value.getBoundingClientRect();
      let containerBounds = imgContainerRef.value.getBoundingClientRect();

      console.log(Math.ceil(imageBounds.top), containerBounds.top)
      console.log(state.movement[1], state.direction[0])

      if (Math.ceil(imageBounds.top) > containerBounds.top && state.direction[1] < 0) {
        imgStyle.y = state.movement[1]
      }

      if (Math.ceil(imageBounds.bottom) < containerBounds.bottom && state.direction[1] > 0) {
        imgStyle.y = state.movement[1]
      }

      if (Math.ceil(imageBounds.left) < containerBounds.left && state.direction[0] > 0) {
        imgStyle.x = state.movement[0]
      }
      if (Math.ceil(imageBounds.right) > containerBounds.right && state.direction[0] < 0) {
        imgStyle.x = state.movement[0]
      }



    },
    onPinch: (state) => {
      imgStyle.scale = 1 + state.offset[0] / 70
    },
  },
  {
    drag: {
      initial: () => [imgStyle.x, imgStyle.y]
    },
    pinch: {
      distanceBounds: { min: 0 },
    },
    domTarget: imgRef,
    eventOptions: {
      passive: false
    }
  }
)


</script>


<style lang="scss">
  .imgContainer {
    img {
      max-height: calc(100vh - 56px);
    }
  }
</style>
