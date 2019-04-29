<template>
  <div class="page">
    <div class="text">
      <div class="title">请确认起点后呼叫代驾</div>
      <div class="start">起点：软件园三期A区</div>
      <div class="length">距您当前定位85公里</div>
    </div>
    <div class="bottom">
      <div class="row">
        <div class="btn">
          <v-button>修改起点</v-button>
        </div>
        <div class="btn">
          <v-button myclass="bgcolor">确认呼叫</v-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
  components: {
    "v-button": Button
  }
};
</script>
<style scoped="">
.text {
  text-align: center;
  margin-top: 2.666667rem;
}
.title {
  font-size: 0.453333rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
  padding-top: 0.466667rem;
}

.start {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  padding-top: 0.466667rem;
}

.length {
  font-size: 0.32rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding-top: 0.466667rem;
}
.bottom {
  position: absolute;
  bottom: 0.733333rem;
  width: 100%;
}

.btn{
    margin-top:.466667rem; 
}
</style>

