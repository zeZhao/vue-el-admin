<template>
  <div class="dangdang">
    <el-form
      :model="ruleForm"
      :rules="searchRules"
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
      <el-button
        type="primary"
        style="float: right; margin-top: -45px"
        @click="isCategory"
        >查看类别</el-button
      >
      <el-button
        type="primary"
        style="float: right; margin-top: -45px; margin-right: 110px;"
        @click="isExplain"
        >错误解释</el-button
      >

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
        <el-form-item label="选择类型" prop="exportType">
          <el-select v-model="ruleForm.exportType" placeholder="请选择类型">
            <el-option label="通道状态码-技术部" value="3"></el-option>
            <el-option label="特殊类别-技术部" value="4"></el-option>
            <el-option label="内容时间-客服部" value="1"></el-option>
            <el-option label="内容时间-营销部" value="2"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="responsive">
        <el-form-item label="输入账号" prop="queryId">
          <el-input
            v-model="ruleForm.queryId"
            placeholder="多个用英文逗号隔开"
          ></el-input>
        </el-form-item>
      </div>
      <div
        class="responsive"
        v-if="ruleForm.exportType == 2"
      >
        <el-form-item label="成功率调整" prop="adjustSuccessRate">
          <el-select
            v-model="ruleForm.adjustSuccessRate"
            placeholder="请选择成功率调整"
          >
            <el-option label="不调整" value="2"></el-option>
            <el-option label="调整" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <!-- <div class="responsive" v-show="ruleForm.adjustSuccessRate == 1">
        <el-form-item label="成功率算法" prop="resend">
          <el-select v-model="ruleForm.resend" placeholder="请选择导出补发">
            <el-option label="成功数/发送数" value="2"></el-option>
            <el-option label="成功数/提交数" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div> -->
      <div class="responsive" v-if="ruleForm.adjustSuccessRate == 1">
        <el-form-item label="区间值" prop="lowest">
          <div class="section">
            <el-input
              v-model="ruleForm.lowest"
              placeholder="区间低值"
            ></el-input>
            <span>-</span>
            <el-input
              v-model="ruleForm.highest"
              placeholder="区间高值"
            ></el-input>
          </div>
        </el-form-item>
      </div>
      <div class="responsive" v-if="ruleForm.adjustSuccessRate == 1">
        <el-form-item label="成功率调整内容" prop="adjustField">
          <el-select
            v-model="ruleForm.adjustField"
            placeholder="请选择成功率调整内容"
          >
            <!-- <el-option label="提交条数" value="3"></el-option> -->
            <el-option label="发送条数" value="1"></el-option>
            <el-option label="成功条数" value="2"></el-option>
            <!-- <el-option label="失败条数" value="4"></el-option>
            <el-option label="未知条数" value="5"></el-option> -->
          </el-select>
        </el-form-item>
      </div>
      <div class="form_item">
        <span class="line"></span>
        <span class="title">样式预览</span>
      </div>
      <div v-if="ruleForm.exportType == 3">
        <div class="tableTit">当当技术部账号</div>
        <el-table
          :data="tableData"
          style="width: 100%,height:200px"
          border
          :header-cell-style="{
            background: '#FAFAFA',
            borderBottom: '1px solid #EFF0F1',
          }"
        >
          <el-table-column prop="a" label="用户ID" align="center"
            >XXXXXX</el-table-column
          >
          <el-table-column prop="a" label="code" align="center"
            >X</el-table-column
          >
          <el-table-column prop="a" label="条数" align="center"
            >X</el-table-column
          >
          <el-table-column prop="a" label="占比" align="center"
            >X.XX%</el-table-column
          >
          <el-table-column prop="a" label="错误解释" align="center"
            >XXX</el-table-column
          >
        </el-table>
      </div>
      <div v-if="ruleForm.exportType == 1">
        <div class="tableTit">当当客服部数据</div>
        <el-table
          :data="tableData"
          style="width: 100%,height:200px"
          border
          :header-cell-style="{
            background: '#FAFAFA',
            borderBottom: '1px solid #EFF0F1',
          }"
        >
          <el-table-column
            prop="a"
            label="用户ID"
            align="center"
          >XXXXXX</el-table-column>
          <el-table-column
            prop="a"
            label="内容"
            align="center"
          ></el-table-column>
          <el-table-column prop="a" label="发送时间" align="center"
            >XXXX-XX-XX</el-table-column
          >
          <el-table-column prop="a" label="长度" align="center"
            >XX</el-table-column
          >
          <el-table-column prop="a" label="发送条数" align="center"
            >X</el-table-column
          >
          <el-table-column prop="a" label="计费条数" align="center"
            >X</el-table-column
          >
        </el-table>
      </div>
      <div v-if="ruleForm.exportType == 2">
        <div class="tableTit">当当营销部数据</div>
        <el-table
          :data="tableData"
          style="width: 100%,height:200px"
          border
          :header-cell-style="{
            background: '#FAFAFA',
            borderBottom: '1px solid #EFF0F1',
          }"
        >
          <el-table-column prop="a" label="用户ID" align="center"
            >X</el-table-column
          >
          <el-table-column prop="a" label="发送时间" align="center"
            >XXXX-XX-XX</el-table-column
          >
          <el-table-column prop="a" label="短信内容" align="center"
            >XX</el-table-column
          >
          <el-table-column prop="a" label="提交条数" align="center"
            >X</el-table-column
          >
          <el-table-column prop="a" label="计费条数" align="center"
            >X</el-table-column
          >
          <el-table-column prop="a" label="失败条数" align="center"
            >X</el-table-column
          >
          <el-table-column prop="a" label="成功率" align="center"
            >X.XX%</el-table-column
          >
        </el-table>
      </div>
      <div v-if="ruleForm.exportType == 4">
        <div class="tableTit">当当技术部数据-特殊类别(汇总)</div>
        <el-table
          :data="tableData"
          style="width: 100%,height:200px"
          border
          :header-cell-style="{
            background: '#FAFAFA',
            borderBottom: '1px solid #EFF0F1',
          }"
        >
          <el-table-column
            prop="a"
            label="用户ID"
            align="center"
          >XXXXXX</el-table-column>
          <el-table-column
            prop="a"
            label="短信内容类别"
            align="center"
          >XX</el-table-column>
          <el-table-column prop="a" label="短信内容" align="center"
            >XX</el-table-column
          >
          <el-table-column prop="a" label="发送条数" align="center"
            >X</el-table-column
          >
          <el-table-column prop="a" label="成功条数" align="center"
            >X</el-table-column
          >
          <el-table-column prop="a" label="失败条数" align="center"
            >X</el-table-column
          >
          <el-table-column prop="a" label="成功率" align="center"
            >X.XX%</el-table-column
          >
        </el-table>
      </div>
      <div v-if="ruleForm.exportType == 4" style="margin-top:20px">
        <div class="tableTit">当当技术部数据-特殊类别(明细)</div>
        <el-table
          :data="tableData"
          style="width: 100%,height:200px"
          border
          :header-cell-style="{
            background: '#FAFAFA',
            borderBottom: '1px solid #EFF0F1',
          }"
        >
          <el-table-column
            prop="a"
            label="用户ID"
            align="center"
          >XXXXXX</el-table-column>
          <el-table-column
            prop="a"
            label="短信内容"
            align="center"
          >XX</el-table-column>
          <el-table-column prop="a" label="状态码" align="center"
            >X</el-table-column
          >
          <el-table-column prop="a" label="CID" align="center"
            >X</el-table-column
          >
         
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
          >导出</el-button
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
    <!-- 查看类别 -->
    <el-dialog
      title="查看类别"
      :visible.sync="categoryVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="70%"
      :before-close="handleClose"
    >
      <el-table :data="categoryTata" border>
        <el-table-column prop="sortId" label="短信内容类别"></el-table-column>
        <el-table-column prop="template" label="内容" width="500"></el-table-column>
        <el-table-column prop="keyword" label="关键词"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button type="text" @click="editCategory(row)">修改</el-button>
            <el-button type="text" @click="deleteCategory(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :total="total"
        :current-page.sync="pageNumber"
        :page-size="pageSize"
        @size-change="sizeChange"
        @current-change="currentChange"
        style="margin-top:20px"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCategory()">添加</el-button>
        <el-button
          type="primary"
          @click="categoryVisible = false"
          style="margin-left: 16px"
          >关闭</el-button
        >
      </span>
    </el-dialog>
    <!-- 新增修改类别 -->
    <el-dialog
      title="查看类别"
      :visible.sync="addCategory"
      :close-on-click-modal="false"
      :show-close="false"
      width="70%"
      :before-close="handleClose"
    >
      <el-form :model="sortForm" label-width="120px" :rules="rules">
        <el-form-item label="短信内容类别：" prop="sortId">
          <el-input v-model="sortForm.sortId" placeholder="请输入类别"></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="template">
          <el-input v-model="sortForm.template" placeholder="请输入内容" type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
        </el-form-item>
        <el-form-item label="关键词：" prop="keyword">
          <el-input v-model="sortForm.keyword" placeholder="请输入关键词" type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCategory = false">取消</el-button>
        <el-button
          type="primary"
          @click="submitSort"
          style="margin-left: 16px"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- 查看错误解释 -->
    <el-dialog
      title="错误解释"
      :visible.sync="explainVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="70%"
      :before-close="handleClose"
    >
      <el-table :data="explainTata" border>
        <el-table-column prop="status" label="code"></el-table-column>
        <el-table-column prop="statusDescribe" label="错误解释" width="500" ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button type="text" @click="editExplain(row)">修改</el-button>
            <el-button type="text" @click="deleteExplain(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :total="total1"
        :current-page.sync="pageNumber1"
        :page-size="pageSize1"
        @size-change="sizeChange1"
        @current-change="currentChange1"
        style="margin-top:20px"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editExplain()">添加</el-button>
        <el-button
          type="primary"
          @click="explainVisible = false"
          style="margin-left: 16px"
          >关闭</el-button
        >
      </span>
    </el-dialog>
    <!-- 新增修改错误解释 -->
    <el-dialog
      title="错误解释"
      :visible.sync="addExplain"
      :close-on-click-modal="false"
      :show-close="false"
      width="70%"
      :before-close="handleClose"
    >
      <el-form :model="eplainForm" label-width="120px" :rules="eplainRules">
        <el-form-item label="code：" prop="status">
          <el-input v-model="eplainForm.status" placeholder="请输入类别"></el-input>
        </el-form-item>
        <el-form-item label="错误解释：" prop="statusDescribe">
          <el-input v-model="eplainForm.statusDescribe" placeholder="请输入内容" type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addExplain = false">取消</el-button>
        <el-button
          type="primary"
          @click="submitExplain"
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
  checkPassphrase,
  confirmExport,
  submitDownloadCenter,
  sortQueryByPage,
  addSave,
  updateSort,
  deleteSort,
  explainQueryByPage,
  addExplain,
  updateExplain,
  deleteExplain
} from "@/api/export";
export default {
  components: {},

  data() {
    const queryId = (rule, value, callback) => {
      if (!value) callback(new Error(`请输入区间值:最低值`));
      if (value<0) callback(new Error(`区间值:最低值不能低于0`));
      if (!this.ruleForm.highest) callback(new Error(`请输入区间值:最高值	`));
      if (this.ruleForm.highest>100) callback(new Error(`区间值:最高值不能高于100`));
      if (isNaN(value)) callback(new Error(`只能输入数字`));
      callback();
    };
    return {
      total:0,
      total1:0,
      pageNumber:0,
      pageNumber1:0,
      pageSize:10,
      pageSize1:10,
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
        time: [],
        adjustField: "",
        adjustSuccessRate: "2",
        exportType: "3",
        highest: "",
        lowest: "",
        queryId: "",
      },

      searchRules: {
        exportType: [{ required: true, message: "请选择类型", trigger: "blur" },],
        queryId: [{ required: true, message: "请输入账号", trigger: "blur" },],
        adjustField: [{ required: true, message: "请输入账号", trigger: "blur" },],
        lowest: [{ required: true, validator: queryId, trigger: "blur" }],
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
          { required: true, message: "请输入动态口令", trigger: "blur" },
        ],
      },

      //确认导出
      confirmVisible: false,
      currentDisabledData: [],
      tableColumn: [],

      //查看类别
      categoryVisible: false,      
      categoryTata: [],
      addCategory: false,
      sortForm: {
        sortId: "",
        template: "",
        keyword: "",
        id:''
      },
      // validator
      rules: {
        sortId: [
          {
            required: true,
            message: "请输入短信内容类别",
            trigger: "blur",
          },
        ],
        template: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur",
          },
        ],
        keyword: [
          {
            required: true,
            message: "请输入关键词",
            trigger: "blur",
          },
        ],
      },
      //错误解释
      explainVisible: false,
      explainTata: [],
      addExplain: false,
      eplainForm: {
        status: "",
        statusDescribe: "",
        id:''
      },
      // validator
      eplainRules: {
        status: [
          {
            required: true,
            message: "请输入code",
            trigger: "blur",
          },
        ],
        statusDescribe: [
          {
            required: true,
            message: "请输入错误解释",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.getSortQueryByPage()
    this.getExplainQueryByPage()
  },
  computed: {},
  methods: {
    sizeChange(val){
      this.pageSize = val;
      this.pageNumber = 1;
      this.getSortQueryByPage();
    },
    currentChange(val){
      this.pageNumber = val;
      this.getSortQueryByPage();
    },
    sizeChange1(val){
      this.pageSize1 = val;
      this.pageNumber1 = 1;
      this.getExplainQueryByPage();
    },
    currentChange1(val){
      this.pageNumber1 = val;
      this.getExplainQueryByPage();
    },
    //类别操作
    submitSort(){
      const {id} = this.sortForm
      if(id){
        updateSort(this.sortForm).then(res=>{
          if(res.code === 200){
            this.getSortQueryByPage()
            this.$message.success('操作成功')
            this.sortForm.id = ''
            this.addCategory = false;
          }
        })
      }else{
        addSave(this.sortForm).then(res=>{
          if(res.code === 200){
            this.getSortQueryByPage()
            this.$message.success('操作成功')
            this.addCategory = false;
          }
        })
      }
      
    },
    // 获取类别
    getSortQueryByPage(){
      sortQueryByPage({pageNumber:this.pageNumber,pageSize:this.pageSize}).then(res=>{
        if(res.code === 200){
          this.categoryTata = res.data.list
          this.total = res.data.total
        }
      })
    },
    //修改类别
    editCategory(row = {}) {
      if(row && Object.keys(row).length != 0){
        for(let key in row){
          this.sortForm[key] = row[key]
        }
      }else{
        for(let key in this.sortForm){
          this.sortForm[key] = ''
        }
      }
      this.addCategory = true;
    },
    deleteCategory({id}){
      deleteSort(id).then(res=>{
        if(res.code === 200){
          this.$message.success('操作成功')
          this.getSortQueryByPage()
        }
      })
    },
    isCategory() {
      this.categoryVisible = true;
    },
    //错误解释
    submitExplain(){
      const {id} = this.eplainForm
      if(id){
        updateExplain(this.eplainForm).then(res=>{
          if(res.code === 200){
            this.getExplainQueryByPage()
            this.$message.success('操作成功')
            this.eplainForm.id = ''
            this.addExplain = false;
          }else{
            this.$message.error(res.msg)
          }
        })
      }else{
        addExplain(this.eplainForm).then(res=>{
          if(res.code === 200){
            this.getExplainQueryByPage()
            this.$message.success('操作成功')
            this.addExplain = false;
          }else{
            this.$message.error(res.msg)
          }
        })
      }
      
    },
    // 获取错误解释
    getExplainQueryByPage(){
      explainQueryByPage({pageNumber:this.pageNumber1,pageSize:this.pageSize1}).then(res=>{
        if(res.code === 200){
          this.explainTata = res.data.list
          this.total1 = res.data.total
        }
      })
    },
    //修改错误解释
    editExplain(row = {}) {
      if(row && Object.keys(row).length != 0){
        for(let key in row){
          this.eplainForm[key] = row[key]
        }
      }else{
        for(let key in this.eplainForm){
          this.eplainForm[key] = ''
        }
      }
      this.addExplain = true;
    },
    
    deleteExplain({id}){
      deleteExplain(id).then(res=>{
        if(res.code === 200){
          this.$message.success('操作成功')
          this.getExplainQueryByPage()
        }
      })
    },
    isExplain() {
      this.explainVisible = true;
    },

    submitExport() {
      const { time } = this.ruleForm;
      let form = Object.assign({}, {
        startTime: time ? time[0] : "",
        endTime: time ? time[1] : "",
        dangDangExportParamDto:this.ruleForm,
        title:this.fileForm.fileName,
        //导出类型：1单条导出,2当当导出
        exportType:2
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
          // const { time } = this.ruleForm;
          // let form = Object.assign(this.ruleForm, {
          //   startTime: time ? time[0] : "",
          //   endTime: time ? time[1] : "",
          // });
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
      this.tableColumn = [];
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.dangdang {
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
