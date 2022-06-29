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
      <div class="h-full overflow-hidden">
        <div class="h-full flex justify-center items-center imgContainer" ref="imgContainer"  @click="onClick">
          <img ref="imageElRef" :src="route.query.url" alt="" @load="onImageLoad">
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router';
import {onMounted, ref} from 'vue'
import { useDrag, rubberbandIfOutOfBounds } from '@vueuse/gesture'
import { useMotionProperties, useSpring, useMotion } from '@vueuse/motion'
import { useDebounceFn } from '@vueuse/core'


// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

const router = useRouter();
const route = useRoute();
const imageElRef = ref()
const imgContainer = ref()

const zoomed = ref(false)
const clickCount = ref(0)

const { motionProperties } = useMotionProperties(imgContainer, {
  cursor: 'grab',
  x: 0,
  y: 0,
  scale: 1
})
const { set } = useSpring(motionProperties, {
  damping: 100,
  stiffness: 2000,
})


const drag = useDrag(
  ({ xy: [mx,my], offset: [ox, oy], dragging }) => {
    if (zoomed.value) {
      set({
        cursor: 'grabbing',
        x: ox,
        y: oy,
      })
    }
  },
  {
    rubberband: true,
    bounds: {left: 0, right: 0, top: 0, bottom: 0},
    domTarget: imgContainer,
  },
)

const onImageLoad = (e) => {
  const height = imgContainer.value.clientHeight
  const width = imgContainer.value.clientWidth


  let topBound = (height/2) - 56
  let leftBound = width/2

  drag.config.drag.bounds = [
    [-leftBound, leftBound],
    [-topBound, topBound]
  ]
}

const debouncedFn = useDebounceFn(() => {
  clickCount.value = 0
}, 900)

const onClick = (e) => {
  clickCount.value++
  if (clickCount.value === 2) {
    clickCount.value = 0
    zoomed.value = !zoomed.value

    if (!zoomed.value) {
      set({
        cursor: 'grabbing',
        x: 0,
        y: 0,
        scale: 1
      })
    } else {
      drag.state.drag.offset = [0,0]
      set({
        cursor: 'grabbing',
        x: 0,
        y: 0,
        scale: 2
      })
    }
  }

  debouncedFn()
}
</script>


<style lang="scss">
  .imgContainer {
    transform: scale(1);
  }
</style>
