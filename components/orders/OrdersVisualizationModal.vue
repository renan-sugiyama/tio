<template>
  <a-modal
    v-model="visible"
    title="Products by deparment"
    ok-text="Imprimir"
    width="80vw"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <OrdersVisualization :orders="orders" />
  </a-modal>
</template>

<script>
import OrdersVisualization from '~/components/orders/OrdersVisualization'

export default {
  name: 'OrderVisualizationModal',
  components: {
    OrdersVisualization,
  },

  data() {
    return {
      visible: false,
      orders: null,
    }
  },

  methods: {
    open(orders) {
      console.log('orders', orders)
      this.orders = orders
      this.visible = true
    },

    hide() {
      this.visible = false
    },

    handleOk() {
      window.print()
    },

    handleCancel() {
      this.hide()
    },
  },
}
</script>

<style lang="less">
@media print {
  .ant-modal-header,
  .ant-modal-footer,
  .ant-modal-close {
    display: none !important;
  }

  .ant-modal {
    width: 100vw !important;
  }
}
</style>
