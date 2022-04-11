<template>
  <div id="app">
    <div class="layout">
      <NavMenu></NavMenu>
      <div class="content">
        <div class="content_side">
          <Sidebar></Sidebar>
        </div>
        <div class="content_cnt">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Layout from "@/layout/index.vue";
import NavMenu from "@/layout/components/NavMenu/index.vue";
import Sidebar from "@/layout/components/Sidebar/index.vue";
export default {
  components: { Layout, NavMenu, Sidebar },
};
</script>

<style lang="scss">
#app {
  height: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
}
</style>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  .content {
    background: #fff;
    position: relative;
    height: calc(100vh - 64px);
    overflow-y: auto;
    // min-height: 100%;
    .content_side {
      width: 220px;
      height: calc(100vh - 64px);
      float: left;
      position: relative;
    }
    .content_cnt {
      min-height: 100%;
      // min-height: calc(100vh - 110px);
      margin-left: 220px;
      position: relative;
      background: #f8f9fa;
      padding: 16px;
      .content_view {
        height: 100%;
      }

      ::v-deep .el-button {
        min-width: 92px;
        height: 32px;
        padding: 7px 20px;
      }
      ::v-deep .el-button--primary {
        background-color: #1890ff;
        border-color: #1890ff;
      }
      ::v-deep .el-form-item__content {
        line-height: 32px;
      }
      ::v-deep .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
      ::v-deep .el-form-item__label {
        padding: 0 !important;
      }
      ::v-deep .el-input__icon {
        height: auto;
        line-height: 32px;
      }
      ::v-deep .el-date-editor .el-range-separator {
        height: auto;
      }
    }
  }
}
</style>
