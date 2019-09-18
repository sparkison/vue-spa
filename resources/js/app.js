// Vendor
import Vue from 'vue'
import store from './store'
import router from './router'
import i18n from './plugins/i18n'
import App from './components/App'

// Styles
import '../sass/app.scss'

// Local
import '~/plugins'
import '~/components'

/* Vue config options */
Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  i18n,
  store,
  router,
  ...App
})
