<template>
  <!-- 数据管理 -->
  <div class="DataManagement">
    <el-button type="primary" @click="MigrationUser">数据管理</el-button>
    <el-dialog
      title="数据管理"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 10px; margin-bottom: 16px"
        :header-cell-style="{
          background: '#FAFAFA',
          borderBottom: '1px solid #fff',
        }"
        highlight-current-row
        v-loading="loading"
      >
        <el-table-column prop="month" label="月份" />
        <el-table-column prop="cost" label="状态">
          <template slot-scope="{ row }">
            <span v-if="row.status === 0">已锁定</span>
            <span v-if="row.status === 1">编辑中</span>
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="操作">
          <template slot-scope="{ row, $index }">
            <el-button
              type="text"
              v-if="row.status === 1"
              @click="lock(row, $index)"
              >锁定</el-button
            >
            <el-button
              type="text"
              v-if="row.status === 0"
              @click="lock(row, $index)"
              >解锁</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page.sync="pageNumber"
        :page-size="pageSize"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import { getMonth, updateMonthLock } from "@/api/billingData";
export default {
  components: {},
  data() {
    return {
      //表格数据
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      loading: false,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    lock(row, index) {
      this.loading = true;
      const { id, status } = row;
      let statu = status === 0 ? 1 : 0;
      updateMonthLock({ status: statu, id: id }).then((res) => {
        if (res.code === 200) {
          this.$message.success("操作成功");
          this.getQueryByPage();
        }
        this.loading = false;
      });
    },
    MigrationUser() {
      this.dialogFormVisible = true;
      this.getQueryByPage();
    },
    sizeChange(val) {
      this.pageSize = val;
      this.pageNumber = 1;
      this.getQueryByPage();
    },
    currentChange(val) {
      this.pageNumber = val;
      this.getQueryByPage();
    },
    getQueryByPage() {
      this.loading = true;
      getMonth({ pageNumber: this.pageNumber, pageSize: this.pageSize }).then(
        (res) => {
          if (res.code === 200) {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
          this.loading = false;
        }
      );
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped></style>
