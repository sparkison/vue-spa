<template>
  <div>
    <card :title="title" :action="false">
      <p class="lead">
        <template v-if="creating">
          Create User
        </template>
        <template v-else>
          Edit User <pre>{{ $route.params.id }}</pre>
        </template>
      </p>
    </card>
  </div>
</template>

<script type="text/babel">

export default {
  name: 'UserCrud',

  computed: {
    title: function () {
      return (this.creating ? this.$t('Create') : this.$t('Edit')) + ' ' + this.$t('User')
    },
    creating: function () {
      return this.$route.meta.create || true // default to creating if not specified in route meta
    }
  },

  metaInfo () {
    return { title: this.title }
  }
}
</script>
