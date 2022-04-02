<template>
  <!-- 通道迁移 -->
  <div class="MigrationGateway">
    <el-button @click="MigrationUser">通道迁移</el-button>
    <el-dialog
      title="通道迁移"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :model="form"
        :label-width="formLabelWidth"
        :rules="rules"
        ref="form"
      >
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
        <el-form-item label="原通道编号：" prop="gateway">
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
        <el-form-item label="修改后通道编号：" prop="updateGateway">
          <el-input
            v-model="form.updateGateway"
            maxlength="6"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="修改后单价(分)：" prop="updateGprice">
          <el-input-number
            v-model="form.updateGprice"
            :step="0.1"
            :min="0"
            size="small"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
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
        succcountj: "",
        gprice: "",
        cost: "",
        updateGateway: "",
        updateGprice: "",
      },
      rules: {
        month: [{ required: true, message: "请选择月份", trigger: "blur" }],
        gateway: [
          { required: true, message: "请输入原通道编号", trigger: "blur" },
          { max: 6, message: "最多输入6个字符", trigger: ["blur", "change"] },
        ],
        updateGateway: [
          { required: true, message: "请输入修改后通道编号", trigger: "blur" },
          { max: 6, message: "最多输入6个字符", trigger: ["blur", "change"] },
        ],
        updateGprice: [
          { required: true, message: "请输入修改后单价(分)", trigger: "blur" },
        ],
      },
      formLabelWidth: "130px",
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    cancel() {
      this.$refs["form"].resetFields();
      this.dialogFormVisible = false;
    },
    userInp(val) {
      queryCountByUserIdOrGateway({
        gateway: val,
        month: this.form.month,
      }).then((res) => {
        if (res.code === 200) {
          this.form.cost = res.data.cost;
          this.form.succcountj = res.data.succcountj;
          this.form.gprice = res.data.gprice;
        }
      });
    },
    MigrationUser() {
      this.dialogFormVisible = true;
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let form = Object.assign(this.form, { type: 3 });
          addTask(form).then((res) => {
            if (res.code === 200) {
              this.$message.success("修改成功！");
              this.dialogFormVisible = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped></style>
