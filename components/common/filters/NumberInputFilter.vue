<template>
  <div class="text-input-filter">
    <span>
      {{ title }}
    </span>
    <a-input-number
      id="age"
      v-model="currentValue"
      :min="min"
      :max="max"
      class="input-field"
      @change="$emit('input', currentValue)"
    />
  </div>
</template>

<script>
export default {
  name: 'NumberInputFilter',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    placeholder: {
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
  },

  data() {
    return {
      currentValue: this.value,
    }
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
