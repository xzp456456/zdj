<template>
  <div class="searchcity">
    <div class="top">
      <div class="mode">
        <img class="search left" src="@/assets/search.png" alt>
        <input type="text" class="left input" placeholder="中文/拼音/首字母">
        <div class="quxiao left">取消</div>
      </div>
    </div>
    <div class="now">当前</div>
    <div class="item">
        <ul>
            <li>北京</li>
        </ul>
    </div>
    <div class="now">热门城市</div>
    <div class="all">
        <ul>
            <li>北京</li>
            <li>北京</li>
        </ul>
    </div>
    <div class="now">a</div>
    <div class="more">
        <div class="list">
            阿尔山
        </div>
        <div class="list">
            阿里苏
        </div>
         <div class="list">
            阿里河
        </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped="">
.mode {
  width: 9.066667rem;
  height: 1.066667rem;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(225, 225, 225, 1);
  border-radius: 0.133333rem;
  margin: 0 auto;
  line-height: 1.066667rem;
  margin-top: .266667rem;
}
.search {
  width: 0.48rem;
  height: 0.48rem;
  margin-top: 0.25rem;
  margin-left: 0.266667rem;
}

.input {
  margin-top: 0.326667rem;
  text-align: center;
  width: 7.2rem;
  border: none;
  outline: none;
}

.top {
  width: 100%;
  height: 1.546667rem;
}

.now {
    clear: both;
  height: 0.853333rem;
  background: rgba(221, 221, 221, 0.4);
  font-size: 0.373333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 0.853333rem;
  padding: 0 0.506667rem;
}

.item ul li{
    padding:0 0.6rem;
    float: left;
height:.8rem;
background:rgba(221,221,221,1);
border-radius:.08rem;
font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(255,255,255,1);
line-height: .8rem;
text-align: center;
margin:.233333rem 0.5rem;
}

.all ul{
    width: 9rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    padding-bottom: 0.2rem;
}

.all ul li{
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
    height:.8rem;
border:1px solid rgba(225, 225, 225, 1);
border-radius:.08rem;
text-align: center;
padding:0 0.5rem;
line-height: 0.8rem;
display: inline-block;
margin: .133333rem;
}

.quxiao{
    font-size:.373333rem;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(153,153,153,1);
}

.more{
width: 100%;
}

.list{
    height: 1.306667rem;
    line-height: 1.306667rem;
    width: 9rem;
    margin: 0 auto;
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}
</style>

