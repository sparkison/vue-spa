import Vue from 'vue'
import VModal from 'vue-js-modal'

// https://github.com/euvl/vue-js-modal
Vue.use(VModal, { dynamic: true, componentName: 'modal' })

// Setup global config
Vue.prototype.$modalConfig = {
  height: 'auto',
  adaptive: true,
  draggable: false, // getting some funky results (sticking off-screen, etc.) disabling for now...
  resizable: true,
  scrollable: true,
  width: 800, // make the modal a bit wider
}