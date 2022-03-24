<template>
  <div class="taskManagement">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/billingData' }"
        >账单数据</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/taskManagement' }"
        >任务管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="search">
      <el-form :model="searchForm" :inline="true">
        <el-form-item label="月份：">
          <el-select v-model="searchForm.month">
            <el-option
              v-for="item in monthList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 10px"
        :header-cell-style="{
          background: '#FAFAFA',
          borderBottom: '1px solid #fff',
        }"
        highlight-current-row
      >
        <el-table-column prop="month" label="月份" />
        <el-table-column prop="month" label="任务ID" />
        <el-table-column prop="month" label="创建时间" />
        <el-table-column prop="month" label="任务名称" />
        <el-table-column prop="userid" label="账户编号" />
        <el-table-column prop="userName" label="账户名称" />
        <el-table-column prop="userName" label="账户平均单价(分)" />
        <el-table-column prop="userName" label="条数" />
        <el-table-column prop="gateway" label="通道编号" />
        <el-table-column prop="gatewayName" label="通道名称" />
        <el-table-column prop="gprice" label="通道平均单价(分)" />
        <el-table-column prop="gprice" label="修改后账户编号" />
        <el-table-column prop="gprice" label="更新的账户单价" />
        <el-table-column prop="gprice" label="更新的通道编号" />
        <el-table-column prop="gprice" label="更新的通道单价" />
        <el-table-column prop="count" label="状态" />
        <el-table-column
          prop="proceeds"
          label="操作"
          align="center"
          fixed="right"
        >
          <template slot-scope="{ row }">
            <el-popover placement="top" width="160" v-model="executeVisible">
              <p>是否确定执行？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="executeVisible = false"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="executeVisible = false"
                  >确定</el-button
                >
              </div>
              <el-button
                slot="reference"
                type="text"
                @click="executeVisible = true"
                >执行</el-button
              >
            </el-popover>
            <el-popover placement="top" width="160" v-model="revokeVisible">
              <p>是否确定撤销？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="revokeVisible = false"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="revokeVisible = false"
                  >确定</el-button
                >
              </div>
              <el-button
                slot="reference"
                type="text"
                @click="revokeVisible = true"
                >撤销</el-button
              >
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page.sync="searchForm.pageNumber"
        :page-size="searchForm.pageSize"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { selectDate, getMonthUnLock } from "@/api/billingData";

export default {
  components: {},
  data() {
    return {
      searchForm: {
        month: "",
        pageNumber: 1,
        pageSize: 10,
      },
      //表格数据
      tableData: [],
      total: 0,
      rawData: {},
      monthList: [],
      executeVisible: false,
      revokeVisible: false,
    };
  },
  created() {},
  mounted() {
    this.getMonthList();
  },
  computed: {},
  methods: {
    getMonthList() {
      getMonthUnLock().then((res) => {
        if (res.code === 200) {
          this.monthList = res.data;
          this.searchForm.month = this.monthList[0].month;
        }
      });
    },
    sizeChange(val) {
      this.searchForm.pageSize = val;
      this.searchForm.pageNumber = 1;
      this.getQueryByPage();
    },
    currentChange(val) {
      this.searchForm.pageNumber = val;
      this.getQueryByPage();
    },
    getQueryByPage() {
      let form = Object.assign(this.searchForm);
      selectDate(form).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
          // this.tableData.forEach((item) => {
          //   if (item.submitTime) {
          //     item.submitTime = new Date(item.submitTime).Format(
          //       "yyyy-MM-dd hh:mm:ss"
          //     );
          //   }
          // });
        }
      });
    },
    onSubmit() {
      this.getQueryByPage();
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.taskManagement {
  // padding: 24px 24px;
  // background: red;
  .el-breadcrumb {
    margin-top: -12px;
    font-size: 16px;
    margin-bottom: 12px;
  }
  .search {
    margin-bottom: 16px;
    padding: 24px 24px;
    background: #fff;
    border-radius: 2px;
    ::v-deep .el-form-item {
      height: 32px;
      line-height: 32px;
      border: 1px solid rgba(31, 35, 41, 0.15);
      border-radius: 4px;
      padding-left: 12px !important;
      margin-bottom: 0 !important;
    }
    ::v-deep .el-form-item__label {
      height: 32px;
      line-height: 32px;
    }
    ::v-deep .el-input__inner {
      border: none;
    }
  }
  .content {
    padding: 24px 24px;
    background: #fff;
    border-radius: 4px;
    .el-pagination {
      text-align: right;
      margin-top: 28px;
      // padding-bottom: 28px;
    }
    .handle {
      display: flex;
      ::v-deep .el-button {
        margin-right: 10px;
      }
    }
  }

  ::v-deep .el-input-number--small {
    width: auto;
  }
}
</style>
