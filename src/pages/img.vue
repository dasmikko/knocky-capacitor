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
      <ion-slides pager="true" :options="slideOpts">
        <ion-slide>
          <div class="main-container h-full">
              <QuickPinchZoom :url="route.query.url"/>
          </div>
        </ion-slide>
        <ion-slide>
          <h1>Slide 2</h1>
        </ion-slide>
        <ion-slide>
          <h1>Slide 3</h1>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>


<script>
import { useRoute, useRouter } from 'vue-router';
import { watch, reactive, ref, onMounted} from 'vue'
import {applyReactInVue} from 'veaury'
import RQuickPinchZoom from "../react_app/QuickPinchZoom";

export default {
  name: 'ImageViewer',
  components: {
    QuickPinchZoom: applyReactInVue(RQuickPinchZoom)
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const imgRef = ref(null)
    const imgContainerRef = ref(null)

    return {
      imgRef,
      router,
      route,
      imgContainerRef
    }

  }
}
</script>


<style lang="scss">
  .main-container {
    .full-height {
      
    }
  }
</style>
