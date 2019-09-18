<template>
  <nav v-if="breadcrumbList && breadcrumbList.length" aria-label="breadcrumb">
    <ul class="breadcrumb">
      <li v-for="(breadcrumb, idx) in breadcrumbList"
          :key="idx"
          class="breadcrumb-item"
          :class="{'active': !!breadcrumb.routeName}"
      >
        <template v-if="breadcrumb.routeName">
          <router-link :to="{ name: breadcrumb.routeName }">
            {{ $t(breadcrumb.name) }}
          </router-link>
        </template>
        <template v-else>
          {{ $t(breadcrumb.name) }}
        </template>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',

  data () {
    return {
      breadcrumbList: []
    }
  },
  watch: {
    '$route' () {
      this.updateList()
    }
  },
  mounted () {
    this.updateList()
  },
  methods: {
    updateList () {
      this.breadcrumbList = this.$route.meta.breadcrumbs
    }
  }
}
</script>
