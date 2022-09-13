<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="west"
          aria-label="Menu"
          @click="onClickBack"
        />

        <q-toolbar-title>
          Knocky
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
        <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()

const onClickBack = () => {
  router.back()
}
</script>
