<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white" style="height: 66px">
    <div class="container-fluid">
      <div class="w-100">
        <ul class="nav d-flex align-items-center justify-content-end w-100">
          <locale />
          <li v-if="user" class="nav-item dropdown ml-auto">
            <a id="dropdownMenuButton" href="#"
               class="d-flex align-items-center text-center nav-link dropdown-toggle" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false"
            >
              <img v-if="user.avatar" :src="user.avatar" alt="avatar"
                   class="dropdown-toggle-image nav-profile-photo mr-1"
              >
              <span class="d-none d-md-block">
                {{ user.name }}
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right shadow"
                 aria-labelledby="dropdownMenuButton"
            >
              <span class="dropdown-menu-arrow right" />
              <a class="dropdown-item" href="#" @click.prevent="() => {}">
                <fa icon="cog" />
                {{ $t('Settings') }}
              </a>
              <div class="dropdown-divider" />
              <a class="dropdown-item" href="#" @click.prevent="() => {}">
                <fa icon="sign-out-alt" />
                {{ $t('Logout') }}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { debounce } from 'underscore'
import Locale from './LocaleDropdown'

export default {
  name: 'PrimaryNavigation',

  components: { Locale },

  data: () => ({
    appName: window.config.appName
  }),

  computed: {
    ...mapGetters({
      user: 'user/user',
      windowWidth: 'global/windowWidth'
    })
  },

  watch: {
    windowWidth: function (newVal, oldVal) {
      if (newVal !== null && newVal !== oldVal) {
        // Auto-collapse/expand admin bar
        if (newVal <= 768) {
          // Collapse for mobile (if not already collapsed)
          if (this.toggled) {
            this.$store.dispatch('nav/toggle')
          }
        } else {
          // Expand for tablet/desktop (if not already expanded)
          if (!this.toggled) {
            this.$store.dispatch('nav/toggle')
          }
        }
      }
    }
  },

  mounted () {
    // On resize, update window size state
    debounce(window.onresize = () => {
      this.$store.dispatch('global/setWindowWidth', window.innerWidth)
    }, 500) // debounce window resize
  },

  methods: {
    changeRole (role) {
      console.warn('[EXAMPLE ONLY] change role to', role)
    }
  }
}
</script>
