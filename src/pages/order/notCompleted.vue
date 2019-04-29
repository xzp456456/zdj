<template>
  <div>
    <div class="title">
      <div class="row">未完成订单</div>
    </div>
    <div class="item">
      <div class="list">
        <div class="row">
          <span class="left time">02月28日 14:07</span>
          <span class="right ing">进行中</span>
        </div>
      </div>
      <div class="list">
        <div class="row">
          <span class="left wen">优惠券</span>
          <span class="right mun">
            17张
            <img class="jt" src="@/assets/jt.png" alt srcset>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped="">
.jt {
  width: 0.16rem;
  height: 0.306667rem;
}

.wen {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1) !important;
}

.num {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}

.title {
  width: 100%;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  height: 1.306667rem;
  line-height: 1.306667rem;
  border-bottom: 1px solid #dddddd;
}

.list {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
}

.time {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}

.ing {
  font-size: 0.32rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(72, 203, 183, 1);
}
</style>

