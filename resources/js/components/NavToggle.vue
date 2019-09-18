<template>
  <div>
    <transition name="slide-left">
      <div id="navigation-toggle" class="shadow-sm">
        <button v-if="showAdminNavToggle"
                id="adminToggle"
                class="hamburger hamburger--primary hamburger--spin text-dark d-inline-block"
                :class="{ 'is-active': toggled }"
                type="button" @click="toggleAdminbar"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner" />
          </span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script type="text/babel">
import { mapGetters } from 'vuex'

export default {
  name: 'NavToggle',

  computed: {
    ...mapGetters({
      user: 'user/user',
      toggled: 'nav/toggled',
      windowWidth: 'global/windowWidth'
    }),
    showAdminNavToggle () {
      return !this.toggled
    }
  },

  methods: {
    toggleAdminbar () {
      this.$store.dispatch('nav/toggle')
    }
  }
}
</script>
