<template>
  <div class="downloadCenter">
    <div class="search">
      <el-form :model="searchForm" :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchForm.createUser"
            placeholder="请输入账号"
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
            v-model="searchForm.downloadContent"
            placeholder="请输入内容"
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
      <el-table-column prop="createUser" label="导出账号" width="104">
      </el-table-column>
      <el-table-column prop="submitTime" label="导出时间" width="180">
      </el-table-column>
      <el-table-column prop="downloadNum" label="导出条数(万)" width="138">
      </el-table-column>
      <el-table-column prop="fileSize" label="大小(M)" width="109">
      </el-table-column>
      <el-table-column prop="downloadContent" label="导出内容">
      </el-table-column>
      <el-table-column prop="address" fixed="right" label="状态" width="120">
        <template slot-scope="{ row }">
          <el-link
            :underline="false"
            type="primary"
            v-show="row.status === 3"
            @click="downloadHandle(row)"
            >下载</el-link
          >
          <el-link :underline="false" type="primary" v-show="row.status === 2"
            >生成中...</el-link
          >
          <el-link :underline="false" type="primary" v-show="row.status === 1"
            >队列中</el-link
          >
          <el-link
            :underline="false"
            type="danger"
            v-show="row.status === 1"
            @click="cancelDownload(row)"
            >取消</el-link
          >
          <el-link :underline="false" type="danger" v-show="row.status === 4"
            >生成失败</el-link
          >
          <el-link :underline="false" type="info" v-show="row.status === 5"
            >已取消</el-link
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
import { queryByPage, download, cancelDownload } from "@/api/sysDownLoadLog";

export default {
  components: {},
  data() {
    return {
      searchForm: {
        createUser: "",
        downloadContent: "",
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
    downloadHandle(row) {
      const { id, createUser, submitTime } = row;
      let time = new Date(submitTime).Format("yyyyMMddhhmmss");
      download({ downloadLogId: id }).then((res) => {
        let blob = new Blob([res]);
        let url = window.URL.createObjectURL(blob);
        let aLink = document.createElement("a");
        aLink.style.display = "none";
        aLink.href = url;
        aLink.setAttribute("download", `${createUser}数据详单${time}.zip`);
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
        window.URL.revokeObjectURL(url);
      });
    },
    cancelDownload(row) {
      const { id } = row;
      cancelDownload({ id }).then((res) => {
        if (res.coed === 200) {
          this.$message.success("已取消生成~");
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
      const { time } = this.searchForm;
      let form = Object.assign(this.searchForm, {
        submitStartDate: time ? time[0] : "",
        submitEndDate: time ? time[1] : "",
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
