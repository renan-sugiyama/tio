<template>
  <a-layout id="default-layout">
    <the-sidebar :collapsed="collapsed" />
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <a-popconfirm
            title="Do you want to logout？"
            ok-text="Yes"
            cancel-text="No"
            @confirm="logout"
          >
            <a-icon type="logout" class="logout-icon" />
          </a-popconfirm>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div class="layout-content">
          <Nuxt />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapActions } from 'vuex'
import TheSidebar from '~/components/TheSidebar.vue'
import FirebaseService from '~/service/firebase'

export default {
  components: { TheSidebar },
  data() {
    return {
      collapsed: false,
    }
  },
  beforeMount() {
    this.setIsMobile()
  },

  async mounted() {
    await this.getDepartmentsList()
    await this.getMeasurementList()
    await this.getDeliveryPeriod()

    this.$nextTick(() => {
      window.addEventListener('resize', this.setIsMobile)
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.setIsMobile)
  },

  methods: {
    ...mapActions({
      setIsMobile: 'configs/setIsMobile',
      setDepartments: 'globalValues/setDepartments',
      setMeasurements: 'globalValues/setMeasurements',
      setDeliveryPeriods: 'globalValues/setDeliveryPeriods',
    }),

    async getDepartmentsList() {
      const departments = await FirebaseService.getAllOnce('departments')
      this.setDepartments(departments)
    },

    async getMeasurementList() {
      const measurementList = await FirebaseService.getAllOnce(
        'productsMeasurements'
      )
      const measurements = measurementList.map((measurement) => ({
        name: measurement.name,
        value: measurement.id,
      }))

      this.setMeasurements(measurements)
    },

    async getDeliveryPeriod() {
      const deliveryPeriodList = await FirebaseService.getAllOnce(
        'deliveryPeriod'
      )
      const deliveryPeriods = deliveryPeriodList.map((deliveryPeriod) => ({
        name: deliveryPeriod.name,
        value: deliveryPeriod.id,
      }))

      this.setDeliveryPeriods(deliveryPeriods)
    },

    async logout() {
      try {
        await this.$store.dispatch('admin/logout')
        this.$router.push({ path: '/login' })
      } catch (error) {
        this.$message.error('It was not possible to logout')
      }
    },
  },
}
</script>

<style lang="less" scoped>
@layout-header-height: 64px;
@layout-footer-height: 48px;

#default-layout {
  min-height: 100vh;
}

#default-layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#default-layout .trigger:hover {
  color: #1890ff;
}

#default-layout .ant-layout-content {
  min-height: calc(100vh - @layout-header-height - @layout-footer-height);
  padding: 0 5px;
}

.logout-icon {
  margin-right: 15px;
  cursor: pointer;
  &:hover {
    color: @link-color;
  }
}
</style>
