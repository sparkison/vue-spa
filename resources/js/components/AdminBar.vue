<template>
  <div class="sidebar-wrapper">
    <nav id="sidebar" v-outside-click="closeable"
         class="d-flex flex-column justify-content-between"
         :class="{ 'active': !toggled }"
    >
      <div class="nav-wrapper">
        <div
          class="sidebar-header shadow d-flex flex-row align-items-center justify-content-between"
          style="height: 66px"
        >
          <div class="">
            <router-link :to="{ name: 'home' }"
                         class="navbar-brand"
                         @click.native="afterRouteNavigate"
            >
              <fa icon="home" class="mr-2" />
              {{ $t('Home') }}
            </router-link>
          </div>
          <button class="hamburger hamburger--spin hamburger--white d-inline-block"
                  :class="{ 'is-active': toggled }"
                  type="button" @click="toggleAdminbar"
          >
            <span class="hamburger-box">
              <span class="hamburger-inner" />
            </span>
          </button>
        </div>

        <ul class="list-unstyled components">
          <li v-for="(route, index) in routes" :key="index">
            <template v-if="route.hasOwnProperty('subLinks')">
              <a :href="'#adminbar'+index"
                 data-toggle="collapse"
                 :aria-expanded="isActive(route.activeRoute) ? 'true' : 'false'"
                 :class="{ 'collapsed': !isActive(route.activeRoute) }"
                 :aria-controls="'adminbar'+index"
                 class="dropdown-toggle">
                <span v-if="route.icon">
                  <fa :icon="route.icon" class="mr-2 nav-icon" />
                </span>
                {{ $t(route.name) }}
              </a>
              <ul :id="'adminbar'+index" class="collapse list-unstyled"
                  :class="{ 'show': isActive(route.activeRoute) }"
                  data-parent="#sidebar"
              >
                <li v-for="(subRoute, subIndex) in route.subLinks" :key="subIndex">
                  <template v-if="subRoute.name === '__divider__'">
                    <div class="dropdown-divider border-dark m-0" />
                  </template>
                  <template v-else>
                    <router-link :to="{ name: subRoute.route }">
                      <template v-if="typeof subRoute.name === 'object'">
                        <span v-for="(name, idx) in subRoute.name" :key="idx">
                          {{ $t(name) }}&nbsp;
                        </span>
                      </template>
                      <template v-else>
                        {{ $t(subRoute.name) }}
                      </template>
                    </router-link>
                  </template>
                </li>
              </ul>
            </template>
            <template v-else>
              <router-link :to="{ name: route.route }">
                <template v-if="typeof route.name === 'object'">
                  <span v-for="(name, idx) in route.name" :key="idx">
                    <span v-if="route.icon">
                      <fa :icon="route.icon" class="mr-2 nav-icon" />
                    </span>
                    {{ $t(name) }}&nbsp;
                  </span>
                </template>
                <template v-else>
                  <span v-if="route.icon">
                    <fa :icon="route.icon" class="mr-2 nav-icon" />
                  </span>
                  {{ $t(route.name) }}
                </template>
              </router-link>
            </template>
          </li>
        </ul>
        <ul class="list-unstyled action-buttons">
          <li>
            <a class="" href="#" @click.prevent="() => {}">
              Action Button
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script type="text/babel">
import { mapGetters } from 'vuex'

// Info: https://github.com/Grsmto/simplebar
import SimpleBar from 'simplebar'

export default {
  name: 'AdminBar',

  data: () => ({
    appName: window.config.appName,
    active: null,
    subActive: null,
    hover: false,
    links: {
      /* Re-order/add to change menu order and items */
      sample: {}
    },
    closeable: {
      exclude: [
        // classes/IDs to exclude
        '.sidebar-wrapper',
        '#adminToggle'
      ],
      handler: 'outsideClick' // action to call
    }
  }),

  computed: {
    ...mapGetters({
      toggled: 'nav/toggled',
      windowWidth: 'global/windowWidth'
    }),
    routes () {
      let routes = []
      for (let route in this.links) {
        if (this.links.hasOwnProperty(route)) {
          routes.push(this.links[route])
        }
      }
      return routes
    }
  },

  watch: {
    '$route.name': function (newVal, oldVal) {
      if (newVal !== oldVal && newVal !== undefined) {
        let split = newVal.split('.')
        if (split.length >= 2) {
          this.active = split[0]
          this.subActive = split[1]
        }

        // Auto-close on mobile after navigating
        if (this.toggled) {
          // Check width, if on mobile, close the navigation
          if (this.windowWidth <= 768) {
            this.$store.dispatch('nav/toggle')
          }
        }
      }
    },
    'windowWidth': function (newVal, oldVal) {
      if (newVal !== oldVal && newVal !== undefined) {
        if (newVal < 768) {
          this.closeIfOpen()
        } else {
          this.openIfClosed()
        }
      }
    }
  },

  mounted () {
    // Bootstrap the navigation
    this.setup()

    // Add custom scrollbar to admin nav
    new SimpleBar(document.getElementById('sidebar'), {
      scrollbarMinSize: 5
    })
  },

  created () {
  },

  methods: {
    setup () {
      this.sample()
    },

    sample () {
      // Setup user links
      this.links.sample = {
        name: 'Users',
        route: null,
        icon: 'user',
        activeRoute: 'user',
        subLinks: [
          {
            name: ['View', 'All'],
            route: 'user.listing',
            icon: null
          },
          {
            name: ['Create', 'User'],
            route: 'user.create',
            icon: null
          }
        ]
      }
    },

    /* Helper classes */
    afterRouteNavigate () {
      if (window.innerWidth < 768) {
        this.$nextTick(() => {
          this.closeIfOpen()
        })
      }
    },

    closeIfOpen () {
      if (!$('#sidebar').hasClass('active')) {
        $('#sidebar, #content, nav.fixed-top, nav.fixed-top > ul.navbar-nav').toggleClass('active')
        $('.collapse.in').toggleClass('in')
        $('a[aria-expanded=true]').attr('aria-expanded', 'false')
      }
    },

    openIfClosed () {
      if ($('#sidebar').hasClass('active')) {
        $('#sidebar, #content, nav.fixed-top, nav.fixed-top > ul.navbar-nav').toggleClass('active')
        $('.collapse.in').toggleClass('in')
        $('a[aria-expanded=true]').attr('aria-expanded', 'false')
      }
    },

    exactLinkMatch (link) {
      if (link.hasOwnProperty('exact')) {
        return link.exact
      }
      return this.exact
    },

    isActive (key) {
      return '' + key === this.active
    },

    toggleAdminbar () {
      this.$store.dispatch('nav/toggle')
    },

    outsideClick () {
      if (this.windowWidth <= 768) {
        this.$nextTick(() => {
          // console.log('Clicked outside main nav', 'toggled', this.toggled);
          if (this.toggled) {
            // Check width, if on mobile, close the navigation
            this.$store.dispatch('nav/toggle')
          }
        })
      }
    }
  }
}
</script>
