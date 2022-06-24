<template>
  <div class="detailed">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/billingData' }"
        >账单数据</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/taskManagement' }"
        >任务管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="link">
      <router-link to="/taskManagement">统计报表任务</router-link>
      <router-link to="/detailed" class="hover">明细报表任务</router-link>
    </div>

    <div class="search">
      <el-form :model="searchForm" :inline="true">
        <el-form-item label="月份：">
          <el-select v-model="searchForm.month">
            <el-option
              v-for="item in monthList"
              :key="item.id"
              :label="item.month"
              :value="item.month"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="oneClickGo" style="float: right" :disabled="oneClickDis"
          >一键执行</el-button
        >
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
        <el-table-column prop="id" label="任务ID" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="type" label="任务名称">
          <template slot-scope="{ row }">
            <span v-if="row.type == 1">拆分用户数据</span>
            <span v-if="row.type == 2">拆分网关数据</span>
            <span v-if="row.type == 3">通道迁移</span>
            <span v-if="row.type == 4">账户迁移</span>
            <span v-if="row.type == 5">添加数据</span>
            <span v-if="row.type == 6">修改用户单价</span>
            <span v-if="row.type == 7">修改通道单</span>
          </template>
        </el-table-column>
        <el-table-column prop="userId" label="账户编号" />
        <el-table-column prop="userName" label="账户名称" />
        <el-table-column prop="uprice" label="账户平均单价(分)" />
        <el-table-column prop="count" label="条数" />
        <el-table-column prop="gateway" label="通道编号" />
        <el-table-column prop="gatewayName" label="通道名称" />
        <el-table-column prop="gprice" label="通道平均单价(分)" />
        <el-table-column prop="updateUserId" label="修改后账户编号" />
        <el-table-column prop="updateUprice" label="更新的账户单价" />
        <el-table-column prop="updateGateway" label="更新的通道编号" />
        <el-table-column prop="updateGprice" label="更新的通道单价" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="{ row }">
            <span v-if="row.status === 0">待执行</span>
            <span v-if="row.status === 1">队列中</span>
            <span v-if="row.status === 2">执行中</span>
            <span v-if="row.status === 3">通过</span>
            <span v-if="row.status === 4">撤回</span>
            <span v-if="row.status === 5">失败</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="proceeds"
          label="操作"
          align="center"
          fixed="right"
        >
          <template slot-scope="{ row }">
            <el-popconfirm
              placement="bottom"
              :hide-icon="true"
              width="280"
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="是否确定撤销？"
              v-model="revokeVisible"
              @confirm="confirmRevoke(row)"
              @cancel="revokeVisible = false"
            >
              <el-button
                slot="reference"
                type="text"
                :disabled="row.status !== 0"
                @click="revokeVisible = true"
                >撤销</el-button
              >
            </el-popconfirm>
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
import {
  selectTask,
  selectTaskDetail,
  getMonthUnLock,
  addTasksToWaiting,
  updateStatusDetail,
  doDetailTask,
} from "@/api/billingData";

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
      tableData: [{ month: 1 }],
      total: 0,
      rawData: {},
      monthList: [],
      executeVisible: false,
      revokeVisible: false,
      //一键执行禁用
      oneClickDis:true
    };
  },
  created() {},
  async mounted() {
    await this.getMonthList();
    this.getQueryByPage();
    // this.getSelectTask();
  },
  computed: {},
  methods: {
    //执行
    confirmExecute(row) {
      addTasksToWaiting({ ...row }).then((res) => {
        if (res.code === 200) {
          this.$message.success("操作成功");
          this.getQueryByPage();
        }
      });
    },
    //撤销
    confirmRevoke(row) {
      updateStatusDetail({ ...row }).then((res) => {
        if (res.code === 200) {
          this.$message.success("操作成功");
          this.getQueryByPage();
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
      selectTaskDetail(form).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.tableData.forEach((item) => {
            if (item.createTime) {
              item.createTime = new Date(item.createTime).Format(
                "yyyy-MM-dd hh:mm:ss"
              );
            }
            
          });
          this.oneClickDis = !this.tableData.some(item => item.status == 0)
        }
      });
    },
    // getSelectTask() {
    //   let form = Object.assign(this.searchForm);
    //   selectTask(form).then((res) => {
    //     if (res.code === 200) {
    //       this.oneClickDis = res.data.list.every(item => item.status == 0 || item.status == 1 || item.status == 2)       }
    //   });
    // },
    onSubmit() {
      this.getQueryByPage();
    },
    //一键执行
    oneClickGo() {
      this.$confirm("是否确定执行全部明细任务？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          doDetailTask({ month: this.searchForm.month }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              this.getQueryByPage()
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
  },
  watch: {},
};
</script>
<style lang="scss">
.el-message-box {
  width: 420px !important;
  padding: 24px !important;
  box-sizing: border-box;
}

.el-message-box__header,
.el-message-box__content,
.el-message-box__btns {
  padding: 0;
}
.el-message-box__content {
  margin-bottom: 32px;
}
.el-message-box__close {
  display: none;
}
</style>
<style lang="scss" scoped>
.detailed {
  .el-breadcrumb {
    // padding: 24px 24px;
    // background: red;
    margin-top: -12px;
    font-size: 16px;
    margin-bottom: 12px;
  }
  .link {
    margin-bottom: 16px;
    a {
      margin-right: 24px;
      color: #1f2329;
      text-decoration: none;
      padding-bottom: 8px;
    }
    .hover {
      color: #1890ff;
      border-bottom: 3px solid #1890ff;
    }
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
