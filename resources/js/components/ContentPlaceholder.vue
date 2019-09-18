<template>
  <div>
    <template v-for="n in rows">
      <template v-if="type === 'form'">
        <v-content-loader
          :height="60"
          :width="600"
          :speed="2"
          :primaryColor="colors.primaryColor"
          :secondaryColor="colors.secondaryColor"
        >
          <rect x="0" y="0" rx="0" ry="0" width="169" height="10" />
          <rect x="28" y="20" rx="0" ry="0" width="142" height="10" />
          <rect x="15" y="40" rx="0" ry="0" width="155" height="10" />

          <rect x="180" y="0" rx="0" ry="0" width="448" height="10" />
          <rect x="180" y="20" rx="0" ry="0" width="448" height="10" />
          <rect x="180" y="40" rx="0" ry="0" width="448" height="10" />
        </v-content-loader>
      </template>
      <template v-if="type === 'form-avatar' || type === 'qrinput'">
        <v-content-loader
          :height="90"
          :width="600"
          :speed="2"
          :primaryColor="colors.primaryColor"
          :secondaryColor="colors.secondaryColor"
        >
          <rect x="70" y="0" rx="0" ry="0" width="100" height="10" />
          <rect x="180" y="0" rx="0" ry="0" width="80" height="80" />
        </v-content-loader>
      </template>
      <template v-if="type === 'form-text'">
        <v-content-loader
          :height="20"
          :width="600"
          :speed="2"
          :primaryColor="colors.primaryColor"
          :secondaryColor="colors.secondaryColor"
        >
          <rect x="0" y="0" rx="0" ry="0" width="169" height="10" />
          <rect x="180" y="0" rx="0" ry="0" width="448" height="10" />
        </v-content-loader>
      </template>
      <template v-if="type === 'form-button'">
        <v-content-loader
          :height="24"
          :width="600"
          :speed="2"
          :primaryColor="colors.primaryColor"
          :secondaryColor="colors.secondaryColor"
        >
          <rect x="180" y="0" rx="0" ry="0" width="65" height="24" />
        </v-content-loader>
      </template>
      <template v-if="type === 'form-textarea'">
        <v-content-loader
          :height="70"
          :width="600"
          :speed="2"
          :primaryColor="colors.primaryColor"
          :secondaryColor="colors.secondaryColor"
        >
          <rect x="70" y="0" rx="0" ry="0" width="100" height="10" />
          <rect x="180" y="0" rx="0" ry="0" width="448" height="60" />
        </v-content-loader>
      </template>
      <template v-if="type === 'block-content'">
        <v-content-loader
          :height="260"
          :width="400"
          :speed="2"
          :primaryColor="colors.primaryColor"
          :secondaryColor="colors.secondaryColor"
        >
          <rect x="0" y="3.2" rx="0" ry="0" width="386" height="40" />
          <rect x="0" y="58.2" rx="0" ry="0" width="386" height="10" />
          <rect x="0" y="81.2" rx="0" ry="0" width="386" height="27" />
          <rect x="0" y="119.2" rx="0" ry="0" width="386" height="7" />
          <rect x="0" y="141.2" rx="0" ry="0" width="386" height="105" />
        </v-content-loader>
      </template>
      <template v-if="type === 'stepper'">
        <v-content-loader
          :height="260"
          :width="600"
          :speed="2"
          :primaryColor="colors.primaryColor"
          :secondaryColor="colors.secondaryColor"
        >
          <circle cx="50" cy="60" r="25" />
          <circle cx="290" cy="60" r="25" />
          <circle cx="550" cy="60" r="25" />

          <rect x="0" y="62" rx="0" ry="0" width="600" height="3" />

          <rect x="28" y="118" rx="0" ry="0" width="260" height="10" />
          <rect x="28" y="138" rx="0" ry="0" width="372" height="10" />
          <rect x="28" y="158" rx="0" ry="0" width="315" height="10" />

          <rect x="520" y="212.2" rx="0" ry="0" width="65" height="24" />
        </v-content-loader>
      </template>
      <template v-if="type === 'columns'">
        <v-content-loader
          :height="400"
          :width="800"
          :speed="2"
          :primaryColor="colors.primaryColor"
          :secondaryColor="colors.secondaryColor"
        >
          <rect x="15" y="10" rx="0" ry="0" width="214.52" height="176.46" />
          <rect x="15" y="220" rx="0" ry="0" width="214.52" height="176.46" />
          <rect x="272" y="10" rx="0" ry="0" width="214.52" height="176.46" />
          <rect x="272" y="220" rx="0" ry="0" width="214.52" height="176.46" />
          <rect x="530" y="10" rx="0" ry="0" width="214.52" height="176.46" />
          <rect x="530" y="220" rx="0" ry="0" width="214.52" height="176.46" />
        </v-content-loader>
      </template>
    </template>
  </div>
</template>

<script type="text/babel">

export default {
  name: 'ContentPlaceholder',

  props: {
    type: {
      type: String,
      default: 'form'
    },
    colors: {
      type: Object,
      default: () => ({
        primaryColor: '#f3f3f3',
        secondaryColor: '#e0e0e0'
      })
    },
    rows: {
      type: Number,
      default: 3
    }
  },

  data: () => ({}),

  mounted () {

  },

  methods: {}

}
</script>