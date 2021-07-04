<template>
  <div id="orderPrint">
    <table class="order-visualization-table">
      <thead class="head">
        <tr class="head-row">
          <th colspan="5" class="head-row-item"><strong>Cliente</strong></th>
          <th colspan="1" class="head-row-item">
            <strong>Data de entrega</strong>
          </th>
        </tr>
      </thead>
      <tbody class="body">
        <tr class="body-row">
          <td colspan="5" class="body-row-item">
            <strong>Nome:</strong> {{ order.contactName }}
          </td>
          <td rowspan="4" colspan="1" class="body-row-item text-center">
            {{ deliveryDate }}
          </td>
        </tr>
        <tr class="body-row">
          <td colspan="6" class="body-row-item">
            <strong>Telefone:</strong> {{ order.contactPhone }}
          </td>
        </tr>
        <tr class="body-row">
          <td colspan="6" class="body-row-item">
            <strong>E-mail:</strong> {{ order.contactEmail }}
          </td>
        </tr>
        <tr class="body-row">
          <td colspan="5" class="body-row-item">
            <strong>Endereço:</strong> {{ order.deliverAddress }}
          </td>
        </tr>
      </tbody>
    </table>

    <table class="order-visualization-table">
      <thead class="head">
        <tr class="head-row">
          <th colspan="6" class="head-row-item"><strong>Produtos</strong></th>
        </tr>
        <tr class="head-row">
          <th colspan="2" class="head-row-item">Nome</th>
          <th colspan="1" class="head-row-item">Preço</th>
          <th colspan="1" class="head-row-item">Quantidade</th>
          <th colspan="1" class="head-row-item">Total</th>
          <th colspan="1" class="head-row-item">Departamento</th>
        </tr>
      </thead>
      <tbody class="body">
        <tr
          v-for="product in order.products"
          :key="product.id"
          class="body-row"
        >
          <td colspan="2" class="body-row-item text-center">
            {{ product.name }}
          </td>
          <td colspan="1" class="body-row-item text-center">
            ${{ product.price }} / {{ product.measurement }}
          </td>
          <td colspan="1" class="body-row-item text-center">
            {{ product.quantity }}
          </td>
          <td colspan="1" class="body-row-item text-center">
            ${{ product.quantity * product.price }}
          </td>
          <td colspan="1" class="body-row-item text-center">
            {{ product.department && product.department.name }}
          </td>
        </tr>
        <tr>
          <td colspan="4" class="body-row-item"></td>
          <td colspan="1" class="body-row-item text-center">
            TOTAL: ${{ order.totalValue }}
          </td>
          <td colspan="1" class="body-row-item"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'OrderVisualization',
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      deliveryDate: moment(this.order.deliveryDate).format('DD/MMM/YY'),
    }
  },
}
</script>

<style lang="less">
.order-visualization-table {
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
</style>
