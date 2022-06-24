<template>
  <div class="downloadCenter">
    <div class="search">
      <el-form :model="searchForm" :inline="true">
        <el-form-item label="账户编号：">
          <el-input
            v-model="searchForm.userId"
            clearable
            maxlength="6"
            placeholder="请输入账户编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="账户名称：">
          <el-input
            v-model="searchForm.userName"
            clearable
            placeholder="请输入账户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="通道编号：">
          <el-input
            v-model="searchForm.gateway"
            clearable
            placeholder="请输入通道编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商名称：">
          <el-input
            clearable
            v-model="searchForm.corpGatewayName"
            placeholder="请输入供应商名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="月份：">
          <el-select v-model="searchForm.month" clearable>
            <el-option
              v-for="item in monthList"
              :key="item.id"
              :label="item.month"
              :value="item.month"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form>
    </div>
    <div class="content">
      <div class="handle">
        <div class="left">
          <SplitUser :rawData="rawData"></SplitUser>
          <SplitGateway :rawData="rawData"></SplitGateway>
          <MigrationGateway :monthList="monthList"></MigrationGateway>
          <MigrationUser :monthList="monthList"></MigrationUser>
          <AddData :monthList="monthList"></AddData>
          <EditUser :monthList="monthList"></EditUser>
          <EditGateway :monthList="monthList"></EditGateway>
        </div>

        <div class="right">
          <router-link to="/taskManagement">
            <el-button type="primary">任务管理</el-button>
          </router-link>
          <DataManagement @updataMonth="updataMonth"></DataManagement>
        </div>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 24px"
        :header-cell-style="{
          background: '#FAFAFA',
          borderBottom: '1px solid #fff',
        }"
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="countDate" label="月份" />
        <el-table-column prop="userId" label="账户编号" />
        <el-table-column prop="userName" label="账户名称" />
        <el-table-column prop="corpName" label="商户名称" />
        <el-table-column prop="uprice" label="账户平均单价(分)" />
        <el-table-column prop="gateway" label="通道编号" />
        <el-table-column prop="gatewayName" label="通道名称" />
        <el-table-column prop="corpGatewayName" label="供应商名称" />
        <el-table-column prop="gprice" label="通道平均单价(分)" />
        <el-table-column prop="succcountj" label="消耗条数" />
        <el-table-column prop="proceeds" label="消耗金额(元)" />
        <el-table-column prop="cost" label="成本(元)" />
      </el-table>
      <p class="statistics">
        共计消耗条数: <span>{{ statistics.succcountj }} 条</span> ，消耗金额:
        <span>{{ statistics.proceeds }} 元</span>，成本:
        <span>{{ statistics.cost }} 元</span>
      </p>
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
import SplitUser from "./components/SplitUser";
import SplitGateway from "./components/SplitGateway.vue";
import MigrationUser from "./components/MigrationUser.vue";
import MigrationGateway from "./components/MigrationGateway.vue";
import AddData from "./components/AddData.vue";
import EditUser from "./components/EditUser.vue";
import EditGateway from "./components/EditGateway.vue";
import DataManagement from "./components/DataManagement.vue";
import {
  selectDate,
  getMonthUnLock,
  selectDateAmount,
} from "@/api/billingData";

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
        corpGatewayName: "",
        month: "",
        pageNumber: 1,
        pageSize: 10,
      },
      //表格数据
      tableData: [],
      total: 0,
      rawData: {},
      monthList: [],
      statistics: {
        cost: 0,
        succcountj: 0,
        proceeds: 0,
      },
    };
  },
  created() {},
  async mounted() {
    await this.getMonthList();
    this.getQueryByPage();
    this.selectDateAmount();
  },
  computed: {},
  methods: {
    //更新月份
    updataMonth(){
      this.getMonthList()
    },
    selectDateAmount() {
      selectDateAmount(this.searchForm).then((res) => {
        if (res.code === 200) {
          const { proceeds, cost, succcountj } = res.data;
          this.statistics.cost = cost;
          this.statistics.proceeds = proceeds;
          this.statistics.succcountj = succcountj;
        }else{
          this.statistics.cost = 0;
          this.statistics.proceeds = 0;
          this.statistics.succcountj = 0;
        }
      });
    },
    async getMonthList() {
      await getMonthUnLock().then((res) => {
        if (res.code === 200) {
          this.monthList = res.data;
          this.searchForm.month = this.monthList[0].month;
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
      this.selectDateAmount();
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.downloadCenter {
  ::v-deep .el-dialog {
    padding: 24px;
  }
  ::v-deep .el-dialog__body {
    padding: 24px 0;
  }
  ::v-deep .el-dialog__header,
  ::v-deep .el-dialog__footer {
    padding: 0;
  }
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
    .statistics {
      margin-top: 16px;
      font-size: 16px;
      color: #646a73;
      span {
        color: #1f2329;
      }
    }
    .el-pagination {
      text-align: right;
      margin-top: 25px;
      // padding-bottom: 28px;
    }
    .handle {
      display: flex;
      justify-content: space-between;
      ::v-deep .el-button {
        margin-right: 10px;
      }
      ::v-deep .el-form-item__label {
        height: 32px;
        line-height: 32px;
      }

      .right,
      .left {
        display: flex;
      }
    }
  }

  ::v-deep .el-input-number--small {
    width: auto;
  }
}
.AddData,
.EditGateway,
.EditUser,
.MigrationGateway,
.MigrationUser {
  ::v-deep .el-form {
    width: 473px;
    margin: 0 auto;
  }
  ::v-deep .el-form-item__content {
    width: 292px;
    .el-select,
    .el-input-number--small {
      width: 100%;
    }
  }
}
</style>
