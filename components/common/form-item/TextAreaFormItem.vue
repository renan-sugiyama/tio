<template>
  <a-form-item :label="label" style="padding-bottom: 0; margin-bottom: 0">
    <a-textarea
      v-decorator="[
        decorator,
        {
          initialValue: initialValue,
          rules: [{ required, message }],
        },
      ]"
      :placeholder="placeholder"
      :autosize="autosize"
      :maxLength="maxLength"
      @change="$emit('change', $event)"
    />
  </a-form-item>
</template>

<script>
export default {
  name: 'TextAreaFormItem',
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
    autosize: {
      type: Boolean,
      default: true,
    },
    maxLength: {
      type: Number,
      default: 100,
    },
  },
}
</script>
