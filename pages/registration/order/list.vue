<template>
  <div class="list">
    <OrderVisualizationModal ref="orderVisualizationModal" />
    <OrdersVisualizationModal ref="ordersVisualizationModal" />

    <TheTable
      collection="orders"
      :columns="columns"
      :filters-options="filtersOptions"
      :header-actions="headerActions"
      :result-actions="resultActions"
      :updated-element="updatedElement"
      :has-department="true"
      table-title="TODO Lista de produtos"
    />

    <OrderEditMode
      v-if="isDrawerVisible"
      :data="editItem"
      :measurement-options="measurementOptions"
      :visible="isDrawerVisible"
      @close="closeEditDrawer"
      @update="updateElement"
    />
  </div>
</template>

<script>
import FirebaseService from '~/service/firebase'
import OrderVisualizationModal from '~/components/orders/OrderVisualizationModal.vue'
import OrdersVisualizationModal from '~/components/orders/OrdersVisualizationModal.vue'
import OrderEditMode from '~/components/orders/OrderEditMode'
import TheTable from '~/components/common/TheTable'
import { filterOperators } from '~/enums/filterOperators'
import { ordersDataMock } from '~/teste'

export default {
  components: {
    TheTable,
    OrderEditMode,
    OrderVisualizationModal,
    OrdersVisualizationModal,
  },

  data() {
    return {
      // TODO colocar na store?
      dataToPrint: [],
      measurementOptions: [],
      isDrawerVisible: false,
      editItem: {},
      filtersOptions: [
        {
          value: '',
          label: 'Client Name',
          fieldName: 'contactName',
          operator: filterOperators.INCLUDES,
          type: 'string',
        },
      ],
      updatedElement: {},
      columns: [
        {
          title: 'Order Number',
          dataIndex: 'orderNumber',
          fixed: 'left',
          sorter: true,
        },
        {
          title: 'Client Name',
          dataIndex: 'contactName',
          fixed: 'left',
          sorter: true,
        },
        {
          title: 'Phone',
          dataIndex: 'contactPhone',
          sorter: true,
        },
        {
          title: 'Delivery Date',
          dataIndex: 'deliveryDate',
          scopedSlots: { customRender: 'deliveryDate' },
        },
        {
          title: 'Deliver Address',
          dataIndex: 'deliverAddress',
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
          click: this.showEditDrawer,
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
          click: this.openOrderVisualizationModal,
          label: 'Print',
        },
      ],
    }
  },

  async mounted() {
    await this.getMeasurementList()
  },

  methods: {
    // TODO colocar getMeasurementList na store e popular no momento que carregar a aplicacao
    async getMeasurementList() {
      const measurementList = await FirebaseService.getAllOnce(
        'productsMeasurements'
      )
      this.measurementOptions = measurementList.map((measurement) => ({
        name: measurement.name,
        value: measurement.id,
      }))
    },

    showEditDrawer(item) {
      this.editItem = item
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

    openOrderVisualizationModal(order) {
      this.$refs.orderVisualizationModal.open(order)
    },

    printAll() {
      try {
        this.loading = true
        // this.dataToPrint = await FirebaseService.getAllOnce('orders')
        this.$refs.ordersVisualizationModal.open(ordersDataMock)
        console.log('print all')
      } catch (error) {
        // TODO
        console.log('rro', error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
