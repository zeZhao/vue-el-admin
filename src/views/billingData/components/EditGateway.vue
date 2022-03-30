<template>
  <!-- 修改通道单价 -->
  <div class="EditGateway">
    <el-button @click="MigrationUser">修改通道单价</el-button>
    <el-dialog
      title="修改通道单价"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form" :label-width="formLabelWidth" :rules="rules">
        <el-form-item label="月份：" prop="month">
          <el-select v-model="form.month" placeholder="请选择月份">
            <el-option
              v-for="item in monthList"
              :key="item.id"
              :label="item.month"
              :value="item.month"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通道编号：" prop="gateway">
          <el-input
            v-model="form.gateway"
            type="number"
            maxlength="6"
            @change="userInp"
          ></el-input>
        </el-form-item>
        <el-form-item label="条数：">
          <el-input v-model="form.succcountj" disabled></el-input>
        </el-form-item>
        <el-form-item label="原单价(分)：">
          <el-input v-model="form.gprice" disabled></el-input>
        </el-form-item>
        <el-form-item label="原成本金额(元)：">
          <el-input v-model="form.cost" disabled></el-input>
        </el-form-item>
        <el-form-item label="修改后单价(分)：" prop="updateGprice">
          <el-input-number
            v-model="form.updateGprice"
            :step="0.1"
            :min="0"
            size="small"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="修改后成本(元)：">
          <!-- <el-input v-model="form.updateGateway"></el-input> -->
          <!-- <el-input v-model="form.proceeds"></el-input> -->
          <span>{{ form.succcountj * form.updateGprice }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提交任务</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryCountByUserIdOrGateway, addTask } from "@/api/billingData";
export default {
  components: {},
  props: {
    monthList: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        month: "",
        gateway: "",
        succcountj: 0,
        gprice: 0,
        cost: 0,
        updateGprice: 0,
        proceeds: 0,
      },
      rules: {
        month: [{ required: true, message: "请选择月份", trigger: "blur" }],
        gateway: [
          { required: true, message: "请输入原通道编号", trigger: "blur" },
          { max: 6, message: "最多输入6个字符", trigger: ["blur", "change"] },
        ],
        updateGprice: [
          { required: true, message: "请输入修改后单价(分)", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    userInp(val) {
      queryCountByUserIdOrGateway({
        gateway: val,
        month: this.form.month,
      }).then((res) => {
        if (res.code === 200) {
          this.form.gprice = res.data.gprice;
          this.form.succcountj = res.data.succcountj;
          this.form.cost = res.data.cost;
        }
      });
    },
    MigrationUser() {
      this.dialogFormVisible = true;
    },
    submit() {
      let form = Object.assign(this.form, { type: 7 });
      addTask(form).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功！");
          this.dialogFormVisible = false;
        }
      });
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped></style>
