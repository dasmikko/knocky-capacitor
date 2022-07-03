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
      <div class="relative" id="imgcontainer">
        <a href="https://cdn.knockout.chat/image/884-c6f6419e-8f3d-484c-bb05-456219e93865.png"
        :data-pswp-width="938"
        :data-pswp-height="616">
        <img 
          
          src="https://cdn.knockout.chat/image/884-c6f6419e-8f3d-484c-bb05-456219e93865.png" 
          alt="">
          </a>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router';
import { watch, reactive, ref, onMounted} from 'vue'
import PhotoSwipeLightbox from 'photoswipe/lightbox';


const router = useRouter();
const route = useRoute();
const lightbox = ref(null)

onMounted(() => {
  if (lightbox.value === null) {
    console.log('init lightbox')
    lightbox.value = new PhotoSwipeLightbox({
      gallery: '#imgcontainer a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.value.init();
  }
})
</script>


<style lang="scss">
</style>
