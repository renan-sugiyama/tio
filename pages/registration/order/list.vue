<template>
  <div class="list">
    <TheTable
      collection="orders"
      :columns="columns"
      :filters-options="filtersOptions"
      :header-actions="headerActions"
      :result-actions="resultActions"
      :updated-element="updatedElement"
      table-title="Order list"
      @filtersApplied="updateFiltersApplied"
    />

    <OrderEditMode
      v-if="isDrawerVisible"
      :data="editItem"
      :visible="isDrawerVisible"
      @close="closeEditDrawer"
      @update="updateElement"
    />
  </div>
</template>

<script>
import moment from 'moment'
import OrderEditMode from '~/components/orders/OrderEditMode'
import TheTable from '~/components/common/TheTable'
import { filterOperators } from '~/enums/filterOperators'

export default {
  components: {
    TheTable,
    OrderEditMode,
  },

  data() {
    return {
      isDrawerVisible: false,
      editItem: {},
      filtersOptions: [
        {
          value: '',
          label: 'Order Number',
          fieldName: 'orderNumber',
          operator: filterOperators.EQUALS,
          type: 'number',
        },
        {
          value: '',
          label: 'Client Name Start With',
          fieldName: 'contactNameToFilter',
          operator: filterOperators.INCLUDES,
          type: 'string',
        },
        {
          value: moment(),
          label: 'Delivery Date',
          fieldName: 'deliveryDate',
          allowClear: false,
          operator: filterOperators.EQUALS,
          type: 'date',
        },
      ],
      updatedElement: {},
      columns: [
        {
          title: 'Order Number',
          dataIndex: 'orderNumber',
          fixed: 'left',
        },
        {
          title: 'Client Name',
          dataIndex: 'contactName',
          fixed: 'left',
        },
        {
          title: 'Phone',
          dataIndex: 'contactPhone',
        },
        {
          title: 'Delivery Date',
          dataIndex: 'deliveryDate',
          scopedSlots: { customRender: 'deliveryDate' },
        },
        {
          title: 'Created At',
          dataIndex: 'createdAt',
          type: 'date',
          scopedSlots: { customRender: 'createdAt' },
        },
        {
          title: 'Updated At',
          dataIndex: 'updatedAt',
          scopedSlots: { customRender: 'updatedAt' },
        },
        {
          title: 'Action',
          key: 'action',
          width: 200,
          scopedSlots: { customRender: 'action' },
        },
      ],
      headerActions: [
        {
          click: this.showAddNewDrawer,
          label: 'New',
          icon: 'plus',
        },
        {
          click: this.printAll,
          label: 'Print',
          icon: 'printer',
        },
      ],
      resultActions: [
        {
          click: this.showEditDrawer,
          label: 'Edit',
        },
        {
          click: this.printOrder,
          label: 'Print',
        },
      ],
    }
  },

  methods: {
    showEditDrawer(item) {
      this.editItem = item
      this.isDrawerVisible = true
    },

    showAddNewDrawer() {
      this.editItem = {}
      this.isDrawerVisible = true
    },

    updateElement(item) {
      this.updatedElement = item
      this.closeEditDrawer()
    },

    closeEditDrawer() {
      this.editItem = {}
      this.isDrawerVisible = false
    },

    updateFiltersApplied(filtersApplied) {
      this.filtersOptions = filtersApplied
    },

    printOrder(order) {
      const url = `/print-order/${order.orderNumber}`
      window.open(url, '_blank', null, false)
    },

    printAll() {
      const dateToPrint = this.filtersOptions.find(
        (filter) => filter.fieldName === 'deliveryDate'
      )
      if (!dateToPrint?.value) {
        this.$message.error(
          'Sorry, something went wrong. Check if there is a date selected on the filters'
        )
      }
      const dateToPrintFormat = dateToPrint.value.format('YYYY-MM-DD')
      const url = `/print-orders?date=${dateToPrintFormat}`
      window.open(url, '_blank', null, false)
    },
  },
}
</script>
