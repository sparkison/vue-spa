import Vue from 'vue'
import {
  ContentLoader,
  FacebookLoader,
  CodeLoader,
  BulletListLoader,
  InstagramLoader,
  ListLoader
} from 'vue-content-loader'
import ContentPlaceholder from '../components/ContentPlaceholder' // helper component

// info: https://github.com/egoist/vue-content-loader
// Uses SVG placeholders, generate placeholder markups here: https://create-vue-content-loader.netlify.com/
Vue.component('v-content-loader', ContentLoader)
Vue.component('fb-content-loader', FacebookLoader)
Vue.component('code-content-loader', CodeLoader)
Vue.component('bullets-content-loader', BulletListLoader)
Vue.component('ig-content-loader', InstagramLoader)
Vue.component('list-content-loader', ListLoader)

// Helper component to build out our content loader placeholders
Vue.component('content-placeholder', ContentPlaceholder)
