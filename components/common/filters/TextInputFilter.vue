<template>
  <div class="text-input-filter">
    <span>
      {{ title }}
    </span>
    <a-input
      v-model="currentValue"
      :placeholder="placeholder"
      class="input-field"
      @keyup.enter="onKeyEnter"
      @change="$emit('input', currentValue)"
    />
  </div>
</template>

<script>
export default {
  name: 'TextInputFilter',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    onKeyEnter: {
      type: Function,
      default: () => ({}),
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
.text-input-filter {
  display: flex;
  flex-direction: column;
  width: 100%;

  .input-field {
    width: 100%;
  }
}
</style>
