<template>
  <div class="downloadCenter">
    <div class="search">
      <el-form :model="searchForm" :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchForm.operator"
            placeholder="请输入发送账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="searchForm.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="searchForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="searchForm.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 10px"
      :header-cell-style="{
        background: '#FAFAFA',
        borderBottom: '1px solid #fff',
      }"
      highlight-current-row
    >
      <el-table-column prop="operator" label="发送账号" width="104">
      </el-table-column>
      <el-table-column prop="sendTime" label="发送时间" width="180">
      </el-table-column>
      <el-table-column prop="email" label="发送邮箱" width="138">
      </el-table-column>
      <el-table-column prop="mobile" label="发送手机号" width="138">
      </el-table-column>
      <el-table-column prop="content" label="发送内容" tooltip-effect>
      </el-table-column>
      <el-table-column prop="exportTime" label="导出时间" tooltip-effect>
      </el-table-column>
      <el-table-column prop="address" fixed="right" label="状态" width="120">
        <template slot-scope="{ row }">
          <el-link :underline="false" type="primary" v-show="row.status === 1"
            >成功</el-link
          >
          <el-link :underline="false" type="danger" v-show="row.status === 2"
            >失败</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next"
      :total="total"
      :current-page.sync="searchForm.pageNumber"
      :page-size="searchForm.pageSize"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { queryByPage } from "@/api/sendReturnReport";

export default {
  components: {},
  data() {
    return {
      searchForm: {
        operator: "",
        mobile: "",
        email: "",
        time: [],
        pageNumber: 1,
        pageSize: 10,
      },
      //表格数据
      tableData: [],
      total: 0,
    };
  },
  created() {},
  mounted() {
    this.getQueryByPage();
  },
  computed: {},
  methods: {
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
      const { time } = this.searchForm;
      let form = Object.assign(this.searchForm, {
        startTime: time ? time[0] : "",
        endTime: time ? time[1] : "",
      });
      queryByPage(form).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.tableData.forEach((item) => {
            if (item.submitTime) {
              item.submitTime = new Date(item.submitTime).Format(
                "yyyy-MM-dd hh:mm:ss"
              );
            }
          });
        }
      });
    },
    onSubmit() {
      this.getQueryByPage();
      console.log("submit!");
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.downloadCenter {
  padding: 24px 24px;
  background: #fff;

  .el-pagination {
    text-align: right;
    margin-top: 28px;
    // padding-bottom: 28px;
  }
  .el-link {
    padding-right: 12px;
    text-decoration: none;
  }
}
</style>
