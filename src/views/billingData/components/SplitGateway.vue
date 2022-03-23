<template>
  <!-- 拆分通道数据 -->
  <div class="SplitGateway">
    <el-button type="primary" @click="splitData">拆分通道数据</el-button>
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
        <el-table-column prop="userId" label="通道编号">
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="!row.raw"
              v-model="tableData[$index].userId"
              placeholder="请输入通道编号"
            ></el-input>
            <span v-else>{{ row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="条数">
          <template slot-scope="{ row, $index }">
            <el-input-number
              v-if="!row.raw"
              v-model="tableData[$index].number"
              :step="1"
              :min="0"
              size="small"
            ></el-input-number>
            <!-- <el-input
              v-if="!row.raw"
              v-model="tableData[$index].number"
              placeholder="请输入条数"
            ></el-input> -->
            <span v-else>{{ row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="通道单价(分)">
          <template slot-scope="{ row, $index }">
            <!-- <el-input
              v-if="!row.raw"
              v-model="tableData[$index].price"
              placeholder="请输入单价"
            ></el-input> -->
            <el-input-number
              v-if="!row.raw"
              v-model="tableData[$index].price"
              :step="0.1"
              :min="0"
              size="small"
            ></el-input-number>
            <span v-else>{{ row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="consumptionSum" label="消耗金额(元)">
          <template slot-scope="{ row }">
            <span>{{ row.number * row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userId" label="" width="100">
          <template slot-scope="{ row, $index }">
            <el-button type="text" v-if="!row.raw" @click="deteleData($index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="addUser" v-if="addUserDisabled">添加通道</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提交任务</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    rawData: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      // 弹窗表格数据
      dialogVisible: false,
      tableData: [],
      newData: {
        dataState: "拆分数据",
        userId: "",
        number: "",
        price: "",
        consumptionSum: 0,
        raw: false, //表格初始数据标识
      },
      addUserDisabled: true,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    splitData() {
      if (Object.keys(this.rawData).length > 0) {
        this.tableData = [];
        let newData = {
          dataState: "拆分数据",
          userId: "",
          number: "",
          price: "",
          consumptionSum: 0,
          raw: false, //表格初始数据标识
        };
        this.tableData.push(
          Object.assign(this.rawData, { dataState: "原数据", raw: true })
        );
        this.tableData.push(newData);
        this.dialogVisible = true;
      } else {
        this.$message.error("请选择要拆分的通道数据");
      }
    },
    addUser() {
      let newData = {
        dataState: "拆分数据",
        userId: "",
        number: "",
        price: "",
        consumptionSum: 0,
        raw: false, //表格初始数据标识
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
      console.log(this.tableData, "-----");
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped></style>
