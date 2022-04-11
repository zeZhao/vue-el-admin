<template>
  <div class="Sidebar">
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <el-menu-item
        :index="item.path"
        v-for="item in routeList"
        :key="item.path"
      >
        <div class="img">
          <img src="@/assets/images/export@2x.png" alt="" />
        </div>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { constantRoutes } from "@/router";
export default {
  data() {
    return {
      routes: [],
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    routeList() {
      return constantRoutes.filter((v) => !v.hidden);
    },
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="scss" scoped>
.Sidebar {
  width: 220px;
  height: calc(100vh - 70px);
  .el-menu-vertical {
    width: 100%;
    height: 100%;
  }
  .el-menu-item {
    border-left: 3px solid #fff;
    .img {
      width: 16px;
      height: 16px;
      display: inline-block;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .el-menu-item:first-child {
    margin-top: 8px;
  }
  .is-active {
    background: #f3f9ff;
    font-size: 14px;
    color: #2b2f36;
    border-left: 3px solid #1890ff;
  }
}
</style>
