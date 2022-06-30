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
        <div class="h-full flex justify-center items-center imgContainer" ref="imgContainer">
          <img ref="imageElRef" :src="route.query.url" alt="" @load="onImageLoad" @click="onClick">
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router';
import { watch, reactive, ref} from 'vue'
import { useDrag, useGesture, usePinch } from '@vueuse/gesture'
import { useMotionProperties, useSpring, useMotion } from '@vueuse/motion'
import { useDebounceFn,  } from '@vueuse/core'
import { interpolate } from 'popmotion'



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

const mapper = interpolate([0, 500], [1, 2], { clamp: true })

const onGestureChange = (state) => {

  if (state.last) return

  let obj = {
    cursor: 'grabbing'
  }

  if (state.pinching) {
    if (state.offset[0] > 1) {
      zoomed.value = true
      obj.scale = mapper(state.offset[0])
    } else {
      console.log('not zoomed')
      zoomed.value = false
      obj.scale = 1
      gesture.state.pinch.values = [0, 0]
    }
  }

  if (zoomed.value) {
    if (state.pinching) {
      obj.x = (imgContainer.value.clientWidth/2) - state.origin[0]
      obj.y = (imgContainer.value.clientHeight/2) - state.origin[1]
      gesture.state.drag.offset = [obj.x,obj.y]
    } else {
      obj.x = state.offset[0]
      obj.y = state.offset[1]
    }
  } else {
    obj.x = 0
    obj.y = 0
    gesture.state.drag.offset = [0,0]
  }

  // update ui
  set(obj)
}

const gesture = useGesture({
    onDrag: (state) => onGestureChange(state),
    onPinch: (state) => onGestureChange(state),
  },
  {
    drag: {
      rubberband: true,
      bounds: {left: 0, right: 0, top: 0, bottom: 0},
    }, 
    pinch: {
      rubberband: true,
      bounds: {left: 0, right: 0, top: 0, bottom: 0},
    },  
    
    domTarget: imgContainer,
  },
)


/*const drag = useGesture(
  ({ xy: [mx,my], offset: [ox, oy], dragging }) => {
    // Only allow panning if zoomed
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
)*/

const onImageLoad = (e) => {
  const height = imageElRef.value.clientHeight
  const width = imageElRef.value.clientWidth


  let topBound = (height/2)
  let leftBound = width/2

  console.log(gesture)

  gesture.config.drag.bounds = [
    [-leftBound, leftBound],
    [-topBound, topBound]
  ]

  gesture.config.pinch.bounds = [
    [-leftBound, leftBound],
    [-topBound, topBound]
  ]
}

const debouncedFn = useDebounceFn(() => {
  clickCount.value = 0
}, 800)

const onClick = (e) => {
  clickCount.value++
  if (clickCount.value === 2) {
    clickCount.value = 0
    zoomed.value = !zoomed.value

    if (!zoomed.value) {
      gesture.state.drag.offset = [0,0]
      set({
        cursor: 'grabbing',
        x: 0,
        y: 0,
        scale: 1
      })
    } else {
      let newOffsetX = (imgContainer.value.clientWidth/2) - e.layerX
      let newOffsetY = (imgContainer.value.clientHeight/2) - e.layerY
      gesture.state.drag.offset = [newOffsetX,newOffsetY]

      set({
        cursor: 'grabbing',
        x: newOffsetX,
        y: newOffsetY,
        scale: 2
      })
    }
  }

  debouncedFn()
}


// Pinch
/*const springValues = reactive({
  zoom: 0,
  x: 0,
  y: 0
})
const { set: pset, values } = useSpring(springValues)
const mapper = interpolate([0, 500], [1, 2], { clamp: true })

const pinch = usePinch(
  ({ offset: [d, a], origin, pinching }) => {
    console.log(origin)
    if (d >= 0) pset({
      zoom: d,
      x: origin[0],
      y: origin[1],
    })
  },
  {
    domTarget: imgContainer,
    eventOptions: {
      passive: true,
    },
  },
)

watch(
  springValues,
  (newVal) => {
    Object.assign(motionProperties, {
      x: newVal.x,
      y: newVal.y,
      scale: mapper(newVal.zoom),
    })

    if (pinch.state.pinch.offset[0] <= 0) {
      console.log('reset pinch')
      pinch.state.pinch.offset = [0, 0]
      zoomed.value = false
    } else {
      zoomed.value = true
    }
    console.log(mapper(newVal.zoom), pinch.state.pinch.offset)
  },
  {
    deep: true,
  },
)
*/

</script>


<style lang="scss">
  .imgContainer {
    img {
      max-height: calc(100vh - 56px);
    }
  }
</style>
