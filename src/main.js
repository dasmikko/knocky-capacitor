import { IonicVue } from '@ionic/vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import routes from "virtual:generated-pages";
import App from './App.vue';
import { GesturePlugin } from '@vueuse/gesture'
import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia'
import 'photoswipe/style.css';

import './assets/tailwind.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Ionic components */
import {
  IonMenu,
  IonMenuButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonButton,
  IonRefresher,
  IonRefresherContent,
  IonProgressBar,
  IonSlides,
  IonSlide,
  IonList,
  IonItem,
  IonLabel,
  IonRippleEffect,
  IonIcon,
} from '@ionic/vue';

import Schema from './components/bbcode/schema.vue'


import './assets/themes/dark.scss'


const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia()

const app = createApp(App)

app.use(IonicVue)
app.use(router);
app.use(GesturePlugin)
app.use(MotionPlugin)
app.use(pinia)

app.component('IonMenu', IonMenu)
app.component('IonMenuButton', IonMenuButton)
app.component('IonPage', IonPage)
app.component('IonHeader', IonHeader)
app.component('IonToolbar', IonToolbar)
app.component('IonButtons', IonButtons)
app.component('IonBackButton', IonBackButton)
app.component('IonTitle', IonTitle)
app.component('IonContent', IonContent)
app.component('IonButton', IonButton)
app.component('IonRefresher', IonRefresher)
app.component('IonRefresherContent', IonRefresherContent)
app.component('IonProgressBar', IonProgressBar)
app.component('IonSlides', IonSlides)
app.component('IonSlide', IonSlide)
app.component('IonList', IonList)
app.component('IonItem', IonItem)
app.component('IonLabel', IonLabel)
app.component('IonRippleEffect', IonRippleEffect)
app.component('IonIcon', IonIcon)



app.component('Schema', Schema)


router.isReady().then(() => {
  app.mount('#app');
});