import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import Toast from 'vue-toastification'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import 'vue-toastification/dist/index.css'

// eslint-disable-next-line import/no-extraneous-dependencies
import 'sweetalert2/dist/sweetalert2.css'

Vue.config.productionTip = false

Vue.prototype.$URL_SERVE = 'http://127.0.0.1:8000/api'

const options = {
  confirmButtonColor: '#C62828',
  cancelButtonColor: '#8A8D93',
}
const optionsToast = {
  position: 'bottom-right',
  timeout: 4000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__fade',
  maxToasts: 20,
  newestOnTop: true,
}
Vue.use(Toast, optionsToast)
Vue.use(VueSweetalert2, options)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
