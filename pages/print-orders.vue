<template>
  <div class="orders-visualization">
    <div v-if="loading" class="loading">
      <a-spin size="large" />
    </div>
    <div v-else-if="orders.length">
      <div class="no-print">
        <a-button
          type="primary"
          shape="circle"
          icon="printer"
          class="btn-printer"
          @click="printScreen"
        />
      </div>
      <section
        v-for="(orderByDeparment, propName, index) in ordersByDeparment"
        :key="propName"
        class="department-orders"
      >
        <table class="orders-visualization-table">
          <thead class="head">
            <tr class="head-row">
              <th colspan="4" class="head-row-item">
                Date: {{ formatDateField(orderByDeparment.deliveryDate) }}
              </th>
            </tr>
            <tr class="head-row">
              <th colspan="4" class="head-row-item">
                <div
                  style="
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <span> Deparment: {{ orderByDeparment.deparmentName }} </span>
                </div>
              </th>
            </tr>
            <tr class="head-row">
              <th colspan="1" class="head-row-item">
                <strong>Order #</strong>
              </th>
              <th colspan="1" class="head-row-item">
                <strong>Period</strong>
              </th>
              <th colspan="1" class="head-row-item">
                <strong>Product</strong>
              </th>
              <th colspan="1" class="head-row-item">Quantity</th>
            </tr>
          </thead>

          <tbody class="body">
            <tr
              v-for="(item, itemIndex) in orderByDeparment.items"
              :key="itemIndex"
              class="body-row"
            >
              <td colspan="1" class="body-row-item text-center">
                # {{ item.orderNumber }}
              </td>
              <td colspan="1" class="body-row-item text-center">
                {{
                  item.deliveryPeriod
                    ? getDeliveryPeriodName(item.deliveryPeriod)
                    : 'Not informed'
                }}
              </td>
              <td rowspan="1" colspan="1" class="body-row-item text-center">
                {{ item.name }}
              </td>
              <td rowspan="1" colspan="1" class="body-row-item text-center">
                {{ item.quantity }} {{ item.measurement }}
              </td>
            </tr>
          </tbody>
        </table>
        <a-divider
          v-if="index !== numberOfDeparments - 1"
          :key="`${orderByDeparment.deparmentName}_divider`"
          type="horizontal"
        />
      </section>
    </div>
    <div v-else>
      <NothingToShow title="No order found" />
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
      // TODO pegar da store
      orders: null,
      deliveryPeriods: [],
      // TODO pegar da store
      departments: [
        {
          id: 'laboratorio',
          name: 'laboratorio',
        },
        {
          id: 'kitchen',
          name: 'cozinha',
        },
        {
          id: 'desk',
          name: 'balcão',
        },
      ],
      ordersByDeparment: {},
    }
  },

  computed: {
    numberOfDeparments() {
      return Object.keys(this.ordersByDeparment).length
    },
  },

  async mounted() {
    this.getDeliveryPeriods()
    await this.getData()
    this.getOrdersByDeparment()
  },

  methods: {
    async getData() {
      try {
        this.loading = true
        this.orders = await FirebaseService.getAllOnceStartWith(
          'orders',
          'deliveryDate',
          this.$route.query.date
        )
      } catch (error) {
        this.orders = []
        this.$message.error('Error trying to get the orders')
      } finally {
        this.loading = false
      }
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

    getDeliveryPeriodName(deliveryPeriodId) {
      return (
        this.deliveryPeriods.find(
          (deliveryPeriod) => deliveryPeriod.id === deliveryPeriodId
        )?.name || ''
      )
    },

    printScreen() {
      window.print()
    },

    // TODO colocar no utils service
    formatDateField(date) {
      return moment(date).format('DD/MMM/YYYY')
    },

    getOrdersByDeparment() {
      const allProducts = this.orders.flatMap((order) =>
        order.products.map((product) => ({
          orderNumber: order.orderNumber,
          deliveryDate: order.deliveryDate,
          deliveryPeriod: order.deliveryPeriod,
          ...product,
        }))
      )

      this.ordersByDeparment = allProducts.reduce((acc, product) => {
        if (!acc[product.department.id]) {
          acc[product.department.id] = {
            deparmentName: product.department.name,
            deliveryDate: product.deliveryDate,
            items: [
              {
                orderNumber: product.orderNumber,
                deliveryPeriod: product.deliveryPeriod,
                name: product.name,
                measurement: product.measurement,
                quantity: product.quantity,
              },
            ],
          }
        } else {
          acc[product.department.id] = {
            ...acc[product.department.id],
            items: [
              ...acc[product.department.id].items,
              {
                orderNumber: product.orderNumber,
                deliveryPeriod: product.deliveryPeriod,
                name: product.name,
                measurement: product.measurement,
                quantity: product.quantity,
              },
            ],
          }
        }
        return acc
      }, {})
    },
  },
}
</script>

<style lang="less">
.orders-visualization {
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

  .department-orders {
    display: block;
    page-break-after: always !important;
    margin: 40px;

    &__header {
      page-break-inside: avoid;
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }

  .orders-visualization-table {
    width: 100%;
    table-layout: fixed;

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

    &:last-child {
      margin-top: 20px;
    }
  }
}
</style>
