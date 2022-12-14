import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'
import "@/utils/extendsFunction.js";
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/index.scss"

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
