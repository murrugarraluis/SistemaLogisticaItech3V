import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'sweetalert2/dist/sweetalert2.css'

Vue.config.productionTip = false
Vue.prototype.$URL_SERVE = 'http://127.0.0.1:8000/api'

Vue.use(VueSweetalert2)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
