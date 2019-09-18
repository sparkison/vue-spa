import Vue from 'vue'
import moment from 'moment'

// Attach to the window for global access
window.moment = moment

// Set custom formatting strings
// info: https://momentjs.com/docs
const DateTimeFormat = 'LLLL'
const DateFormat = 'LL'

Vue.prototype.$dateTimeString = DateTimeFormat // locale aware string
Vue.prototype.$dateString = DateFormat // locale aware string

// Define Moment locales
window.moment.defineLocale('en-short', {
  parentLocale: 'en',
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1s',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1 month ago',
    MM: '%d months ago',
    y: '1y',
    yy: '%dy'
  }
})

// Set default locale
window.moment.locale('en')

Vue.prototype.$formatDateTime = (date) => {
  return moment.utc(date).local().format(DateTimeFormat)
}
Vue.prototype.$formatDate = (date) => {
  return moment.utc(date).local().format(DateFormat)
}

export default moment
