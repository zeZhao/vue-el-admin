<template>
  <!-- 账户迁移 -->
  <div class="MigrationUser">
    <el-button @click="MigrationUser">账户迁移</el-button>
    <el-dialog
      title="账户迁移"
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
        <el-form-item label="原账户编号：" prop="userId">
          <el-input
            v-model="form.userId"
            type="number"
            maxlength="6"
            @change="userInp"
          ></el-input>
        </el-form-item>
        <el-form-item label="条数：">
          <el-input v-model="form.succcountj" disabled></el-input>
        </el-form-item>
        <el-form-item label="原单价(分)：">
          <el-input v-model="form.uprice" disabled></el-input>
        </el-form-item>
        <el-form-item label="原消耗金额(元)：">
          <el-input v-model="form.proceeds" disabled></el-input>
        </el-form-item>
        <el-form-item label="修改后账户编号：" prop="updateUserId">
          <el-input
            v-model="form.updateUserId"
            maxlength="6"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="修改后单价(分)：" prop="updateUprice">
          <el-input-number
            v-model="form.updateUprice"
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
        userId: "",
        succcountj: "",
        uprice: "",
        proceeds: "",
        updateUserId: "",
        updateUprice: "",
      },
      rules: {
        month: [{ required: true, message: "请选择月份", trigger: "blur" }],
        userId: [
          { required: true, message: "请输入原账户编号", trigger: "blur" },
          { max: 6, message: "最多输入6个字符", trigger: ["blur", "change"] },
        ],
        updateUserId: [
          { required: true, message: "请输入修改后账户编号", trigger: "blur" },
          { max: 6, message: "最多输入6个字符", trigger: ["blur", "change"] },
        ],
        updateUprice: [
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
    userInp(val) {
      queryCountByUserIdOrGateway({ userId: val, month: this.form.month }).then(
        (res) => {
          if (res.code === 200) {
            this.form.uprice = res.data.uprice;
            this.form.succcountj = res.data.succcountj;
            this.form.proceeds = res.data.proceeds;
          }else{
            this.form.uprice = '';
            this.form.succcountj = '';
            this.form.proceeds = '';
          }
          
        }
      );
    },
    MigrationUser() {
      this.dialogFormVisible = true;
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if(this.form.succcountj){
            let form = Object.assign(this.form, { type: 4 });
            addTask(form).then((res) => {
              if (res.code === 200) {
                this.$message.success("修改成功！");
                this.dialogFormVisible = false;
              }
            });
          }else{
            this.$message.error("请输入正确的原账户编号");
          }
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.$refs["form"].resetFields();
      this.dialogFormVisible = false;
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped></style>
