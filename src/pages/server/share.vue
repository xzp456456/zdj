<template>
  <div class="body">
    <div class="navBar">
      <div class="nav active">推荐好友</div>
      <div class="nav">推荐司机</div>
    </div>
    <div class="shares">
        <div class="share">
        <div class="left pd"><img class="wx" src="@/assets/weq.png" alt="" srcset=""></div>
        <div class="left pd"><img class="wx" src="@/assets/weq.png" alt="" srcset=""></div>
        <div class="left pd"><img class="wx" src="@/assets/weq.png" alt="" srcset=""></div>
        </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped="">
.body {
  position: absolute;
  width: 100%;
  height: 16.093333rem;
  background: url(../../assets/bg.png);
  background-size: cover;
}

.shares{
    position: absolute;
    bottom: 1rem;
    clear: both;
    width: 100%;
    margin: 0 auto;
}

.share{
    clear: both;
    width: 8rem;
    margin: 0 auto;
}

.wx{
    width: 1.2rem;
}

.navBar {
  width: 100%;
  height: 1.333333rem;
  line-height: 1.333333rem;
  background: transparent;
  border-bottom: 1px solid #dddddd;
}
.active {
  border-bottom: 2px solid #48cbb7;
}

.pd{
    margin:0 0.5rem;
}

.nav {
  float: left;
  width: 50%;
  text-align: center;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: white;
}
</style>
