<template>
  <div class="list">
    <div class="filters">
      <a-row :gutter="16" class="selectors">
        <!-- TODO -->
        <!-- <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 4 }">
          <NumberInputFilter
            v-model="filtersOptions.orderNumber"
            :min="0"
            title="TODO orderNumber"
          />
        </a-col> -->

        <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 4 }">
          <TextInputFilter
            v-model="filtersOptions.orderContactName"
            title="TODO orderContactName"
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
      collection="orders"
      :filters="filters"
      :header-actions="headerActions"
      table-title="TODO Lista de pedidos"
      @edit="showEditDrawer"
    >
      <template v-slot:item="{ item }">
        <OrderCard :order="item" />
      </template>
    </TheTableList>

    <OrderEditMode
      v-if="isDrawerVisible"
      :data="editItem"
      :visible="isDrawerVisible"
      @close="closeEditDrawer"
      @update="updateList"
    />
  </div>
</template>

<script>
import OrderCard from '~/components/orders/OrderCard'
import OrderEditMode from '~/components/orders/OrderEditMode'
import TheTableList from '~/components/common/TheTableList'
import TextInputFilter from '~/components/common/filters/TextInputFilter'
// import NumberInputFilter from '~/components/common/filters/NumberInputFilter'

export default {
  components: {
    OrderCard,
    OrderEditMode,
    TheTableList,
    TextInputFilter,
    // NumberInputFilter,
  },

  data() {
    return {
      isDrawerVisible: false,
      editItem: {},
      filters: [],
      filtersOptions: {
        orderNumber: 0,
        orderContactName: '',
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

  methods: {
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
      if (this.filtersOptions.orderNumber) {
        newFilters.push({
          prop: 'number',
          operator: '==',
          value: this.filtersOptions.orderNumber,
        })
      }
      if (this.filtersOptions.orderContactName) {
        newFilters.push({
          prop: 'contactName',
          operator: '==',
          value: this.filtersOptions.orderContactName,
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
