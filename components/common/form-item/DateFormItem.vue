<template>
  <a-form-item
    :label="label"
    class="date-picker-form-item"
    style="padding-bottom: 0; margin-bottom: 0"
  >
    <a-date-picker
      v-decorator="[
        decorator,
        {
          initialValue: initialValue,
          rules: [{ type: 'object', required, message }],
        },
      ]"
      class="date-picker-container"
      :placeholder="placeholder"
      :format="dateFormat"
      @change="(date, dateString) => $emit('change', date, dateString)"
    />
  </a-form-item>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DateFormItem',
  props: {
    decorator: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    initialValue: {
      type: Object,
      default: () => moment(),
    },
    required: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
    dateFormat: {
      type: String,
      default: 'DD/MMM/YYYY',
    },
  },
}
</script>

<style lang="less" scoped>
.date-picker-form-item {
  .date-picker-container {
    width: 100%;
  }
}
</style>
