<template>
  <div class="downloadCenter">
    <div class="search">
      <el-form :model="searchForm" :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchForm.exportAccount"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="searchForm.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="searchForm.downloadContent"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="batchSend">批量发送</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 10px"
      :header-cell-style="{
        background: '#FAFAFA',
        borderBottom: '1px solid #fff',
      }"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >

    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column prop="exportAccount" label="导出账号" width="104">
      </el-table-column>
      <el-table-column prop="createTime" label="导出时间" width="180">
      </el-table-column>
      <el-table-column prop="downloadNum" label="导出条数(万)" width="138">
      </el-table-column>
      <el-table-column prop="fileSize" label="大小(M)" width="109">
      </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="downloadContent" label="导出内容" width="400">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.downloadContent"
            placement="top"
          >
            <span>{{ scope.row.downloadContent }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="buildState" label="状态" width="120">
        <template slot-scope="{ row }">
          <el-link :underline="false" type="primary" v-show="row.buildState === 2"
            >生成中...</el-link
          >
          <el-link :underline="false" type="primary" v-show="row.buildState === 1"
            >队列中</el-link
          >
          <el-link :underline="false" type="primary" v-show="row.buildState === 3"
            >已完成</el-link
          >
          <el-link :underline="false" type="danger" v-show="row.buildState === 4"
            >生成失败</el-link
          >
          <el-link :underline="false" type="info" v-show="row.buildState === 5"
            >已取消</el-link
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="{ row }">
          <span class="handle" @click="send(row)" v-show="row.buildState === 3" >发送</span>
          <span class="handle" @click="viewPassword(row)" v-show="row.buildState === 3" >密码</span>
          <span
           class="handle"
            v-show="row.buildState === 1"
            @click="cancelDownload(row)"
            >取消</span
          >
          <span
           class="handle"
            v-show="row.buildState === 3"
            @click="downloadHandle(row)"
            >下载</span
          >
          <span class="handle" v-show="row.buildState === 1 || row.buildState === 3" @click="deleteDownload(row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next"
      :total="total"
      :current-page.sync="searchForm.pageNumber"
      :page-size="searchForm.pageSize"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </el-pagination>

    <el-dialog title="邮箱发送" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="100px" :rules="rules">
        <el-form-item label="收件人：" prop="recipient">
          <el-input v-model="form.recipient" placeholder="请输入客户邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input
            v-model="form.mobile"
            placeholder="请输入客户手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="标题：" prop="subject">
          <el-input
            v-model="form.subject"
            placeholder="请输入邮箱标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="正文内容：" prop="text">
          <el-input
            v-model="form.text"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="您好：
   附件为北京聚通达科技股份有限公司销售对账单。请贵公司于收到邮件3日内核对往来明细金额（逾期将视为以我方数据为准），如与贵公司数据一致，请在公司签章处盖章或回复邮件确认（抄送人请一并回复），如有差异请将贵公司数额详细列示，金额不可取整数，谢谢。"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendMailAndSms"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryByPage, download, cancelDownload,sendMailAndSms,deleteDownload,queryPassword } from "@/api/sysDownLoadLog";

export default {
  components: {},
  data() {
    return {
      searchForm: {
        exportAccount: "",
        downloadContent: "",
        time: [],
        pageNumber: 1,
        pageSize: 10,
      },
      //表格数据
      tableData: [{}],
      total: 0,
      dialogFormVisible: false,
      form: {
        recipient: "",
        mobile: "",
        subject: "",
        text: "",
        fileId: "",
        
      },
      // validator
      rules: {
        recipient: [
          {
            required: true,
            type: "email",
            message: "请输正确的邮箱格式",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            pattern: /^(1[3-9][0-9]{9})$/,
            message: "请输正确的手机号格式",
            trigger: "blur",
          },
        ],
        subject: [
          {
            required: true,
            message: "请输入邮箱标题",
            trigger: "blur",
          },
        ],
        text: [
          {
            required: true,
            message: "请输入正文内容",
            trigger: "blur",
          },
        ],
      },
      multipleSelection:[]
    };
  },
  created() {},
  mounted() {
    this.getQueryByPage();
  },
  computed: {},
  methods: {
    //查看密码
    viewPassword({id}){
      queryPassword(id).then(res=>{
        if(res.code === 200){
            this.$alert(res.data, '查看密码', {
              confirmButtonText: '确定',
              callback: action => {
                // this.$message({
                //   type: 'info',
                //   message: `action: ${ action }`
                // });
              }
            });
        }
      })
    },
    //删除
    deleteDownload(row){
       this.$confirm('删除后将不可找回，请谨慎操作', '确认删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteDownload(row.id).then(res=>{
              if(res.code === 200){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getQueryByPage();
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    //批量发送
    batchSend(){
      let arr = []
      if(this.multipleSelection && this.multipleSelection.length == 0){
        this.$message.error('请最少勾选一条内容进行发送')
        return false
      }
      this.multipleSelection.forEach(item=>{
        arr.push(item.id)
      })
      for(let key in this.form){
        this.form[key] = ''
      }
      this.form.fileId = arr.join(',')
      this.dialogFormVisible = true;
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    //邮件发送
    sendMailAndSms(){
      sendMailAndSms(this.form).then(res=>{
        if(res.code === 200){
          this.$message.success('发送成功')
          this.dialogFormVisible = false;
        }
      })
    },
    send(row) {
      for(let key in this.form){
        this.form[key] = ''
      }
      this.form.fileId = row.id.toString()
      this.dialogFormVisible = true;
    },
    downloadHandle(row) {
      const { id, exportAccount, createTime } = row;
      let time = new Date(createTime).Format("yyyyMMddhhmmss");
      download({ downloadLogId: id }).then((res) => {
        let blob = new Blob([res]);
        let url = window.URL.createObjectURL(blob);
        let aLink = document.createElement("a");
        aLink.style.display = "none";
        aLink.href = url;
        aLink.setAttribute("download", `${exportAccount}数据详单${time}.zip`);
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
        window.URL.revokeObjectURL(url);
      });
    },
    cancelDownload(row) {
      const { id } = row;
      cancelDownload({ id }).then((res) => {
        if (res.coed === 200) {
          this.$message.success("已取消生成~");
        }
      });
    },
    sizeChange(val) {
      this.searchForm.pageSize = val;
      this.searchForm.pageNumber = 1;
      this.getQueryByPage();
    },
    currentChange(val) {
      this.searchForm.pageNumber = val;
      this.getQueryByPage();
    },
    getQueryByPage() {
      const { time } = this.searchForm;
      let form = Object.assign(this.searchForm, {
        startTime: time ? time[0] : "",
        endTime: time ? time[1] : "",
      });
      queryByPage(form).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.tableData.forEach((item) => {
            if (item.submitTime) {
              item.submitTime = new Date(item.submitTime).Format(
                "yyyy-MM-dd hh:mm:ss"
              );
            }
          });
        }
      });
    },
    onSubmit() {
      this.getQueryByPage();
      console.log("submit!");
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.downloadCenter {
  padding: 24px 24px;
  background: #fff;

  .el-pagination {
    text-align: right;
    margin-top: 28px;
    // padding-bottom: 28px;
  }
  .el-link {
    padding-right: 12px;
    text-decoration: none;
  }
  .handle{
    padding-right: 10px;
    cursor: pointer;
    color: #409EFF;
  }
}
</style>
