<template>
  <div class="client-list">
    <div class="filters">
      <a-row :gutter="16" class="selectors">
        <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 4 }">
          <TextInputFilter v-model="filtersOptions.clientName" title="name" />
        </a-col>
        <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 4 }">
          <NumberInputFilter
            v-model="filtersOptions.clientAge"
            :min="0"
            title="age"
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
      collection="clients"
      :filters="filters"
      :header-actions="headerActions"
      table-title="Lista de clientes"
      @edit="showEditDrawer"
    >
      <template v-slot:item="{ item }">
        <div>
          <div>Nome: {{ item.name }}</div>
          <div>Idade: {{ item.age }}</div>
        </div>
      </template>
    </TheTableList>

    <ClientEditMode
      :data="editItem"
      :visible="isDrawerVisible"
      @close="closeEditDrawer"
      @update="updateList"
    />
  </div>
</template>

<script>
import ClientEditMode from '~/components/clients/ClientEditMode'
import TheTableList from '~/components/common/TheTableList'
import TextInputFilter from '~/components/common/filters/TextInputFilter'

export default {
  components: {
    ClientEditMode,
    TheTableList,
    TextInputFilter,
  },

  data() {
    return {
      isDrawerVisible: false,
      editItem: {},
      filters: [],
      filtersOptions: {
        clientName: '',
        clientAge: 0,
      },
      headerActions: [
        {
          click: this.showEditDrawer,
          label: 'Novo',
          icon: 'plus',
        },
        {
          click: this.goToAddClient,
          label: 'Novo 2',
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

    goToAddClient() {
      this.$router.push({ path: '/registration/client' })
    },

    applyFilter() {
      const newFilters = []
      if (this.filtersOptions.clientName) {
        newFilters.push({
          prop: 'name',
          operator: '==',
          value: this.filtersOptions.clientName,
        })
      }
      if (this.filtersOptions.clientAge) {
        newFilters.push({
          prop: 'age',
          operator: '==',
          value: this.filtersOptions.clientAge,
        })
      }
      this.filters = newFilters
    },
  },
}
</script>

<style lang="less" scoped>
.client-list {
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
