<template>
  <div>
    <card :title="title" :action="false">
      <p class="lead">
        User Listing
      </p>
    </card>
  </div>
</template>

<script type="text/babel">

export default {
  name: 'UserListing',

  computed: {
    title: function () {
      return this.$t('User Listing')
    }
  },

  metaInfo () {
    return { title: this.$t('User Listing') }
  }
}
</script>
