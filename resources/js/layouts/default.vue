<template>
  <div>
    <template>
      <div class="main-layout">
        <admin-bar />
        <div id="content" :class="{ 'active': !toggled }">
          <navbar />
          <div class="container my-3 pb-5">
            <breadcrumb />
            <child />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navbar from '../components/Navbar'
import AdminBar from '../components/Adminbar'
import Breadcrumb from '../components/Breadcrumb'

export default {
  name: 'MainLayout',

  components: {
    Breadcrumb,
    Navbar,
    AdminBar
  },

  computed: mapGetters({
    toggled: 'nav/toggled'
  })
}
</script>
