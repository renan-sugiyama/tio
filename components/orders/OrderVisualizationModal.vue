<template>
  <a-modal
    v-model="visible"
    :title="`TODO Pedido #${order && order.orderNumber}`"
    ok-text="Imprimir"
    width="80vw"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <OrderVisualization :order="order" />
  </a-modal>
</template>

<script>
import OrderVisualization from '~/components/orders/OrderVisualization'

export default {
  name: 'OrderVisualizationModal',
  components: {
    OrderVisualization,
  },

  data() {
    return {
      visible: false,
      order: null,
    }
  },

  methods: {
    open(order) {
      this.order = order
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
  .ant-modal-footer,
  .ant-modal-close {
    display: none !important;
  }
}
</style>
