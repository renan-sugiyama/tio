<template>
  <div>
    <a-button type="link" @click="showEditDrawer">add</a-button>
    <TableList ref="tableList" collection="clients" @edit="showEditDrawer">
      <template v-slot:item="{ item }">
        <div>
          <div>Nome: {{ item.name }}</div>
          <div>Idade: {{ item.age }}</div>
        </div>
      </template>
    </TableList>
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
import TableList from '~/components/common/TableList'

export default {
  components: {
    ClientEditMode,
    TableList,
  },

  data() {
    return {
      isDrawerVisible: false,
      editItem: {},
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
  },
}
</script>

<style>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
