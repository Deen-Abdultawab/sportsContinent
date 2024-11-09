import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'
import './assets/global.css'
import './assets/main.css'
import 'animate.css';

const app = createApp(App)

app.use(Toast, { position: POSITION.TOP_RIGHT })
app.use(createPinia())
app.use(router)

app.mount('#app')
document.title = 'Sports Continent'
