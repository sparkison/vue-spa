import Vue from 'vue'
import Card from './Card'
import Child from './Child'
import Loader from './Loader'
import InlineLoader from './InlineLoader'
import Datepicker from './Datepicker'
import {HasError, AlertError, AlertSuccess} from 'vform'

// Components that are registered globally.
[
  Card,
  Child,
  Loader,
  HasError,
  AlertError,
  Datepicker,
  AlertSuccess,
  InlineLoader
].forEach(Component => {
  Vue.component(Component.name, Component)
})
