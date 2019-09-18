import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

// #1 import
import {
  faCog,
  faSignOutAlt,
  faCalendar,
  faUser,
  faHome
} from '@fortawesome/free-solid-svg-icons'

// #2 add to library
fontawesome.library.add(
  faCog,
  faUser,
  faSignOutAlt,
  faCalendar,
  faHome
)

// #3 configure component
Vue.component('fa', FontAwesomeIcon)
