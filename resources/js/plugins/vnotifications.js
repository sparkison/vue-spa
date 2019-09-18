import Vue from 'vue'
import Notifications from 'vue-notification'

Vue.use(Notifications)

/*
 * Setup toast notification prototype helper
 * call via this.$toastr.error(message)
 *
 * info: https://github.com/euvl/vue-notification
 */
Vue.prototype.$toastr = {
  error: (message) => {
    Vue.notify({
      group: 'alerts',
      type: 'error',
      title: 'Error',
      text: message,
      duration: -1
    })
  },

  success: (message) => {
    Vue.notify({
      group: 'alerts',
      type: 'success',
      title: 'Success',
      text: message,
      duration: -1
    })
  }
}