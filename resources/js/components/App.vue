<template>
  <div id="app">
    <!-- floating nav toggle -->
    <nav-toggle />

    <!-- notifications -->
    <notifications group="alerts" />

    <!-- page loader -->
    <loader />

    <!-- load indicator -->
    <loading ref="loading" />

    <transition name="page" mode="out-in">
      <component :is="layout" v-if="layout" />
    </transition>
  </div>
</template>

<script>
import Loading from './Loading'
import NavToggle from './NavToggle'

// Load layout components dynamically.
const requireContext = require.context('~/layouts', false, /.*\.vue$/)

const layouts = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
  )
  .reduce((components, [name, component]) => {
    components[name] = component.default || component
    return components
  }, {})

export default {
  el: '#app',

  name: 'TmiApp',

  components: {
    NavToggle,
    Loading
  },

  data: () => ({
    layout: null,
    defaultLayout: 'default'
  }),

  metaInfo () {
    const { appName } = window.config

    return {
      title: appName,
      titleTemplate: `%s · ${appName}`
    }
  },

  created () {
    // Make sure we don't have any hung loaders
    this.$store.dispatch('global/disablePageLoader')

    // Set the user
    this.$store.dispatch('user/setUser', { user: window.user || null })
  },

  mounted () {
    // Set load indicator
    this.$loading = this.$refs.loading

    // Check online status
    if (navigator.onLine) {
      this.$store.dispatch('global/goOnline')
    } else {
      this.$store.dispatch('global/goOffline')
    }
  },

  methods: {
    /**
     * Set the application layout.
     *
     * @param {String} layout
     */
    setLayout (layout) {
      if (!layout || !layouts[layout]) {
        layout = this.defaultLayout
      }

      this.layout = layouts[layout]
    }
  }
}
</script>
