<template>
  <div class="order-card">
    <OrderVisualizationModal ref="orderVisualizationModal" />
    <div class="header">
      <strong>#{{ order.orderNumber }}</strong>
      <a-icon
        type="printer"
        class="header-icon"
        @click="openOrderVisualizationModal"
      />
    </div>
    <div>{{ order.contactName || 'TODO sem nome de contato' }}</div>
    <div>{{ order.deliverAddress || 'TODO sem endereço' }}</div>
    <div>{{ order.contactPhone || 'TODO sem telefone' }}</div>
    <div>{{ order.contactEmail || 'TODO sem email' }}</div>
    <div>TODO Total: ${{ order.totalValue }}</div>
  </div>
</template>

<script>
import OrderVisualizationModal from '~/components/orders/OrderVisualizationModal.vue'

export default {
  name: 'OrderCard',
  components: {
    OrderVisualizationModal,
  },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  methods: {
    openOrderVisualizationModal() {
      this.$refs.orderVisualizationModal.open(this.order)
    },
  },
}
</script>

<style lang="less" scoped>
.order-card {
  .header {
    display: flex;
    justify-content: space-between;

    .header-icon {
      cursor: pointer;
    }
  }
}
</style>
