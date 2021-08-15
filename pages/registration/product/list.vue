<template>
  <div class="product-table-list">
    <TheTable
      collection="products"
      :columns="columns"
      :filters-options="filtersOptions"
      :header-actions="headerActions"
      :result-actions="resultActions"
      :updated-element="updatedElement"
      table-title="Product list"
    />

    <ProductEditMode
      v-if="isDrawerVisible"
      :data="editItem"
      :visible="isDrawerVisible"
      @close="closeEditDrawer"
      @update="updateElement"
    />
  </div>
</template>

<script>
import ProductEditMode from '~/components/products/ProductEditMode'
import TheTable from '~/components/common/TheTable'
import { filterOperators } from '~/enums/filterOperators'

export default {
  components: {
    TheTable,
    ProductEditMode,
  },

  data() {
    return {
      isDrawerVisible: false,
      editItem: {},
      filtersOptions: [
        {
          value: '',
          label: 'Name Start With',
          fieldName: 'nameToFilter',
          operator: filterOperators.INCLUDES,
          type: 'string',
        },
      ],
      updatedElement: {},
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Department',
          dataIndex: 'departmentId',
          scopedSlots: { customRender: 'departmentId' },
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      headerActions: [
        {
          click: this.showAddNewDrawer,
          label: 'New',
          icon: 'plus',
        },
      ],
      resultActions: [
        {
          click: this.showEditDrawer,
          label: 'Edit',
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
  },
}
</script>
