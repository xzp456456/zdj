<template>
  <div>
    <div class="top">
      <div class="list">
        <span class="left">
          <i>姓名</i>：张三
        </span>
        <span class="right change">修改</span>
      </div>
      <div class="list">
        <span class="left">
          <i>银行名称</i>：招商银行
        </span>
      </div>
      <div class="list">
        <span class="left">
          <i>银行卡号</i>：624551265225255
        </span>
      </div>
      <div class="border"></div>
    </div>
    <div class="row mok">提现金额</div>
    <div class="row roke">
      <label for>￥</label>
      <input type="text" placeholder="最低提现金额为1元" class="money">
    </div>
    <div class="row layout">实际到账金额：￥506.32</div>
    <div class="border"></div>
    <div class="keyi">
      <div class="row">
        <span class="left moneykey">可提现金额100.00元</span>
        <span class="right all">全部提现</span>
      </div>
    </div>
    <div class="btns">
        <div class="btn">
      <v-button>确认提现</v-button>
      </div>
    </div>
    <!-- <div class="rule">
      <div class="li">提现规则：</div>
      <div class="li">1、提现需收取手续费0.1%；</div>
      <div class="li">2、7天内只能提现一次；</div>
      <div class="li">3、最低提现金额为1元；</div>
    </div> -->
    <v-alert></v-alert>
  </div>
</template>
<script>
import Button from "@/components/Button";
import Alert from "@/components/Alert";
export default {
  components: {
    "v-button": Button,
    "v-alert":Alert
  }
};
</script>
<style scoped="">
.keyi {
  width: 100%;
  height: 1.306667rem;
  line-height: 1.306667rem;
  border-bottom: 1px solid #dddddd;
}

.btns {
  margin-top: 0.966667rem;
  position: absolute;
  width: 100%;
  bottom: 0.6rem;
}


.moneykey {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.all {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(72, 203, 183, 1);
}

label {
  font-size: 0.4rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  margin-right: 0.1rem;
}

.roke {
  margin-top: 0.4rem;
}

.list {
  width: 9.2rem;
  margin: 0 auto;
  height: 0.8rem;
  line-height: 0.8rem;
  clear: both;
  font-size: 0.373333rem;
}

.layout {
  font-size: 0.293333rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  padding-left: 1rem;
  margin-top: 0.133333rem;
}

.mok {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-top: 0.266667rem;
}

.border {
  border-bottom: 1px solid #dddddd;
  width: 100%;
  margin-top: 0.266667rem;
}

.list i {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  font-style: normal;
}

.change {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(72, 203, 183, 1);
}

.money {
  width: 8.26rem;
  padding-left: 0.3rem;
  height: 0.96rem;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 0.133333rem;
}

.rule {
  width: 9.2rem;
  margin: 0 auto;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
  padding-top: 1rem;
}

.rule .li {
  padding-bottom: 0.1rem;
}
</style>
