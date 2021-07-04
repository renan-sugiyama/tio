<template>
  <a-form-item :label="label" style="padding-bottom: 0; margin-bottom: 0">
    <a-auto-complete
      v-decorator="[
        decorator,
        {
          initialValue: initialValue,
          rules: [{ required, message }],
        },
      ]"
      :placeholder="placeholder"
      :data-source="dataSource"
      :option-label-prop="optionLabelProp"
      @select="(value, option) => $emit('select', { value, option })"
      @search="$emit('search', $event)"
      @change="$emit('change', $event)"
    >
      <template slot="dataSource">
        <slot name="dataSource" />
      </template>
    </a-auto-complete>
  </a-form-item>
</template>

<script>
export default {
  name: 'AutoCompleteFormItem',
  props: {
    decorator: {
      type: String,
      required: true,
    },
    optionLabelProp: {
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
    dataSource: {
      type: Array,
      default: () => [],
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
