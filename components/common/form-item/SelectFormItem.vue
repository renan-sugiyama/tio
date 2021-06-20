<template>
  <a-form-item :label="label">
    <a-select
      v-decorator="[
        decorator,
        {
          initialValue: initialValue,
          rules: [{ required, message }],
        },
      ]"
      :placeholder="placeholder"
      @change="handleSelectChange"
    >
      <a-select-option
        v-for="option in options"
        :key="option.id || option.name"
        :value="option.id || option.value"
      >
        {{ option.name }}
      </a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
export default {
  name: 'SelectFormItem',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
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
  methods: {
    handleSelectChange(value, option) {
      this.$emit('change', value, option)
    },
  },
}
</script>
