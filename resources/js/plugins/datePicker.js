import Vue from 'vue'

import flatPickr from 'vue-flatpickr-component'

Vue.component('date-time-picker', flatPickr)

// Date formatting (default Laravel format)
Vue.prototype.$defaultDateFormat = 'YYYY-MM-DD'
Vue.prototype.$defaultDateTimeFormat = 'YYYY-MM-DD hh:mm:ss'

// info: https://flatpickr.js.org/options/
Vue.prototype.$dateTimeConfig = {
  wrap: false, // set wrap to true only when using 'input-group'
  altInput: true, // hides your original input and creates a new one with "human readable" format
  dateFormat: 'Z', // format passed to the backend, using ISO for maximum compatibility (https://flatpickr.js.org/formatting/)
  enableTime: true, // show time picker
  disableMobile: true, // prevent default mobile widgets being used
  // altFormat: 'M j, Y', // customize format for the alt input
}
Vue.prototype.$dateConfig = {
  wrap: false, // set wrap to true only when using 'input-group'
  altInput: true, // hides your original input and creates a new one with "human readable" format
  dateFormat: 'Z', // format passed to the backend, using ISO for maximum compatibility (https://flatpickr.js.org/formatting/)
  disableMobile: true, // prevent default mobile widgets being used
  // altFormat: 'M j, Y', // customize format for the alt input
}
