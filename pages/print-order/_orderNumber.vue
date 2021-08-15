<template>
  <div class="order-number">
    <div v-if="loading" class="loading">
      <a-spin size="large" />
    </div>

    <div v-else-if="order.orderNumber">
      <div class="no-print">
        <a-button
          type="primary"
          shape="circle"
          icon="printer"
          class="btn-printer"
          @click="printScreen"
        />
      </div>
      <table class="order-visualization-table">
        <thead class="head">
          <tr class="head-row">
            <th colspan="6">
              <table class="order-visualization-table__header">
                <thead class="head">
                  <tr class="head-row">
                    <th colspan="6" class="head-row-item">
                      <strong>Order #{{ order.orderNumber }}</strong>
                    </th>
                  </tr>

                  <tr class="head-row">
                    <th colspan="3" class="head-row-item">
                      <strong>Delivery Date</strong>: {{ deliveryDate }}
                    </th>
                    <th colspan="3" class="head-row-item">
                      <strong>Delivery Period</strong>:
                      {{
                        order.deliveryPeriod
                          ? getDeliveryPeriodName(order.deliveryPeriod)
                          : 'Not informed'
                      }}
                    </th>
                  </tr>
                </thead>

                <tbody class="body">
                  <tr class="body-row">
                    <td colspan="6" class="body-row-item text-left">
                      <strong>Name:</strong> {{ order.contactName }}
                    </td>
                  </tr>

                  <tr class="body-row">
                    <td colspan="6" class="body-row-item text-left">
                      <strong>Phone:</strong> {{ order.contactPhone }}
                    </td>
                  </tr>

                  <tr class="body-row">
                    <td colspan="6" class="body-row-item text-left">
                      <strong>E-mail:</strong> {{ order.contactEmail }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </th>
          </tr>

          <tr class="head-row">
            <th colspan="6" class="head-row-item"><strong>Products</strong></th>
          </tr>

          <tr class="head-row">
            <th colspan="1" class="head-row-item">Deparment</th>
            <th colspan="2" class="head-row-item">Name</th>
            <th colspan="1" class="head-row-item">Order Qtd</th>
            <th colspan="1" class="head-row-item">Real Qtd</th>
            <th colspan="1" class="head-row-item">Value</th>
          </tr>
        </thead>

        <tbody class="body">
          <tr
            v-for="product in order.products"
            :key="product.id"
            class="body-row"
          >
            <td colspan="1" class="body-row-item text-center">
              {{ product.department && product.department.name }}
            </td>
            <td colspan="2" class="body-row-item text-center">
              {{ product.name }}
            </td>
            <td colspan="1" class="body-row-item text-center">
              {{ product.quantity }} {{ product.measurement }}
            </td>
            <td colspan="1" class="body-row-item text-center"></td>
            <td colspan="1" class="body-row-item text-center"></td>
          </tr>

          <tr>
            <td colspan="4" class="body-row-item"></td>
            <td colspan="1" class="body-row-item text-center">TOTAL: $</td>
            <td colspan="1" class="body-row-item"></td>
          </tr>
        </tbody>
      </table>
      <div class="order-note">Note: {{ order.note }}</div>
    </div>
    <div v-else>
      <NothingToShow title="The order was not found or doesn't exist" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import FirebaseService from '~/service/firebase'
import NothingToShow from '~/components/common/NothingToShow'

export default {
  layout: 'empty',
  name: 'OrderVisualization',
  components: {
    NothingToShow,
  },
  data() {
    return {
      loading: true,
      order: {},
      deliveryPeriods: [],
    }
  },

  computed: {
    deliveryDate() {
      return this.order?.deliveryDate
        ? moment(this.order.deliveryDate).format('DD/MMM/YY')
        : null
    },
  },

  mounted() {
    this.getData()
    this.getDeliveryPeriods()
  },

  methods: {
    printScreen() {
      window.print()
    },
    async getData() {
      if (typeof Number(this.$route.params.orderNumber) !== 'number') return
      const filters = [
        {
          prop: 'orderNumber',
          operator: '==',
          value: Number(this.$route.params.orderNumber),
        },
      ]
      try {
        this.loading = true
        const orders = await FirebaseService.getListFiltered('orders', filters)
        this.order = orders[0] || {}
      } catch (error) {
        this.orders = []
        this.$message.error('Error trying to get the order')
      } finally {
        this.loading = false
      }
    },

    getDeliveryPeriodName(deliveryPeriodId) {
      return (
        this.deliveryPeriods.find(
          (deliveryPeriod) => deliveryPeriod.id === deliveryPeriodId
        )?.name || ''
      )
    },

    async getDeliveryPeriods() {
      const deliveryPeriodList = await FirebaseService.getAllOnce(
        'deliveryPeriod'
      )
      this.deliveryPeriods = deliveryPeriodList.map((deliveryPeriod) => ({
        name: deliveryPeriod.name,
        id: deliveryPeriod.id,
      }))
    },
  },
}
</script>

<style lang="less">
.order-number {
  padding: 40px;

  .loading {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    .ant-spin-spinning {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .btn-printer {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 60px;
    height: 60px;

    i {
      font-size: 24px;
    }
  }

  .order-note {
    padding: 20px 10px;
  }

  .order-visualization-table {
    width: 100%;
    table-layout: fixed;

    &__header {
      width: 100%;
      table-layout: fixed;
      margin-bottom: 30px;
      font-weight: normal;
    }

    thead.head {
      tr.head-row {
        background-color: #fcfcfc;

        th.head-row-item {
          text-align: center;
          border: 1px solid #efefef;
        }
      }
    }

    tbody.body {
      border: 1px solid #efefef;

      .body-row {
        .body-row-item {
          padding: 4px 8px;
          border: 1px solid #efefef;
        }
      }
    }
  }
}
</style>
