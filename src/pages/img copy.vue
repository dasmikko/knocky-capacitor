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

      imgStyle.x = state.movement[0]
      imgStyle.y = state.movement[1]

      
      console.log('X', imgStyle.x)
      console.log('Y', imgStyle.y)
      
      
 
    },
    onPinch: ({
        memo,
        origin: [pinchOriginX, pinchOriginY],
        offset: [d],
      }) => {
        memo ??= {
          bounds: imgRef.value.getBoundingClientRect(),
          imgStyle,
        };

        let transformOriginX = memo.bounds.x + memo.bounds.width / 2;
        let transformOriginY = memo.bounds.y + memo.bounds.height / 2;

        let displacementX = (transformOriginX - pinchOriginX) / memo.imgStyle.scale;
        let displacementY = (transformOriginY - pinchOriginY) / memo.imgStyle.scale;

        let initialOffsetDistance = (memo.imgStyle.scale - 1) * 50;
        let movementDistance = d - initialOffsetDistance;

          imgStyle.scale =  1 + d / 50
          imgStyle.x = memo.imgStyle.x + (displacementX * movementDistance) / 50
          imgStyle.y = memo.imgStyle.y + (displacementY * movementDistance) / 50
        

        return memo;
      },
  },
  {
    drag: {
      initial: () =>{
        return [imgStyle.x, imgStyle.y]
      },
      bounds: () => {
        let imageBounds = imgRef.value.getBoundingClientRect();
        let containerBounds = imgContainerRef.value.getBoundingClientRect();

        let originalWidth = imgRef.value.clientWidth;
        let widthOverhang = (imageBounds.width - originalWidth) / 2;
        
        let originalHeight = imgRef.value.clientHeight;
        let heightOverhang = -(imageBounds.height - originalHeight) / 2;


        console.log(heightOverhang)

        return {
          left: -widthOverhang,
          right: widthOverhang,
          top: heightOverhang,
          bottom: Infinity
        }
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
