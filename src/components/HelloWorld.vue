

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup: Knocky
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>

    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <IonButton @click="count++">count is: {{ count }}</IonButton>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { ref, watch } from 'vue'
import { IonButton } from '@ionic/vue'

defineProps({
    msg: String
})

const count = ref(0)

watch(
  count,
  (newVal, oldVal) => {
      console.log(newVal)
  }
)
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
