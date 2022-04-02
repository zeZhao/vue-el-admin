<template>
  <!-- 添加数据 -->
  <div class="AddData">
    <el-button @click="MigrationUser">添加数据</el-button>
    <el-dialog
      title="添加数据"
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
        <el-form-item label="账户编号：" prop="userId">
          <el-input
            v-model="form.userId"
            type="number"
            maxlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item label="条数：" prop="succcountj">
          <el-input-number
            v-model="form.succcountj"
            :step="1"
            :min="0"
            size="small"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="账户单价(分)：" prop="uprice">
          <el-input-number
            v-model="form.uprice"
            :step="0.1"
            :min="0"
            size="small"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="通道编号：" prop="gateway">
          <el-input
            v-model="form.gateway"
            type="number"
            maxlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item label="通道单价(分)：" prop="gprice">
          <el-input-number
            v-model="form.gprice"
            :step="0.1"
            :min="0"
            size="small"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="消耗金额(元)：">
          <span>{{ form.succcountj * form.uprice }}</span>
        </el-form-item>
        <el-form-item label="成本：">
          <span>{{ form.succcountj * form.gprice }}</span>
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
import { getMonthUnLock, addTask } from "@/api/billingData";
export default {
  components: {},
  data() {
    return {
      //月份数据
      monthList: [],
      dialogFormVisible: false,
      form: {
        month: "",
        userId: "",
        succcountj: "",
        uprice: "",
        gateway: "",
        gprice: "",
      },
      rules: {
        month: [{ required: true, message: "请选择月份", trigger: "blur" }],
        userId: [
          { required: true, message: "请输入账户编号", trigger: "blur" },
          { max: 6, message: "最多输入6个字符", trigger: ["blur", "change"] },
        ],
        succcountj: [
          { required: true, message: "请输入条数", trigger: "blur" },
        ],
        uprice: [
          { required: true, message: "请输入账户单价(分)", trigger: "blur" },
        ],
        gateway: [
          { required: true, message: "请输入通道编号", trigger: "blur" },
          { max: 6, message: "最多输入6个字符", trigger: ["blur", "change"] },
        ],
        gprice: [
          { required: true, message: "请输入通道单价(分)", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  created() {},
  mounted() {
    this.getMonthList();
  },
  computed: {},
  methods: {
    MigrationUser() {
      this.dialogFormVisible = true;
    },
    async getMonthList() {
      await getMonthUnLock().then((res) => {
        if (res.code === 200) {
          this.monthList = res.data;
        }
      });
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let form = Object.assign(this.form, { type: 5 });
          addTask(form).then((res) => {
            if (res.code === 200) {
              this.$message.success("添加成功！");
              this.dialogFormVisible = false;
            }
          });
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
