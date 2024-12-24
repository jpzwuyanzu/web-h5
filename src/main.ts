import { createApp } from 'vue'
import '@/style.css'
import App from './App.vue'
import 'lib-flexible'
import pinia from '@/store/index'
import router from '@/router/index'
import i18n from "@/lang"

const app = createApp(App);
app.use(pinia).use(router).use(i18n).mount("#app")
