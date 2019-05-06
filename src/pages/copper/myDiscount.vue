<template>
  <div class="shiyong">
    <div class="navBar">
      <div class="nav active">未使用</div>
      <div class="nav">已使用</div>
      <div class="nav">已过期</div>
    </div>
    <div class="item">
      <div class="list gc">
        <div class="left money">￥1000</div>
        <div class="left all">
          <div class="name">新用户优惠券</div>
          <div class="time">2019-3-10到期</div>
        </div>
      </div>
      <div class="list">
        <div class="left money">￥1000</div>
        <div class="left all">
          <div class="name">新用户优惠券</div>
          <div class="time">2019-3-10到期</div>
        </div>
      </div>
      <div class="list">
        <div class="left money">￥1000</div>
        <div class="left all">
          <div class="name">新用户优惠券</div>
          <div class="time">2019-3-10到期</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped="">
.navBar {
  width: 100%;
  height: 1.306667rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 0.966667rem;
}

.active {
  border-bottom: 2px solid #48cbb7;
}

.navBar .nav {
  display: inline-block;
  text-align: center;
  width: 3.2rem;
  line-height: 1.306667rem;
  height: 1.306667rem;
}

.shiyong {
  width: 100%;
  height: 1.3rem;
  line-height: 1.3rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.xuanze {
  width: 0.586667rem;
  height: 0.586667rem;
  position: relative;
  top: 0.1rem;
}

.item {
  clear: both;
}

.money {
  margin-top: 0.866667rem;
  margin-left: 1rem;
}

.all {
  margin-top: 0.6rem;
  margin-left: 1.333333rem;
}

.list {
  background: url(../../assets/yuh.png) no-repeat;
  background-size: 100%;
  height: 2.04rem;
  line-height: normal;
  color: white;
}

.gc {
  background: url(../../assets/yhc-gq.png) no-repeat !important;
  background-size: 100% !important;
  width: 9.2rem;
  margin: 0 auto;
}
</style>

