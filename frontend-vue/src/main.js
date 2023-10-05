import { createApp } from 'vue'
import App from './App.vue'
import { fetch } from './plugins/fetch'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App)
    .provide('$fetch', fetch)
    .use(store)
    .mount('#app')
