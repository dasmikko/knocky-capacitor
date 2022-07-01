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

useGesture(
  {
    onDrag: (state) => {
      let imageBounds = imgRef.value.getBoundingClientRect();
      let containerBounds = imgContainerRef.value.getBoundingClientRect();

      const imageBoundsTop = Math.ceil(imageBounds.top)
      const imageBoundsBottom = Math.ceil(imageBounds.bottom)
      const imageBoundsLeft = Math.ceil(imageBounds.left)
      const imageBoundsRight = Math.ceil(imageBounds.right)

      let newXLeft = imageBoundsLeft + state.movement[0]
      let newXRight = imageBoundsRight - state.movement[0]

      
      console.log(imageBoundsLeft)
      console.log(newXLeft)
      console.log(state.movement[0])


      if (Math.ceil(imageBounds.top) > containerBounds.top && state.direction[1] < 0) {
        imgStyle.y = state.movement[1]
      }

      if (Math.ceil(imageBounds.bottom) < containerBounds.bottom && state.direction[1] > 0) {
        imgStyle.y = state.movement[1]
      }


      if (imageBoundsLeft < containerBounds.left || newXLeft < containerBounds.left) {
        imgStyle.x = state.movement[0]
        
      } else {
        state.offset = [0,0]  
      }




    },
    onPinch: (state) => {
      imgStyle.scale = 1 + state.offset[0] / 70
    },
  },
  {
    drag: {
      initial: () =>{
        console.log('initial')
        return [imgStyle.x, imgStyle.y]
      } 
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
