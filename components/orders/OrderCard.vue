<template>
  <div class="order-card">
    <div>
      <strong>{{ order.number }}</strong>
    </div>
    <div>{{ order.contactName || 'TODO sem nome de contato' }}</div>
    <div>{{ order.deliverAddress || 'TODO sem endereço' }}</div>
    <div>{{ order.contactPhone || 'TODO sem telefone' }}</div>
    <div>{{ order.contactEmail || 'TODO sem email' }}</div>
    <div v-for="product in order.products" :key="product.id">
      <div>TODO produto: {{ product.name }}</div>
      <div>
        TODO quantidade: {{ product.quantity }} {{ product.measurement }}
      </div>
      <div>TODO Preço: ${{ product.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientCard',
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
}
</script>
