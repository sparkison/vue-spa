<template>
  <div v-if="loading" class="spinner">
    <div class="bounce1" />
    <div class="bounce2" />
    <div class="bounce3" />
  </div>
</template>
<script type="text/babel">

export default {
  name: 'InlineLoader',

  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>