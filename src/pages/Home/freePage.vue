<template>
  <div class="page">
    <div class="text">
      <div class="title">附近暂无空闲司机</div>
      <div class="title pd">加价请更远司机来接</div>
      <div class="title">×1.1倍</div>
      <div class="start">当前时段该地区需求过旺，临时调价有助于更快叫到</div>
      <div class="start pd">司机，也可等价格恢复后下单。</div>
    </div>
    <div class="bottom">
      <div class="row">
        <div class="btn">
          <v-button>同意加价</v-button>
        </div>
        <div class="btn">
          <v-button >稍后在试</v-button>
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
    margin: 0 auto;
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

.pd{
    margin: 0;
    padding: 0;
}
</style>

