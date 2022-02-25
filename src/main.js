import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from '@/http'


const app = createApp(App)

//Create Global Object http 
app.config.globalProperties.$http = http

//* Create App */
app.use(store)
   .use(router)
   .mount('#app')







