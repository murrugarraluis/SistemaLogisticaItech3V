import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$URL_SERVE = 'http://127.0.0.1:8000/api'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
