<template>
  <div>
    <div class="header-list">
      <span class="header-title">
        {{ tableTitle }}
      </span>
      <slot name="headerOptions">
        <div v-if="headerActions" class="header-options">
          <template v-for="(action, index) in headerActions">
            <a-button
              :key="action.label"
              type="primary"
              :icon="action.icon"
              @click="action.click"
            >
              {{ action.label }}
            </a-button>
            <a-divider
              v-if="index !== headerActions.length"
              :key="action.label"
              type="vertical"
            />
          </template>
        </div>
      </slot>
    </div>
    <a-list
      :grid="{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 }"
      class="table-list"
      :loading="loading"
      item-layout="vertical"
      :data-source="dataSource"
    >
      <div
        v-if="nextPage"
        slot="loadMore"
        :style="{
          textAlign: 'center',
          marginTop: '12px',
          height: '32px',
          lineHeight: '32px',
        }"
      >
        <a-spin v-if="loadingMore" />
        <a-button v-else @click="onLoadMore"> loading more </a-button>
      </div>
      <a-list-item slot="renderItem" slot-scope="item" class="list-item">
        <slot name="item" :item="item" />
        <a slot="actions">
          <a-button type="link" @click="$emit('edit', item)">Editar</a-button>
        </a>
        <a slot="actions">
          <a-popconfirm
            title="TODO tem certeza?"
            ok-text="TODO Sim"
            ok-type="danger"
            cancel-text="TODO Não"
            @confirm="deleteItemById(item.id)"
          >
            <a-button type="link" style="color: #f5222d !important"
              >delete
            </a-button>
          </a-popconfirm>
        </a>
      </a-list-item>
      <!-- <div slot="footer"></div> -->
    </a-list>
  </div>
</template>

<script>
import FirebaseService from '~/service/firebase'

const defaultParams = {
  page: 0,
  limit: 2,
  orderDirection: 'desc',
  orderBy: 'updatedAt',
}

export default {
  name: 'TheTableList',
  props: {
    collection: {
      type: String,
      required: true,
    },
    filters: {
      type: Array,
      default: () => [],
    },
    tableTitle: {
      type: String,
      default: '',
    },
    headerActions: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      loading: true,
      loadingMore: false,
      dataSource: [],
      nextPage: null,
    }
  },

  watch: {
    filters() {
      this.getData()
    },
  },

  async mounted() {
    await this.getData()
  },

  methods: {
    async getData(params = defaultParams) {
      try {
        this.loading = true
        const { results, nextPage } = await FirebaseService.getList(
          this.collection,
          params,
          this.filters
        )
        console.log('results', results)
        this.dataSource = results
        this.nextPage = nextPage
      } catch (error) {
        // TODO
      } finally {
        this.loading = false
      }
    },
    async deleteItemById(id) {
      try {
        this.loading = true
        await FirebaseService.deleteItemById(this.collection, { id })
        this.getData()
      } catch (error) {
        // TODO
      } finally {
        this.loading = false
      }
    },

    async onLoadMore(params = defaultParams) {
      if (!this.nextPage) return
      try {
        this.loadingMore = true
        const { results, nextPage } = await FirebaseService.getList(
          this.collection,
          {
            page: this.nextPage,
            limit: defaultParams.limit,
            orderDirection: defaultParams.orderDirection,
          },
          this.filters
        )
        this.nextPage = nextPage
        this.dataSource = this.dataSource.concat(results)
      } catch (error) {
      } finally {
        this.loadingMore = false
      }
    },

    async refresh() {
      await this.getData()
    },
  },
}
</script>

<style lang="less" scoped>
.header-list {
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  .header-title {
    flex-grow: 1;
    font-weight: 600;
    font-size: 18px;
    color: @primary-color;
  }
}
.table-list {
  min-height: 350px;

  .list-item {
    & > ::v-deep div {
      background-color: #fefefe;
      padding: 8px 12px;
      border-radius: 12px;
    }
  }
}
</style>
