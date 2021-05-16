<template>
  <a-list
    class="demo-loadmore-list"
    :loading="loading"
    item-layout="horizontal"
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
    <a-list-item slot="renderItem" slot-scope="item">
      <slot name="item" :item="item" />
      <a slot="actions">
        <a-button type="link" @click="$emit('edit', item)">Editar</a-button>
      </a>
      <a slot="actions">
        <a-button type="link" @click="deleteItemById(item.id)"
          >delete
        </a-button>
      </a>
    </a-list-item>
  </a-list>
</template>

<script>
import FirebaseService from '~/service/firebase'
const defaultParams = {
  page: 0,
  limit: 1,
  orderDirection: 'asc',
}

export default {
  props: {
    collection: {
      type: String,
      required: true,
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

  async mounted() {
    await this.getData()
  },

  methods: {
    async getData(params = defaultParams) {
      try {
        this.loading = true
        const { results, nextPage } = await FirebaseService.getList(
          this.collection,
          params
        )
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

    async onLoadMore() {
      if (!this.nextPage) return
      try {
        this.loadingMore = true
        const { results, nextPage } = await FirebaseService.getList(
          this.collection,
          {
            page: this.nextPage,
            limit: defaultParams.limit,
            orderDirection: 'asc',
          }
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

<style>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
