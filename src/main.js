import Vue from 'vue'
import vuetify from './plugins/vuetify'
import './plugins/base'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false

Vue.use(VueCookies)
Vue.$cookies.config("1d");

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
