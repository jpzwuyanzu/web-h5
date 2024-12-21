import { createApp } from 'vue'
import '@/style.css'
import App from './App.vue'
import 'lib-flexible'
import pinia from '@/store/index'
import router from '@/router/index'
import { Locale } from 'vant';
import zhCN from 'vant/es/locale/lang/zh-CN';
import enUS from 'vant/es/locale/lang/en-US';
Locale.use('zh-CN', zhCN);
Locale.use('en-US', enUS);
// Import default CSS

const app = createApp(App);
app.use(pinia).use(router).mount("#app")
