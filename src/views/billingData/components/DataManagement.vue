<template>
  <!-- 数据管理 -->
  <div class="DataManagement">
    <el-button type="primary" @click="MigrationUser">数据管理</el-button>
    <el-dialog title="数据管理" :visible.sync="dialogFormVisible">
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
        <el-table-column prop="cost" label="状态">
          <template slot-scope="{ row }">
            <span v-if="row.status === 1">锁定</span>
            <span v-if="row.status === 2">解锁</span>
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" v-if="row.status === 1">锁定</el-button>
            <el-button type="text" v-if="row.status === 2">解锁</el-button>
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
import { getMonth } from "@/api/billingData";
export default {
  components: {},
  data() {
    return {
      //表格数据
      tableData: [
        { createUser: "484237" },
        { createUser: "484237" },
        { createUser: "484237" },
        { createUser: "484237" },
        { createUser: "484237" },
        { createUser: "484237" },
      ],
      pageNumber: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    MigrationUser() {
      this.dialogFormVisible = true;
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
      getMonth().then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped></style>
