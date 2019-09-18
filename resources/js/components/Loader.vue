<template>
  <transition name="fade">
    <span v-if="loading" class="pageloader">
      <span class="loader">
        <span class="sr-only">Loading...</span>
      </span>
    </span>
  </transition>
</template>

<script type="text/babel">
import {mapGetters} from 'vuex'

export default {
  name: 'Loader',

  computed: {
    ...mapGetters({ loading: 'global/loading' })
  },
}
</script>