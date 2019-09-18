<template>
  <div>
    <div class="card" :class="cardClass">
      <div v-if="title || action"
           class="card-header d-block d-md-flex d-lg-flex align-items-center justify-content-between"
      >
        <div v-if="title">
          <span v-html="title" />
        </div>
        <div v-if="action">
          <slot name="action" />
        </div>
      </div>
      <div v-if="showBody" :class="bodyClass">
        <slot />
      </div>
    </div>
    <slot name="outside" />
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    cardClass: { type: String, default: '' },
    bodyClass: { type: String, default: 'card-body' },
    showBody: { type: Boolean, default: true },
    action: { type: Boolean, default: false },
    title: { type: String, default: null }
  }
}
</script>
