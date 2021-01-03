<template>
  <a-layout id="default-layout">
    <the-sidebar :collapsed="collapsed" />
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content>
        <Nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue'

export default {
  components: { TheSidebar },
  data() {
    return {
      collapsed: true,
    }
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
}
</style>
