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
          <img class="target" ref="imageElRef" :src="route.query.url" alt="">

        </div>
      </div>
      <Moveable
        className="moveable"
        v-bind:target="['.target']"
        v-bind:draggable="true"
        v-bind:pinchable="true"
        @drag="onDrag"
        @scale="onScale"
        @pinch="onPinch"
      />
    </ion-content>
  </ion-page>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router';
import { watch, reactive, ref} from 'vue'
import Moveable from "vue3-moveable";


// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

const router = useRouter();
const route = useRoute();

const onDrag = ({ transform, target }) => {
  target.style.transform = transform;
}

const onScale = ({ drag, target }) => {
  target.style.transform = drag.transform;
}

const onPinch = ({ transform, target }) => {
  console.log('pinch')
  target.style.transform = transform;
}
</script>


<style lang="scss">
  .imgContainer {
    img {
      max-height: calc(100vh - 56px);
    }
  }
</style>
