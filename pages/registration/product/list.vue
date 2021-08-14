<template>
  <div class="product-table-list">
    <TheTable
      collection="products"
      :columns="columns"
      :filters-options="filtersOptions"
      :header-actions="headerActions"
      :result-actions="resultActions"
      :updated-element="updatedElement"
      :has-department="true"
      table-title="TODO Lista de produtos"
    />

    <ProductEditMode
      v-if="isDrawerVisible"
      :data="editItem"
      :departments="departments"
      :visible="isDrawerVisible"
      @close="closeEditDrawer"
      @update="updateElement"
    />
  </div>
</template>

<script>
import FirebaseService from '~/service/firebase'
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
      departments: [],
      isDrawerVisible: false,
      editItem: {},
      filtersOptions: [
        {
          value: '',
          label: 'Name',
          fieldName: 'name',
          operator: filterOperators.INCLUDES,
          type: 'string',
        },
      ],
      updatedElement: {},
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          sorter: true,
        },
        {
          title: 'Departamento',
          dataIndex: 'departmentId',
          sorter: true,
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
          click: this.showEditDrawer,
          label: 'TODO Novo',
        },
      ],
      resultActions: [
        {
          click: this.showEditDrawer,
          label: 'TODO Editar',
        },
      ],
    }
  },

  async mounted() {
    // TODO colocar getDepartmentsList na store e popular no momento que carregar a aplicacao
    await this.getDepartmentsList()
  },

  methods: {
    async getDepartmentsList() {
      this.departments = await FirebaseService.getAllOnce('departments')
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
  },
}
</script>
