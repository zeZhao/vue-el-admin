!
<template>
  <div class="bajData">
    <p class="title">市场部服务合同</p>
    <div class="contract">
      <h3 style="text-align: center; margin-bottom: 20px">
        补充协议：服务事项约定书
      </h3>
      <p>甲方：【百安居（上海）商贸有限公司】</p>
      <p>乙方：【北京聚通达科技股份有限公司】</p>
      <p>
        鉴于，甲、乙双方于【 2021 】年【 01 】月【 01 】日签订了编号： 【
        】《百安居市场部服务合同》（以下简称“原合同”），现双方经协商，由
        乙方向甲方增加提供如下服务，如与原合同发生抵触，以本协议的约定为准。
      </p>
      <p>1. 服务内容：乙方向甲方提供短信发送服务。</p>
      <p class="appoint">
        短信内容：<span class="niche"> 营销类、通知类 。</span>
      </p>
      <p class="appoint">短信长度：<span class="niche">70个字/条 。 </span></p>
      <p class="appoint">短信数量：<span class="niche"> XXXXXX条 。</span></p>
      <p style="margin: 20px 0">
        <el-table border :data="tableData">
          <el-table-column label="提交时间" prop="num"></el-table-column>
          <el-table-column label="用户ID" prop="num"></el-table-column>
          <el-table-column label="发送条数" prop="num"></el-table-column>
          <el-table-column label="成功条数" prop="num"></el-table-column>
          <el-table-column label="单价(元)" prop="num"></el-table-column>
          <el-table-column
            label="结算金额(元)"
            width="120"
            prop="num"
          ></el-table-column>
          <el-table-column label="短信内容" prop="num"></el-table-column>
        </el-table>
      </p>
      <p>2. 服务成果交付的时间和方式：</p>
      <p class="appoint">
        短信发送时间：<span class="niche"
          >2021年07月01日至2021年09月30日。
        </span>
      </p>
      <p class="appoint">短信方式：<span class="niche"> 群发短信 。</span></p>
      <p>
        3. 服务验收标准：抽查的短信到达率不得低于95%，
        若低于95%，扣款金额：（95%-实际派发率）×2×服务报酬总金额。
        低于80%，扣除合同所有服务报酬。
      </p>
      <p>
        4. 服务报酬明细：短信单价（含税）：<span class="niche"
          >0.021/条 。</span
        >
      </p>
      <span class="niche"></span>
      <p>5. 实际到达率：<span class="niche"> XX.XX% 。</span></p>
      <p class="tableTit">结算周期：xxxx年xx月xx日至xxxx年xx月xx日</p>
      <p>
        <el-table border :data="tableData1">
          <el-table-column label="产品类型" prop="num">
            <template>会员营销</template>
          </el-table-column>
          <el-table-column label="结算条数(条)" prop="num"
            ><template>x</template></el-table-column
          >
          <el-table-column label="结算单价(元/条)" prop="num"
            ><template>x</template></el-table-column
          >
          <el-table-column label="结算金额(元)" prop="num"
            ><template>x</template></el-table-column
          >
        </el-table>
      </p>
      <p>短信总金额：<span class="niche">X元。</span></p>
      <p>附上【 】年报价单。</p>
      <p>
        乙方按约定完成服务任务，经甲方确认无误后，可得的服务报酬含税总额为
        【X】元整（RMB X万X仟X佰X元X分），服务报酬明细见附件。如因国家
        税收政策调整，按照国家有关法规执行，合同含税总价依照新的税率作相应调整。
        甲方付款前，乙方应向甲方出具合法有效的等额增值税专用发票，税率为 【 6
        】%，否则甲方有权拒绝付款
      </p>
      <p>6. 其他约定：</p>
      <p class="appoint">
        A.若乙方需要甲方提供关联公司的证明，甲方可以根据当前情况提供相关的证明给到乙方
      </p>
      <p class="appoint">
        B.若乙方中途违约（没有按照合同规定的报价等要求履行职责），乙方需要赔付每笔订单总金额（含税）的30%给甲方。
      </p>
      <p class="appoint">
        C.甲方获得从数据交付之日起为期 /
        的使用许可权，在此期间甲方享有对数据多次的使用权。
      </p>
      <p class="appoint">
        D.乙方保证本协议所交付数据为合理合法取得，未侵犯公民个人信息；甲方不承担因乙方非法取得数据所产生的连带责任。如由此给甲方造成损失的，乙方需赔偿甲方。
      </p>
      <p class="appoint">
        E.本协议所交付数据仅供甲方 /（用途）之用，不做其他用途。
      </p>
      <p class="appoint">
        F.若甲方使用乙方提供的数据同潜在顾客进行联系时，潜在顾客不希望继续被联系，甲方将尊重其隐私，不再进行进一步的联系。
      </p>
      <p class="appoint">
        G.从数据交付之日起 / （时间）之后，甲方将不再享有对数据的使用 权，但
        /情况除外。
      </p>
      <p>
        7． 协议生效：
        本协议是原合同的一部分，任何未尽事宜适用原合同的条款。本协议自双方签字盖章后生效，一式叁份，甲方持二份，乙方持一份，具有同等法律效力。
      </p>
      <p style="margin-top: 20px">
        甲方：【百安居（上海）商贸有限公司】 （公章）
      </p>
      <p>授权代表： （签字）</p>
      <p>签订日期： 年 月 日</p>
      <p style="margin-top: 20px">
        乙方：【 北京聚通达科技股份有限公司 】 （公章）
      </p>
      <p>授权代表： （签字）</p>
      <p>签订日期： 年 月 日</p>
      <p>附：发送截图</p>
      <el-button type="primary">上传图片</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableData: [{}, {}],
      tableData1: [{}],
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
.bajData {
  padding: 24px 24px;
  // height: calc(100vh - 64px);
  background: #fff;
  border-top: 1px solid #fff;
  .title {
    color: #7f7f7f;
    font-size: 12px;
  }
  .contract {
    padding: 0 20%;
    line-height: 35px;
    .appoint {
      text-indent: 1cm;
    }
    .niche {
      text-decoration: underline;
    }
    .tableTit {
      text-align: center;
      border: 1px solid #ebeef5;
      border-bottom: none;
      color: #909399;
      font-size: 14px;
      margin-top: 20px;
    }
  }
}
</style>
