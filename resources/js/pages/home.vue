<template>
  <div>
    <b-jumbotron :header="header" :lead="lead">
      <p>
        Ready to go with Bootstrap 4, BootstrapVue, Vue-i18n and more!
      </p>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  layout: 'default',

  name: 'Home',

  metaInfo () {
    return { title: this.$t('Home') }
  },

  data: () => ({
    header: 'Vue SPA',
    lead: 'Vue SPA with workbox plugin for service worker generation',
    title: window.config.appName
  })
}
</script>
