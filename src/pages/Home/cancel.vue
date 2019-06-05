<template>
  <div class="page">
    <div class="text">
        <img class="gth" src="@/assets/gth.png" alt="">
      <div class="title">当前无空闲司机，订单已关闭</div>
    </div>
    <div class="bottom">
      <div class="row">
        <div class="btn">
          <v-button @actionClick="navgateTo('/')">确定</v-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
export default {
  methods:{
    navgateTo(url){
      this.$router.replace(url)
    }
  },
  components: {
    "v-button": Button
  }
};
</script>
<style scoped="">
.gth{
    width: 1.36rem;
    height: 1.36rem;
    display: block;
    margin: 0 auto;
}
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

