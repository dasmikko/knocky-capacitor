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
      <div class="main-container h-full" ref="imgContainerRef">
          <QuickPinchZoom :url="route.query.url"/>
      </div>
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
