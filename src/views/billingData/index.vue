<template>
  <div class="downloadCenter">
    <div class="search">
      <el-form :model="searchForm" :inline="true">
        <el-form-item label="账户编号：">
          <el-input
            v-model="searchForm.userId"
            placeholder="请输入账户编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="账户名称：">
          <el-input
            v-model="searchForm.userName"
            placeholder="请输入账户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="通道编号：">
          <el-input
            v-model="searchForm.gateway"
            placeholder="请输入通道编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商名称：">
          <el-input
            v-model="searchForm.CorpGatewayName"
            placeholder="请输入供应商名称"
          ></el-input>
        </el-form-item>
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
      <div class="handle">
        <SplitUser
          :rawData="{ userId: 666, number: 666, price: 2, consumptionSum: 0 }"
        ></SplitUser>
        <SplitGateway
          :rawData="{ userId: 666, number: 666, price: 2, consumptionSum: 0 }"
        ></SplitGateway>
        <MigrationUser></MigrationUser>
        <MigrationGateway></MigrationGateway>
        <AddData></AddData>
        <EditUser></EditUser>
        <EditGateway></EditGateway>
        <DataManagement></DataManagement>
        <router-link to="/taskManagement"
          ><el-button>任务管理</el-button></router-link
        >
      </div>

      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 10px"
        :header-cell-style="{
          background: '#FAFAFA',
          borderBottom: '1px solid #fff',
        }"
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="month" label="月份" />
        <el-table-column prop="userid" label="账户编号" />
        <el-table-column prop="userName" label="账户名称" />
        <el-table-column prop="corpName" label="商户名称" />
        <el-table-column prop="uprice" label="账户平均单价(分)" />
        <el-table-column prop="gateway" label="通道编号" />
        <el-table-column prop="gatewayName" label="通道名称" />
        <el-table-column prop="corpGatewayName" label="供应商名称" />
        <el-table-column prop="gprice" label="通道平均单价(分)" />
        <el-table-column prop="count" label="消耗条数" />
        <el-table-column prop="proceeds" label="消耗金额(元)" />
        <el-table-column prop="cost" label="成本(元)" />
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
import SplitUser from "./components/SplitUser.vue";
import SplitGateway from "./components/SplitGateway.vue";
import MigrationUser from "./components/MigrationUser.vue";
import MigrationGateway from "./components/MigrationGateway.vue";
import AddData from "./components/AddData.vue";
import EditUser from "./components/EditUser.vue";
import EditGateway from "./components/EditGateway.vue";
import DataManagement from "./components/DataManagement.vue";
import { selectDate, getMonth } from "@/api/billingData";

export default {
  components: {
    SplitUser,
    SplitGateway,
    MigrationUser,
    MigrationGateway,
    AddData,
    EditUser,
    EditGateway,
    DataManagement,
  },
  data() {
    return {
      searchForm: {
        userId: "",
        userName: "",
        gateway: "",
        CorpGatewayName: "",
        month: "",
        pageNumber: 1,
        pageSize: 10,
      },
      //表格数据
      tableData: [
        { createUser: "484237" },
        { createUser: "484237" },
        { createUser: "484237" },
        { createUser: "484237" },
        { createUser: "484237" },
        { createUser: "484237" },
      ],
      total: 0,
      rawData: {},
      monthList: [],
    };
  },
  created() {},
  mounted() {
    this.getQueryByPage();
  },
  computed: {},
  methods: {
    getMonthList() {
      getMonth().then((res) => {
        if (res.code === 200) {
          this.monthList = res.data.list;
        }
      });
    },
    handleSelectionChange(val) {
      console.log(val, "-------");
      this.rawData = val;
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
.downloadCenter {
  // padding: 24px 24px;
  // background: red;
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
