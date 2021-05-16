<template>
  <a-drawer
    :title="title"
    :width="width"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="$emit('close')"
  >
    <slot name="content" />
    <slot name="actions">
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="$emit('close')">
          Cancel
        </a-button>
        <a-button type="primary" @click="handleSubmit"> Submit </a-button>
      </div>
    </slot>
  </a-drawer>
</template>

<script>
export default {
  name: 'DrawerForm',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 720,
    },
    handleSubmit: {
      type: Function,
      default: () => ({}),
    },
  },
}
</script>
