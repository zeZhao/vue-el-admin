!
<template>
  <div class="utilityClass">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="号码导出" name="first">
        <el-form
          :model="formExport"
          label-width="100px"
          :rules="rulesExport"
          style="width: 500px"
        >
          <el-form-item label="账户编号：" prop="userId">
            <el-select v-model="formExport.userId" style="width: 100%">
              <el-option value="" label="请选择"></el-option>
              <el-option
                value="230110_聚通达有限公司"
                label="230110_聚通达有限公司"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提交日期：" prop="time">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formExport.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="1" :offset="1">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formExport.date2"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号次数：">
            <el-col :span="6">
              <el-select v-model="formExport.condition">
                <el-option label=">=" value=">="></el-option>
                <el-option label="=" value="="></el-option>
              </el-select>
            </el-col>
            <el-col :span="17" :offset="1">
              <el-input
                v-model="formExport.mobile"
                placeholder="请输入大于2位的正整数"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="关键字：">
            <el-input
              v-model="formExport.keyword"
              placeholder="请输入关键字"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">导出</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="IP查询" name="second">
        <el-form :model="formExport" label-width="100px" style="width: 500px">
          <el-form-item label="手机号：">
            <el-col :span="18">
              <el-input
                v-model="formExport.mobile"
                placeholder="请输入手机号码"
              ></el-input>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-button type="primary">查询</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="提交日期：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formExport.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="账户编号：">
            <el-select v-model="formExport.userId">
              <el-option value="" label="请选择"></el-option>
              <el-option
                value="230110_聚通达有限公司"
                label="230110_聚通达有限公司"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IP地址：">
            <el-input
              v-model="formExport.keyword"
              disabled
              placeholder="请输入IP地址"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">导出</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeName: "first",
      formExport: {
        userId: "",
        date1: "",
        date2: "",
        condition: "",
        mobile: "",
        keyword: "",
      },
      rulesExport: {
        userId: [
          { required: true, message: "请选择账户编号", trigger: "blur" },
        ],
        data1: [{ required: true, message: "请选择提交日期", trigger: "blur" }],
        data2: [{ required: true, message: "请选择提交日期", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.utilityClass {
  padding: 0 24px;
  min-height: calc(100vh - 64px);
  background: #fff;
  border-top: 1px solid #fff;
}
</style>
