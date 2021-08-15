<template>
  <a-result :title="title">
    <template #extra>
      <a-button type="primary" @click="goToHome"> Go Back </a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  name: 'NothingToShow',
  props: {
    title: {
      type: String,
      default: 'Your operation has been executed',
    },
  },

  methods: {
    goToHome() {
      this.$router.push({ name: 'registration-order-list' })
    },
  },
}
</script>
