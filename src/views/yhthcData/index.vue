<template>
  <div class="dataExport">
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
        <el-form-item label="选择时间" prop="time">
          <el-date-picker
            v-model="ruleForm.time"
            type="daterange"
            align="right"
            unlink-panels
            clearable
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy年MM月dd日"
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
        <el-form-item label="数据限制" prop="resend">
          <el-select v-model="ruleForm.resend" placeholder="请选择数据限制">
            <el-option label="发送条数少于100不导出" value="2"></el-option>
            <el-option label="提交条数少于100不导出" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="form_item">
        <span class="line"></span>
        <span class="title">样式预览</span>
      </div>
      <div class="table" style="width: 631px">
        <p class="table_title">天河城百货每日发送汇总表</p>
        <el-table
          border
          :data="tableData"
          sum-text="汇总"
          :show-summary="true"
          :header-cell-style="{
            background: '#FAFAFA',
            borderBottom: '1px solid #EFF0F1',
          }"
        >
          <el-table-column label="时间" prop="name">
            <template>
              <p>(短信验证码)</p>
              <p>xxxxxxxx-xxxx</p>
            </template>
          </el-table-column>
          <el-table-column label="提交条数" prop="type"></el-table-column>
          <el-table-column label="成功条数" prop="operator"></el-table-column>
          <el-table-column label="单价(元/条)" prop="num"></el-table-column>
          <el-table-column label="费用" prop="num"></el-table-column>
        </el-table>
      </div>
      <div class="table" style="width: 735px">
        <p class="table_title">发送明细</p>
        <el-table
          border
          :data="tableData"
          sum-text="汇总"
          :show-summary="true"
          :header-cell-style="{
            background: '#FAFAFA',
            borderBottom: '1px solid #EFF0F1',
          }"
        >
          <el-table-column label="用户ID" prop="name"></el-table-column>
          <el-table-column label="发送时间" prop="type"></el-table-column>
          <el-table-column label="提交时间" prop="operator"></el-table-column>
          <el-table-column label="短信内容" prop="num"></el-table-column>
          <el-table-column label="发送条数" prop="num"></el-table-column>
          <el-table-column label="成功条数" prop="num"></el-table-column>
          <el-table-column label="成功率" prop="num"></el-table-column>
        </el-table>
      </div>
      <div class="table" style="width: 735px">
        <p class="table_title">发送明细</p>
        <el-table
          border
          :data="tableData"
          sum-text="汇总"
          :show-summary="true"
          :header-cell-style="{
            background: '#FAFAFA',
            borderBottom: '1px solid #EFF0F1',
          }"
        >
          <el-table-column label="用户ID" prop="name">
            <template>
              <span>222110</span>
            </template>
          </el-table-column>
          <el-table-column label="发送时间" prop="type"></el-table-column>
          <el-table-column label="提交时间" prop="operator"></el-table-column>
          <el-table-column label="短信内容" prop="num"></el-table-column>
          <el-table-column label="发送条数" prop="num"></el-table-column>
          <el-table-column label="成功条数" prop="num"></el-table-column>
          <el-table-column label="成功率" prop="num"></el-table-column>
        </el-table>
      </div>

      <div class="form_tip">
        <div class="img">
          <img src="@/assets/images/tip_icon@2x.png" alt="" />
        </div>

        <span>导出时需提供管理员短信验证码以获得授权，授权后仅当日有效</span>
      </div>

      <el-form-item>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button
          type="primary"
          style="padding: 0"
          @click="submitForm('ruleForm')"
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
        time: [],
        resend: "2",
      },
      label: "用户ID",

      rules: {
        time: [{ required: true, message: "请选择时间", trigger: "blur" }],
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

      //确认导出
      confirmVisible: false,
      currentDisabledData: [],

      //表格数据
      tableData: [
        {
          name: "222111",
          type: "",
          operator: "",
          num: "",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
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
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.dataExport {
  padding: 0 24px;
  // height: calc(100vh - 64px);
  background: #fff;
  border-top: 1px solid #fff;
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
    .table {
      width: 100%;
      border: 1px solid #ebeef5;
      margin-bottom: 32px;
      .table_title {
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 14px;
        color: #2b2f36;
        text-align: center;
        line-height: 68px;
        border-bottom: 1px solid #ebeef5;
      }
      .table_auther,
      .table_time,
      .table_total {
        line-height: 44px;
        border-bottom: 1px solid #ebeef5;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: #2b2f36;
        padding-left: 24px;
      }
      .table_time {
        border-bottom: none;
        text-align: right;
        padding-right: 24px;
      }
      .table_total {
        padding-left: 0;
        text-align: center;
      }
      .table_company {
        padding: 15px;
        .company_left {
          // float: left;
          line-height: 40px;
          // p:first-child {
          //   padding-bottom: 10px;
          // }
        }
      }
    }
    .responsive {
      width: 32%;
      display: inline-block;
      margin-right: 16px;
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
