<template>
  <section>
    <div class="form-group">
      <label>
        {{ $t('Select a date') }}
      </label>
      <div class="input-group">
        <flat-pickr
          :value="date"
          @on-change="updateDate"
          :config="config"
          ref="datePicker"
          class="form-control"
          placeholder="Select date"
          name="date">
        </flat-pickr>
        <div class="input-group-btn">
          <button class="btn btn-default" type="button" title="Toggle"
                  data-toggle
          >
            <fa icon="calendar">
              <span aria-hidden="true"
                    class="sr-only"
              >
                {{ $t('Toggle') }}
              </span>
            </fa>
          </button>
          <button class="btn btn-default" type="button" title="Clear"
                  data-clear
          >
            <fa class="fa-times">
              <span aria-hidden="true"
                    class="sr-only"
              >
                {{ $t('Clear') }}
              </span>
            </fa>
          </button>
        </div>
      </div>
    </div>
    <pre>${{ $t('Selected date is') }} - {{ date }}</pre>
  </section>
</template>

<script>
// import this component
import flatPickr from 'vue-flatpickr-component'

export default {
  name: 'DatePicker',

  components: {
    flatPickr
  },

  props: {
    date: {
      type: Date,
      required: true,
      default: new Date()
    }
  },

  data () {
    return {
      // Get more form https://chmln.github.io/flatpickr/options/
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'M j, Y',
        altInput: true,
        dateFormat: 'Y-m-d'
      }
    }
  },

  methods: {
    updateDate (selectedDates, dateStr, instance) {
      this.$emit('input', {
        date: selectedDates,
        string: dateStr
      })
      // this.$emit('input', this.$refs.datePicker.value)
    }
  }
}
</script>
