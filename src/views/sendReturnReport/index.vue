<template>
  <div class="downloadCenter">
    <div class="search">
      <el-form
        :model="searchForm"
        ref="searchForm"
        :inline="true"
        label-width="80px"
      >
        <el-form-item label="账户编号：">
          <el-input
            v-model="searchForm.userid"
            maxlength="6"
            placeholder="请输入账户编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input
            v-model="searchForm.mobile"
            maxlength="11"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="通道编号：">
          <el-input
            v-model="searchForm.gateway"
            maxlength="5"
            placeholder="请输入通道编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-input
            v-model="searchForm.status"
            maxlength="10"
            placeholder="请输入状态"
          ></el-input>
        </el-form-item>
        <el-form-item label="月份：">
          <el-date-picker
            v-model="searchForm.year"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择月"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发送日期：">
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onReset('searchForm')"
            >重置</el-button
          >
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
      <el-table-column prop="corporateid" label="商户编号"> </el-table-column>
      <el-table-column prop="userid" label="账户编号"> </el-table-column>
      <el-table-column prop="username" label="账户名称"> </el-table-column>
      <el-table-column prop="code" label="特服号"> </el-table-column>
      <el-table-column prop="content" label="内容"> </el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column prop="province" label="省份"> </el-table-column>
      <el-table-column prop="operaid" label="运营商">
        <template slot-scope="{ row }">
          <span v-if="row.operaid == 0">非法</span>
          <span v-if="row.operaid == 1">移动</span>
          <span v-if="row.operaid == 2">联通</span>
          <span v-if="row.operaid == 3">电信</span>
          <span v-if="row.operaid == 4">国际</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="gateway" label="通道"> </el-table-column>
      <el-table-column prop="submittime" label="提交时间"> </el-table-column>
      <el-table-column prop="createtime" label="发送时间"> </el-table-column>
      <el-table-column prop="returntime" label="返回报告时间">
      </el-table-column>
      <el-table-column prop="receivetime" label="手机接收时间">
      </el-table-column>
      <el-table-column prop="statusj" label="通道状态"> </el-table-column>
      <el-table-column prop="cid" label="CID"> </el-table-column>
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
        userid: "",
        gateway: "",
        mobile: "",
        status: "",
        year: "",
        time: [],
        pageNumber: 1,
        pageSize: 10,
      },
      //表格数据
      tableData: [],
      total: 0,
    };
  },
  created() {
    // this.searchForm.year = this.getLastMonth();
    this.searchForm.year = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    );
  },
  mounted() {
    this.getQueryByPage();
  },
  computed: {},
  methods: {
    getLastMonth() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      if (month === 0) {
        year = year - 1;
        month = 12;
      }
      return `${year}:${month}`;
    },
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
        stratTime: time ? time[0] : "",
        endTime: time ? time[1] : "",
      });
      queryByPage(form).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.tableData.forEach((item) => {
            item.createtime = new Date(item.createtime).Format(
              "yyyy-MM-dd hh:mm:ss"
            );
            item.receivetime = new Date(item.receivetime).Format(
              "yyyy-MM-dd hh:mm:ss"
            );
            item.returntime = new Date(item.returntime).Format(
              "yyyy-MM-dd hh:mm:ss"
            );
            item.submittime = new Date(item.submittime).Format(
              "yyyy-MM-dd hh:mm:ss"
            );
          });
        }
      });
    },
    onSubmit() {
      this.getQueryByPage();
    },
    onReset(formName) {
      for (let key in this.searchForm) {
        if (key !== "pageSize" || key !== "pageNumber") {
          if (key === "time") {
            this.searchForm[key] = [];
          } else {
            this.searchForm[key] = "";
          }
        }
      }
      // this.$refs[formName].resetFields();
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
