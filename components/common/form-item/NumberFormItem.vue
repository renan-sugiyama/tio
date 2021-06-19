<template>
  <a-form-item :label="label" class="number-form-item">
    <a-input-number
      class="input"
      v-decorator="[
        decorator,
        {
          initialValue: initialValue,
          rules: [{ required, message }],
        },
      ]"
      :min="min"
      :max="max"
      :precision="precision"
    />
  </a-form-item>
</template>

<script>
export default {
  name: 'NumberFormItem',
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
      type: Number,
      default: 0,
    },
    required: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    precision: {
      type: Number,
      default: null,
    },
  },
}
</script>

<style lang="less" scoped>
.number-form-item {
  .input {
    width: 100%;
  }
}
</style>
