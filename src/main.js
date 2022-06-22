import { IonicVue } from '@ionic/vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import routes from "virtual:generated-pages";
import App from './App.vue';


const router = createRouter({
  history: createWebHistory(),
  routes,
});



const app = createApp(App)

app.use(IonicVue)
app.use(router);

router.isReady().then(() => {
  app.mount('#app');
});