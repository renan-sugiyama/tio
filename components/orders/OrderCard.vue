<template>
  <div class="order-card">
    <div>
      <strong>{{ order.number }}</strong>
    </div>
    <div>{{ order.contacName || 'TODO sem nome de contato' }}</div>
    <div>{{ order.deliverAddress || 'TODO sem endereço' }}</div>
    <div>{{ order.contactPhone || 'TODO sem telefone' }}</div>
    <div>{{ order.contactEmail || 'TODO sem email' }}</div>
    <div>{{ (order.products && order.products[0]) || 'TODO sem produto' }}</div>
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
