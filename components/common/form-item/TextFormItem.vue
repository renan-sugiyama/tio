<template>
  <a-form-item :label="label" style="padding-bottom: 0; margin-bottom: 0">
    <a-input
      v-decorator="[
        decorator,
        {
          initialValue: initialValue,
          rules: [{ required, message }],
        },
      ]"
      :placeholder="placeholder"
      @change="$emit('change', $event)"
    />
  </a-form-item>
</template>

<script>
export default {
  name: 'TextFormItem',
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
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
  },
}
</script>
