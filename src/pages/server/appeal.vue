<template>
  <div>
    <div class="title row">投诉原因</div>
    <div class="text">
      <textarea></textarea>
    </div>
    <div>
      <div class="type row">
        上传凭证
        <span>（最多上传3张，每张最大限制2M）</span>
      </div>
      
          <div class="item">
              <div class="row">
        <div class="upfile">
            <span>点击<br />上传图片</span>
          <input type="file" class="fileForm">
        </div>
        </div>
      </div>
    </div>
    <div class="bottom">
    <div class="btn">
        <v-button>提交</v-button>
    </div>
    </div>
  </div>
</template>
<script>
import Button from '@/components/Button'
export default {
    components:{
        'v-button':Button
    }
};
</script>
<style scoped="">
.bottom{
    width: 100%;
    position: absolute;
    bottom: 1rem;
}
.title {
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  height: 1rem;
  line-height: 1rem;
}

.text {
  margin: 0 auto;
  width: 9.04rem;
  height: 1.906667rem;
}
.text textarea {
  margin: 0 auto;
  width: 9.04rem;
  height: 1.906667rem;
  border: 1px solid rgba(221, 221, 221, 0.4);
  border-radius: 0.133333rem;
}

.item{
    margin-top: 0.5rem;
}

.fileForm {
  width: 2rem;
  height: 2rem;
  opacity: 0;
}

.upfile {
  width: 2rem;
  height: 2rem;
  position: relative;
  background: rgba(221, 221, 221, 1);
}

.upfile span{
    text-align: center;
    font-size:.32rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1.333333rem;
    transform: translate(-50%,-50%);
}

.type {
  margin-top: 0.533333rem;
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.type span {
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
}
</style>
