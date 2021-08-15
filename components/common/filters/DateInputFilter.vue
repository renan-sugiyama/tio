<template>
  <div class="date-input-filter">
    <span>
      {{ title }}
    </span>
    <a-date-picker
      v-model="currentValue"
      :placeholder="placeholder"
      :format="dateFormat"
      :allow-clear="allowClear"
      class="input-field"
      @change="$emit('input', currentValue)"
    />
  </div>
</template>

<script>
export default {
  name: 'DateInputFilter',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    dateFormat: {
      type: String,
      default: 'DD/MMM/YYYY',
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      currentValue: this.value,
    }
  },

  watch: {
    value(newValue) {
      this.currentValue = newValue
    },
  },
}
</script>

<style lang="less" scoped>
.date-input-filter {
  display: flex;
  flex-direction: column;
  width: 100%;

  .input-field {
    width: 100%;
  }
}
</style>
