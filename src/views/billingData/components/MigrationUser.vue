<template>
  <!-- 账户迁移 -->
  <div class="MigrationUser">
    <el-button type="primary" @click="MigrationUser">账户迁移</el-button>
    <el-dialog title="账户迁移" :visible.sync="dialogFormVisible">
      <el-form :model="form" :label-width="formLabelWidth">
        <el-form-item label="月份：">
          <el-select v-model="form.region" placeholder="请选择月份">
            <el-option
              v-for="item in monthList"
              :key="item.value"
              label="区域一"
              value="shanghai"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原账户编号：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="条数：">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="原单价(分)：">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="原消耗金额(元)：">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="修改后账户编号：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="修改后单价(分)：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      //月份数据
      monthList: [],
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    MigrationUser() {
      this.dialogFormVisible = true;
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped></style>
