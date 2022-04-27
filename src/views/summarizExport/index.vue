<template>
  <div class="summarizExport">
    <el-form
      :model="ruleForm"
      :rules="rules"
      :inline="true"
      ref="ruleForm"
      label-position="top"
      label-width="100px"
      class="demo_ruleForm"
    >
      <div class="form_item">
        <span class="line"></span>
        <span class="title">请输入条件</span>
      </div>
      <div class="responsive">
        <el-form-item label="ID类型" prop="queryType">
          <el-select
            v-model="ruleForm.queryType"
            placeholder="请选择ID类型"
            @change="queryType"
          >
            <el-option label="用户ID" value="2"></el-option>
            <el-option label="企业ID" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="responsive">
        <el-form-item :label="`${label}`" prop="queryId">
          <el-input
            v-model="ruleForm.queryId"
            :placeholder="`请输入${label}`"
          ></el-input>
        </el-form-item>
      </div>
      <div class="responsive" v-show="ruleForm.queryType == 1">
        <el-form-item label="多用户" prop="queryId">
          <el-input
            v-model="ruleForm.queryId"
            maxlength="50"
            show-word-limit
            placeholder="请输入多个用户ID，用英文逗号隔开"
          ></el-input>
        </el-form-item>
      </div>
      <div class="responsive">
        <el-form-item label="选择时间" prop="time">
          <el-date-picker
            v-model="ruleForm.time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="responsive">
        <el-form-item label="补发" prop="resend">
          <el-select v-model="ruleForm.resend" placeholder="请选择导出补发">
            <el-option label="有" value="2"></el-option>
            <el-option label="无" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="responsive">
        <el-form-item label="显示企业ID" prop="resend">
          <el-select v-model="ruleForm.resend" placeholder="请选择显示企业ID">
            <el-option label="显示" value="2"></el-option>
            <el-option label="不显示" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="responsive">
        <el-form-item label="显示用户ID" prop="resend">
          <el-select v-model="ruleForm.resend" placeholder="请选择显示用户ID">
            <el-option label="显示" value="2"></el-option>
            <el-option label="不显示" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="responsive">
        <el-form-item label="数据汇总" prop="collectType">
          <el-select
            v-model="ruleForm.collectType"
            multiple
            collapse-tags
            placeholder="请选择数据汇总"
            style="height: 32px"
          >
            <el-option label="汇总" value="1"></el-option>
            <el-option label="不汇总" value="2"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="responsive">
        <el-form-item label="数据限制" prop="resend">
          <el-select v-model="ruleForm.resend" placeholder="请选择数据限制">
            <el-option label="发送条数少于100不导出" value="2"></el-option>
            <el-option label="提交条数少于100不导出" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="responsive">
        <el-form-item label="成功率调整" prop="resend">
          <el-select v-model="ruleForm.resend" placeholder="请选择成功率调整">
            <el-option label="调整" value="2"></el-option>
            <el-option label="不调整" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="responsive" v-show="ruleForm.queryType == 1">
        <el-form-item label="成功率算法" prop="queryId">
          <el-select v-model="ruleForm.resend" placeholder="请选择成功率算法">
            <el-option label="成功数/发送数" value="2"></el-option>
            <el-option label="成功数/提交数" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="responsive" v-show="ruleForm.queryType == 1">
        <el-form-item label="区间值" prop="queryId">
          <div class="section">
            <el-input
              v-model="ruleForm.queryId"
              placeholder="区间低值"
            ></el-input>
            <span>-</span>
            <el-input
              v-model="ruleForm.queryId"
              placeholder="区间高值"
            ></el-input>
          </div>
        </el-form-item>
      </div>
      <div class="responsive" v-show="ruleForm.queryType == 1">
        <el-form-item label="成功率调整内容" prop="queryId">
          <el-select
            v-model="ruleForm.resend"
            placeholder="请选择成功率调整内容"
          >
            <el-option label="提交条数" value="1"></el-option>
            <el-option label="发送条数" value="2"></el-option>
            <el-option label="成功条数" value="3"></el-option>
            <el-option label="失败条数" value="4"></el-option>
            <el-option label="未知条数" value="5"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="form_item">
        <span class="line"></span>
        <span class="title">请选择汇总条件</span>
      </div>
      <div class="checkbox">
        <el-form-item prop="exportHeader">
          <el-checkbox-group v-model="ruleForm.summaryCondition">
            <el-checkbox-button
              v-for="item in summaryConditionData"
              :key="item.key"
              :value="item.key"
              :label="item.key"
              :disabled="item.disabled"
              >{{ item.value }}</el-checkbox-button
            >
            <!-- <el-checkbox label="备选项2" border></el-checkbox> -->
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="form_item">
        <span class="line"></span>
        <span class="title">请选择汇总数据</span>
      </div>
      <div class="checkbox">
        <el-form-item prop="exportHeader">
          <el-checkbox-group
            v-model="ruleForm.exportHeader"
            @change="exportHeaderHandle"
          >
            <el-checkbox-button
              v-for="item in exportHeaderData"
              :key="item.key"
              :value="item.key"
              :label="item.key"
              :disabled="item.disabled"
              >{{ item.value }}</el-checkbox-button
            >
            <!-- <el-checkbox label="备选项2" border></el-checkbox> -->
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="form_tip">
        <div class="img">
          <img src="@/assets/images/tip_icon@2x.png" alt="" />
        </div>

        <span>导出时需提供管理员短信验证码以获得授权，授权后仅当日有效</span>
      </div>

      <el-form-item>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="resetForm('ruleForm')">生成明细</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >生成账单和明细</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 验证权限 -->
    <el-dialog
      title="温馨提示"
      :visible.sync="jurisdictionVisible"
      :close-on-click-modal="false"
      custom-class="jurisdiction_visible"
      width="30%"
      :before-close="handleClose"
    >
      <div slot="title" class="header-title">
        <span>验证权限</span>
        <!-- <p>请输入管理员yang的短信验证码</p> -->
      </div>
      <div>
        <el-form :model="formInline" :rules="rulesInline" ref="formInline">
          <el-form-item label="短信验证码" prop="authorizationCode">
            <el-input
              v-model="formInline.authorizationCode"
              placeholder="请输入短信验证码"
            ></el-input> </el-form-item
        ></el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            jurisdictionVisible = false;
            formInline.authorizationCode = '';
          "
          >取消</el-button
        >
        <el-button type="primary" @click="submitJurisdiction('formInline')"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 确认导出 -->
    <el-dialog
      title="温馨提示"
      :visible.sync="confirmVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
      custom-class="confirm_visible"
      :before-close="handleClose"
    >
      <div slot="title" class="header_title">
        <span
          ><i
            class="el-icon-warning"
            style="color: #ff8800; font-size: 26px"
          ></i>
        </span>
        <span class="title">确认导出所选内容吗？</span>
        <p class="content">导出后可在下载中心中进行查看</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="submitExport"
          style="margin-left: 16px"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <div class="form_item">
      <span class="line"></span>
      <span class="title">样式预览</span>
    </div>
    <div class="tableTit">
      {{ ruleForm.time[0] }}
      <span v-show="ruleForm.time[0]">-</span>
      {{ ruleForm.time[1] }}数据详单
    </div>
    <el-table
      :data="tableData"
      style="width: 100%,height:200px"
      :show-summary="true"
      border
      :summary-method="getSummaries"
      sum-text="汇总"
      :header-cell-style="{
        background: '#FAFAFA',
        borderBottom: '1px solid #EFF0F1',
      }"
    >
      <el-table-column
        width="102px"
        v-for="item in tableColumn"
        :key="item"
        :label="tableLabel(item)"
        prop="item"
        align="center"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  checkParamOrGetAuthorizationCode,
  confirmExport,
  exportData,
} from "@/api/export";
export default {
  components: {},

  data() {
    const queryId = (rule, value, callback) => {
      if (!value) callback(new Error(`请输入${this.label}`));
      if (isNaN(value)) callback(new Error(`只能输入数字`));
      callback();
    };
    return {
      //表单数据
      ruleForm: {
        collectType: [],
        time: [],
        exportHeader: [],
        summaryCondition: [],
        queryType: "2",
        queryId: "",
        resend: "2",
      },
      label: "用户ID",

      rules: {
        queryType: [
          { required: true, message: "请选择ID类型", trigger: "blur" },
        ],
        queryId: [{ required: true, validator: queryId, trigger: "blur" }],
        time: [{ required: true, message: "请选择时间", trigger: "blur" }],
        exportHeader: [
          { required: true, message: "请选择导出表头", trigger: "blur" },
        ],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      //汇总条件
      summaryConditionData: [
        { key: 1, value: "发送日期", disabled: false },
        { key: 2, value: "短信内容", disabled: false },
        { key: 3, value: "状态码", disabled: false },
        { key: 4, value: "运营商", disabled: false },
        { key: 5, value: "省份", disabled: false },
      ],

      // 导出表头内容
      exportHeaderData: [
        { key: 1, value: "提交时间", disabled: false },
        { key: 2, value: "发送时间", disabled: false },
        { key: 3, value: "提交条数", disabled: false },
        { key: 4, value: "发送条数", disabled: false },
        { key: 5, value: "成功条数", disabled: false },
        { key: 6, value: "失败条数", disabled: false },
        { key: 7, value: "未知条数", disabled: false },
        { key: 8, value: "计费条数", disabled: false },
        { key: 9, value: "单价", disabled: false },
        { key: 10, value: "结算金额", disabled: false },
        { key: 11, value: "条数", disabled: false },
        { key: 12, value: "占比", disabled: false },
        { key: 13, value: "错误解释", disabled: false },
        { key: 14, value: "长度", disabled: false },
        { key: 15, value: "成功率", disabled: false },
        { key: 16, value: "定时时间", disabled: false },
        { key: 17, value: "定时状态", disabled: false },
      ],

      //权限验证弹窗数据
      jurisdictionVisible: false,
      formInline: {
        authorizationCode: "",
      },
      rulesInline: {
        authorizationCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
        ],
      },

      //确认导出z
      confirmVisible: false,
      currentDisabledData: [],

      tableData: [{ item: "" }],
      tableColumn: [],
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      let sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "汇总";
          return;
        } else {
          sums[index] = "";
          return;
        }
      });
      return sums;
    },
    tableLabel(item) {
      let str = "";
      this.exportHeaderData.forEach((v) => {
        if (item === "") {
          str = "";
        } else if (v.key === item) {
          str = v.value;
        }
      });
      return str;
    },
    exportHeaderHandle(val) {
      //如先选择提交条数、发送条数、成功条数、计费条数、失败条数、未知条数时要在第二列显示，
      //避免导出时汇总的数据被汇总两个字占用
      let data = [];
      let arr = [12, 13, 14, 15, 16, 17];
      if (val && val.length > 0) {
        val.forEach((v) => {
          //判断当前选中是否为条数
          if (arr.includes(val[val.length - 1]) && val.length === 1) {
            data = ["", ...val];
          } else {
            //判断之前选择的第一个是否为条数以免覆盖
            if (
              (data[0] === "" && arr.includes(data[1])) ||
              arr.includes(data[0])
            ) {
              data = ["", ...val];
            } else {
              data = val;
            }
          }
        });
      } else {
        data = [];
      }
      this.tableColumn = JSON.parse(JSON.stringify(data));
    },

    queryType(val) {
      if (val === "2") {
        this.label = "用户ID";
      } else {
        this.label = "企业ID";
      }
      this.$refs["ruleForm"].clearValidate(["queryId"]);
    },
    submitExport() {
      const { time } = this.ruleForm;
      let form = Object.assign(this.ruleForm, {
        startTime: time ? time[0] : "",
        endTime: time ? time[1] : "",
      });
      exportData(form).then((res) => {
        if (res.code === 200) {
          this.$message.success("导出成功，请前往下载中心查看~");
          this.confirmVisible = false;
        } else {
          this.$message.error(res.data);
        }
      });
    },

    //验证权限
    submitJurisdiction(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          confirmExport(this.formInline).then((res) => {
            if (res.code === 200) {
              this.jurisdictionVisible = false;
              this.$message({
                showClose: true,
                message: "授权码校验成功~",
                type: "success",
                duration: 1500,
              });
              setTimeout(() => {
                this.confirmVisible = true;
              }, 1500);
              this.formInline.authorizationCode = "";
            }
          });
        }
      });
    },
    handleClose() {
      this.jurisdictionVisible = false;
      this.confirmVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { time } = this.ruleForm;
          let form = Object.assign(this.ruleForm, {
            startTime: time ? time[0] : "",
            endTime: time ? time[1] : "",
          });
          checkParamOrGetAuthorizationCode(form).then((res) => {
            if (res.code === 200) {
              this.$message({
                showClose: true,
                message: "成功发送授权码~",
                type: "success",
                duration: 1500,
              });
              setTimeout(() => {
                this.jurisdictionVisible = true;
              }, 1500);
            } else if (res.code === 402) {
              this.$message({
                showClose: true,
                message: "已获取授权码，可直接二次确认导出",
                type: "success",
                duration: 1500,
              });
              setTimeout(() => {
                this.confirmVisible = true;
              }, 1500);
            } else if (res.code === 403) {
              this.$message({
                showClose: true,
                message: "授权码未校验,请重新输入授权码",
                type: "error",
                duration: 1500,
              });
              setTimeout(() => {
                this.jurisdictionVisible = true;
              }, 1500);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.label = "用户ID";
      this.exportHeaderData.forEach((o) => {
        o.disabled = false;
      });
    },
    getSingular(newArr, oldArr) {
      let num = null;
      oldArr.forEach((i) => {
        let flag = false;
        newArr.forEach((t) => {
          if (i == t) {
            flag = true;
            return;
          }
        });
        if (!flag) {
          num = i;
        }
      });
      return num;
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.summarizExport {
  padding: 0 24px;
  // height: calc(100vh - 64px);
  background: #fff;
  border-top: 1px solid #fff;
  .form_item {
    margin-top: 32px;
    margin-bottom: 26px;
    .line {
      width: 4px;
      height: 16px;
      background: #1890ff;
      display: inline-block;
    }
    .title {
      width: 80px;
      height: 22px;
      font-family: PingFangSC-Medium;
      font-weight: Medium;
      font-size: 16px;
      color: #2b2f36;
      padding-left: 8px;
    }
  }
  .tableTit {
    width: 100%;
    height: 70px;
    text-align: center;
    line-height: 70px;
    border: 1px solid #ebeef5;
    border-bottom: none;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 14px;
    color: #2b2f36;
  }
  .demo_ruleForm {
    .is-required {
      ::v-deep .el-form-item__label::before {
        display: none;
      }
      ::v-deep .el-form-item__label::after {
        content: "*";
        color: #f56c6c;
        margin-left: 4px;
      }
    }

    ::v-deep .el-form-item__label {
      padding: 0 !important;
    }
    ::v-deep .el-input__icon {
      height: auto;
      line-height: 32px;
    }
    ::v-deep .el-date-editor .el-range-separator {
      height: auto;
    }
    .el-form-item {
      margin-bottom: 10px;
      width: 100%;
    }
    ::v-deep .el-form-item__content {
      line-height: 32px;
    }
    ::v-deep .el-input__inner {
      height: 32px;
      line-height: 32px;
      width: 100%;
    }
    .el-select {
      width: 100%;
    }

    .responsive {
      width: 32%;
      display: inline-block;
      margin-right: 16px;
      .section {
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        .el-input {
          width: 45%;
          ::v-deep .el-input__inner {
            border: none !important;
          }
        }
      }
    }

    @media screen and (max-width: 1200px) {
      .responsive {
        width: 47%;
      }
    }
    @media screen and (min-width: 1200px) and (max-width: 1400px) {
      .responsive {
        width: 30%;
      }
    }
    @media screen and (min-width: 1401px) and (max-width: 1800px) {
      .responsive {
        width: 23%;
        margin-right: 16px;
      }
    }
    @media screen and (min-width: 1800px) {
      .responsive {
        width: 18%;
        margin-right: 16px;
      }
    }
    .checkbox {
      border: 1px solid #d7dae0;
      border-radius: 4px;
      padding: 24px 24px 0px;
      .el-form-item {
        margin-bottom: 8px;
      }
      ::v-deep .el-form-item__error {
        margin-top: -15px;
      }
    }
    ::v-deep .el-checkbox-button.is-checked .el-checkbox-button__inner {
      background: #1890ff;
      color: #fff;
    }
    ::v-deep .is-disabled {
      span {
        background: #eeeff0 !important;
        color: #bbbfc4 !important;
      }
    }
    ::v-deep .el-checkbox-button {
      margin-right: 16px;
      margin-bottom: 16px;
      span {
        width: 90px;
        height: 32px;
        line-height: 32px;
        background: #eeeff0;
        border-radius: 4px;
        border: none;
        text-align: center;
        padding: 0;
        font-family: PingFangSC-Regular;
        font-weight: Regular;
        font-size: 14px;
        color: #646a73;
      }
      .el-checkbox-button__inner:hover {
        background: #1890ff;
        color: #fff;
      }
    }
    .form_tip {
      margin: 24px 0 32px;
      font-family: PingFangSC-Regular;
      font-weight: Regular;
      font-size: 14px;
      color: #fa8c16;
      .img {
        width: 14px;
        height: 14px;
        display: inline-block;
        margin-right: 8px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  ::v-deep .confirm_visible {
    height: 156px;
    .header_title {
      .title {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #1f2329;
        line-height: 24px;
        padding-left: 16px;
        vertical-align: text-bottom;
      }
      .content {
        font-family: PingFangSC-Regular;
        font-weight: Regular;
        font-size: 14px;
        color: #1f2329;
        padding-top: 8px;
        padding-left: 42px;
      }
    }
    .el-dialog__header {
      padding: 24px 24px 10px;
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-dialog__footer {
      padding: 10px 24px 24px;
      margin-top: 4px;
    }
  }

  ::v-deep .jurisdiction_visible {
    height: 214px;
    .el-dialog__headerbtn {
      font-size: 26px !important;
    }
    .el-dialog__header {
      padding: 24px 24px 10px;
    }

    .el-dialog__body {
      padding: 0px 24px;
      .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
    }
    .el-dialog__footer {
      padding: 2px 24px 24px;
    }
  }
}
</style>
