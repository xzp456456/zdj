<template>
  <div>
    <div class="navBar">
      <div class="left nav active">系统消息</div>
      <div class="right nav">对话</div>
    </div>
    <div class="item">
      <div class="row">
        <div class="list">
          <span class="left title">【福利】XXXXXXXXXXXXXX!</span>
          <span class="right time">9-21 14:00</span>
        </div>
        <div class="desc">
          这是一条消息XXXXXXXXXXXXXXXX
          XXXXXXXXXXXXXXXXXXXXX
        </div>
      </div>
    </div>
    <div class="item">
      <div class="row">
        <div class="list">
          <span class="left title">【福利】XXXXXXXXXXXXXX!</span>
          <span class="right time">9-21 14:00</span>
        </div>
        <div class="desc">
          这是一条消息XXXXXXXXXXXXXXXX
          XXXXXXXXXXXXXXXXXXXXX
        </div>
      </div>
    </div>
    <div class="item">
      <div class="row">
        <div class="list">
          <span class="left title">【福利】XXXXXXXXXXXXXX!</span>
          <span class="right time">9-21 14:00</span>
        </div>
        <div class="desc">
          这是一条消息XXXXXXXXXXXXXXXX
          XXXXXXXXXXXXXXXXXXXXX
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
  height: 1.333333rem;
  border-bottom: 1px solid rgba(221, 221, 221, 1);
}

.nav {
  width: 49%;
  text-align: center;
  height: 1.323333rem;
  line-height: 1.3333333rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  border-right: 1px solid rgba(221, 221, 221, 1);
}

.active {
  border-bottom: 0.053333rem solid rgba(72, 203, 183, 1);
}

.title {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}

.list {
  padding-bottom: 0.24rem;
}

.item {
  width: 100%;
  height: 2.3rem;
  padding-top: 0.4rem;
  border-bottom: 1px solid rgba(221, 221, 221, 1);
}

.time {
  font-size: 0.346667rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
}

.desc {
  width: 5.613333rem;
  height: 0.733333rem;
  font-size: 0.346667rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
</style>
