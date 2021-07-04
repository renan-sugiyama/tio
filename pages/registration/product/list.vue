<template>
  <div class="list">
    <div class="filters">
      <a-row :gutter="16" class="selectors">
        <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 4 }">
          <TextInputFilter
            v-model="filtersOptions.productName"
            title="TODO name"
          />
        </a-col>
      </a-row>

      <div class="actions">
        <a-button
          type="primary"
          shape="circle"
          icon="search"
          @click="applyFilter"
        />
      </div>
    </div>

    <TheTableList
      ref="tableList"
      collection="products"
      :filters="filters"
      :header-actions="headerActions"
      table-title="TODO Lista de produtos"
      @edit="showEditDrawer"
    >
      <template v-slot:item="{ item }">
        <ProductCard
          :product="item"
          :department="getProductDepartmentName(item)"
        />
      </template>
    </TheTableList>

    <ProductEditMode
      v-if="isDrawerVisible"
      :data="editItem"
      :departments="departments"
      :visible="isDrawerVisible"
      @close="closeEditDrawer"
      @update="updateList"
    />
  </div>
</template>

<script>
import ProductCard from '~/components/products/ProductCard'
import ProductEditMode from '~/components/products/ProductEditMode'
import TheTableList from '~/components/common/TheTableList'
import TextInputFilter from '~/components/common/filters/TextInputFilter'
import FirebaseService from '~/service/firebase'

export default {
  components: {
    ProductCard,
    ProductEditMode,
    TheTableList,
    TextInputFilter,
  },

  data() {
    return {
      departments: [],
      isDrawerVisible: false,
      editItem: {},
      filters: [],
      filtersOptions: {
        productName: '',
      },
      headerActions: [
        {
          click: this.showEditDrawer,
          label: 'TODO Novo',
          icon: 'plus',
        },
      ],
    }
  },

  async mounted() {
    await this.getDepartmentsList()
  },

  methods: {
    async getDepartmentsList() {
      this.departments = await FirebaseService.getAllOnce('departments')
    },

    getProductDepartmentName(departmentId) {
      return (
        this.departments.find(
          (department) => department.id === departmentId.departmentId
        )?.name || ''
      )
    },

    showEditDrawer(item) {
      this.editItem = item
      this.isDrawerVisible = true
    },

    updateList() {
      this.closeEditDrawer()
      this.$refs.tableList.refresh()
    },

    closeEditDrawer() {
      this.editItem = {}
      this.isDrawerVisible = false
    },

    applyFilter() {
      const newFilters = []
      if (this.filtersOptions.productName) {
        newFilters.push({
          prop: 'name',
          operator: '==',
          value: this.filtersOptions.productName,
        })
      }
      this.filters = newFilters
    },
  },
}
</script>

<style lang="less" scoped>
.list {
  .filters {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    margin: 10px 0 20px;
    border-bottom: 1px solid @border-color-base;

    .selectors {
      flex-grow: 1;
    }
  }
}
</style>
