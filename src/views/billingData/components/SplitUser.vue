<template>
  <!-- 拆分账户数据 -->
  <div class="SplitUser">
    <el-button @click="splitData">拆分账户数据</el-button>
    <el-dialog
      title="提示"
      width="80%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
    >
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 10px"
        highlight-current-row
      >
        <el-table-column prop="dataState" label="数据状态" width="100" />
        <el-table-column prop="userId" label="账户编号">
          <template slot-scope="{ row, $index }">
            <el-input
              type="number"
              v-if="!row.raw"
              v-model="tableData[$index].userId"
              placeholder="请输入账户编号"
            ></el-input>
            <span v-else>{{ row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="条数">
          <template slot-scope="{ row, $index }">
            <el-input-number
              v-if="!row.raw"
              v-model="tableData[$index].count"
              :step="1"
              :min="0"
              size="small"
            ></el-input-number>
            <!-- <el-input
              v-if="!row.raw"
              v-model="tableData[$index].number"
              placeholder="请输入条数"
            ></el-input> -->
            <span v-else>{{ row.count }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uprice" label="账户单价(分)">
          <template slot-scope="{ row, $index }">
            <!-- <el-input
              v-if="!row.raw"
              v-model="tableData[$index].price"
              placeholder="请输入单价"
            ></el-input> -->
            <el-input-number
              v-if="!row.raw"
              v-model="tableData[$index].uprice"
              :step="0.1"
              :precision="2"
              :min="0"
              size="small"
            ></el-input-number>
            <span v-else>{{ row.uprice }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="proceeds" label="消耗金额(元)">
          <template slot-scope="{ row }">
            <span>{{ row.count * row.uprice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="" width="100">
          <template slot-scope="{ row, $index }">
            <el-button type="text" v-if="!row.init" @click="deteleData($index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="addUser" v-if="addUserDisabled">添加账户</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提交任务</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addTasks } from "@/api/billingData";
export default {
  props: {
    rawData: {
      type: [Array, Object],
      required: true,
    },
  },
  components: {},
  data() {
    return {
      // 弹窗表格数据
      dialogVisible: false,
      tableData: [],
      addUserDisabled: true,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    splitData() {
      if (this.rawData.length === 1) {
        this.tableData = [];
        let newData = {
          dataState: "拆分数据",
          userId: "",
          count: "",
          uprice: "",
          proceeds: 0,
          raw: false, //表格初始数据标识
          init: true,
        };
        this.tableData.push(
          Object.assign(this.rawData[0], {
            dataState: "原数据",
            raw: true,
            init: true,
          })
        );
        this.tableData.push(newData);
        this.dialogVisible = true;
      } else {
        this.$message.error("请选择要拆分的账户数据");
      }
    },
    addUser() {
      let newData = {
        dataState: "拆分数据",
        userId: "",
        count: "",
        uprice: "",
        proceeds: 0,
        raw: false, //表格初始数据标识
        init: false,
      };
      this.tableData.push(newData);
      //最多添加15个拆分数据
      if (this.tableData.length === 16) {
        this.addUserDisabled = false;
      }
    },
    deteleData(index) {
      this.tableData.splice(index, 1);
      if (this.tableData.length < 16) {
        this.addUserDisabled = true;
      }
    },
    submit() {
      let isNull = this.tableData
        .filter((v) => !v.raw)
        .every((item) => item.userId && item.count && item.uprice);

      if (isNull) {
        let counts = 0;
        const { count } = this.tableData[0];
        this.tableData
          .filter((v) => !v.raw)
          .forEach((item) => {
            counts += item.count;
          });
        if (counts < count) {
          let data = {
            ...this.tableData[0],
            type: 1,
            data: this.tableData.filter((v) => !v.raw),
          };
          addTasks(data).then((res) => {
            if (res.code === 200) {
              this.$message.success("拆分成功！");
              this.dialogVisible = false;
            }
          });
        } else {
          this.$message.error("已超过原数据条数！");
        }
      } else {
        this.$message.error("请填写拆分数据");
      }
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped></style>
