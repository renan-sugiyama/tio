<template>
  <div class="product-card">
    <div>
      <strong>{{ product.name }}</strong>
    </div>
    <div>
      <span>${{ product.price }} - {{ product.measurement }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>
