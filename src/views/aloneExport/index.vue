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
        <el-form-item label="多用户" prop="userId">
          <el-input
            v-model="ruleForm.userId"
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

      <!-- <div class="responsive">
        <el-form-item label="补发" prop="resend">
          <el-select v-model="ruleForm.resend" placeholder="请选择导出补发">
            <el-option label="有" value="2"></el-option>
            <el-option label="无" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div> -->
      <div class="responsive">
        <el-form-item label="手机号脱敏" prop="mobileDesensitization">
          <el-select
            v-model="ruleForm.mobileDesensitization"
            placeholder="请选择手机号脱敏"
            style="height: 32px"
          >
            <el-option label="脱敏" value="1"></el-option>
            <el-option label="不脱敏" value="2"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="form_item">
        <span class="line"></span>
        <span class="title">请选择内容</span>
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
        <el-button
          type="primary"
          style="padding: 0"
          @click="submitForm('ruleForm')"
          >生成</el-button
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
          <el-form-item label="动态口令" prop="authorizationCode">
            <el-input
              v-model="formInline.authorizationCode"
              placeholder="请输入动态口令"
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
      <el-form :model="fileForm" :rules="fileRule" inline>
        <el-form-item label="标题：" prop="fileName"  style="width:100%">
          <el-input v-model="fileForm.fileName" placeholder="请输入文档名称"/>
        </el-form-item>
      </el-form>
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
  submitDownloadCenter,
  checkPassphrase,
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
      fileForm:{
        fileName:""
      },
      fileRule:{
        fileName:[
          { required: true, message: "请输入标题", trigger: "blur" },
        ]
      },
      tableData: [{ item: "" }],
      //表单数据
      ruleForm: {
        mobileDesensitization: '2',
        time: [],
        exportHeader: [],
        queryType: "2",
        queryId: "",
        userId: "",
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

      // 导出表头内容
      exportHeaderData: [
        { key: 1, value: "企业ID", disabled: false },
        { key: 2, value: "用户ID", disabled: false },
        { key: 3, value: "提交时间", disabled: false },
        { key: 4, value: "发送时间", disabled: false },
        { key: 5, value: "运营商", disabled: false },
        // { key: 6, value: "签名", disabled: false },
        { key: 7, value: "短信内容", disabled: false },
        { key: 8, value: "手机号码", disabled: false },
        { key: 9, value: "内容长度", disabled: false },
        { key: 10, value: "状态码", disabled: false },
        { key: 11, value: "省份", disabled: false },
        { key: 12, value: "提交条数", disabled: false },
        { key: 13, value: "发送条数", disabled: false },
        { key: 14, value: "成功条数", disabled: false },
        { key: 15, value: "计费条数", disabled: false },
        { key: 16, value: "失败条数", disabled: false },
        { key: 17, value: "未知条数", disabled: false },
        { key: 18, value: "CID", disabled: false },
      ],

      //权限验证弹窗数据
      jurisdictionVisible: false,
      formInline: {
        authorizationCode: "",
      },
      rulesInline: {
        authorizationCode: [
          { required: true, message: "请输入动态口令", trigger: "blur" },
        ],
      },

      //确认导出
      confirmVisible: false,
      currentDisabledData: [],
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
      let form = Object.assign({}, {
        startTime: time ? time[0] : "",
        endTime: time ? time[1] : "",
        singeExportParamDto:this.ruleForm,
        title:this.fileForm.fileName,
        //导出类型：1单条导出,2当当导出
        exportType:1
      });
      submitDownloadCenter(form).then((res) => {
        if (res.code === 200) {
          this.$message.success("导出成功，请前往下载中心查看~");
          this.confirmVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    new() {},

    //验证权限
    submitJurisdiction(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          checkPassphrase(`?authorizationCode=${this.formInline.authorizationCode}`).then((res) => {
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
          checkPassphrase().then((res) => {
            if (res.code === 200) {
              this.$message({
                showClose: true,
                message: "已获取授权码，可直接二次确认导出",
                type: "success",
                duration: 1500,
              });
              setTimeout(() => {
                this.confirmVisible = true;
              }, 1500);
              
            } else if (res.code === 402) {
              this.$message({
                showClose: true,
                message: "成功发送授权码~",
                type: "success",
                duration: 1500,
              });
              setTimeout(() => {
                this.jurisdictionVisible = true;
              }, 1500);
            } else if (res.code === 1099) {
              this.$message({
                showClose: true,
                message: "口令未校验",
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
      this.tableColumn = [];
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
  height: calc(100vh - 64px);
  background: #fff;
  border-top: 1px solid #fff;
  ::v-deep .el-table__body-wrapper {
    // display: none;
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
    // height: 156px;
    // display: flex;
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
      padding: 10px 24px 0;
      .el-form-item__content{
        width: 80%;
      }
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
