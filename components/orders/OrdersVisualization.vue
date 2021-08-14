<template>
  <div class="orders-visualization">
    <div
      v-for="(orderByDeparment, propName, index) in ordersByDeparment"
      :key="propName"
      class="department-orders"
    >
      <div class="department-orders__header">
        <span>data: {{ formatDateField(orderByDeparment.deliveryDate) }}</span>
        <span>
          {{ orderByDeparment.deparmentName }}
        </span>
      </div>

      <table class="orders-visualization-table">
        <thead class="head">
          <tr class="head-row">
            <th colspan="1" class="head-row-item"><strong>Order #</strong></th>
            <th colspan="1" class="head-row-item"><strong>Product</strong></th>
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
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'OrderVisualization',
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
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

  mounted() {
    this.getOrdersByDeparment()
  },

  methods: {
    // TODO colocar no utils service
    formatDateField(dateTimestamp) {
      return moment(new Date(dateTimestamp)).format('DD/MMM/YYYY')
    },

    getOrdersByDeparment() {
      const allProducts = this.orders.flatMap((order) =>
        order.products.map((product) => ({
          orderNumber: order.orderNumber,
          deliveryDate: order.deliveryDate,
          ...product,
        }))
      )
      console.log('allProducts', allProducts)

      this.ordersByDeparment = allProducts.reduce((acc, product) => {
        if (!acc[product.department.id]) {
          acc[product.department.id] = {
            deparmentName: product.department.name,
            deliveryDate: product.deliveryDate,
            items: [
              {
                orderNumber: product.orderNumber,
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
                name: product.name,
                measurement: product.measurement,
                quantity: product.quantity,
              },
            ],
          }
        }
        return acc
      }, {})
      console.log('this.ordersByDeparment', this.ordersByDeparment)
    },
  },
}
</script>

<style lang="less">
.orders-visualization {
  .department-orders {
    &__header {
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
