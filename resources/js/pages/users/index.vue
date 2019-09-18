<template>
  <div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script type="text/babel">
// Import middleware
// ...

export default {
  name: 'Users'
  // middleware: [auth] // component middleware
}
</script>
