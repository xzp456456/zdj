<template>
        <div>
      <div class="row mag">
          <img class="moren left" src="@/assets/moren.png" alt="" srcset="">
          <div class="left mlf">
              <span class="name">胡师傅</span>
              <span class="pj"><img class="xinxing" src="@/assets/xinxing.png" alt="" srcset="">5.0</span>
              <div class="lin">代驾1104次 驾龄5年</div>
            </div>
      </div>
       <div class="bar">
            <div class="border inback"></div>
             <div class="text inback">车费详情</div>
             <div class="border inback"></div>
        </div>
        <div class="item">
            <div class="vlist">
                <div class="row">
                    <span class="left colb">起步价</span>
                    <span class="right colb">20.3元</span>
                </div>
            </div>
               <div class="vlist">
                <div class="row">
                    <span class="left">里程(8公里)</span>
                    <span class="right">20.3元</span>
                </div>
            </div>
               <div class="vlist">
                <div class="row">
                    <span class="left">时长(19分钟)</span>
                    <span class="right">20.3元</span>
                </div>
            </div>
            <div class="vlist">
                <div class="row">
                    <span class="left">优惠券抵扣</span>
                    <span class="right yhj">-15.0元<img class="jt" src="@/assets/jt.png" alt="" rcset="" /></span>
                </div>
            </div>
        </div>
        <div class="bottom">
             <div class="bar">
            <div class="border inback"></div>
             <div class="text inback">支付方式</div>
             <div class="border inback"></div>

        </div>
           <div class="row">
            <div class="list">
                <img class="money" src="@/assets/money.png" alt="" srcset="">
                <span>微信支付</span>
                <img class="xuanze" src="@/assets/xuanze.png" alt="" srcset="">
            </div>
             <!-- <div class="list">
                <img class="money" src="@/assets/money.png" alt="" srcset="">
                 <span>余额支付</span>
                  <img class="xuanze" src="@/assets/ty.png" alt="" srcset="">
            </div> -->
            <div>
                
            </div>
        </div>
        <div class="btn">
            <v-button>确认支付20.3元</v-button>    
        </div>
        </div>
        <div class="prdem" v-show="showId==1">
        <div class="successPay">
            <img class="success" src="@/assets/success.png" alt="">
            <div class="textk">支付成功！</div>
            <div class="pj">给您的这次行程一个评价吧</div>
            <div class="form">
                <button>下次在说</button>
                <button>前往评价</button>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
import Button from '@/components/Button';
export default {
    data(){
        return{
            showId:0
        }
    },
     components:{
        'v-button':Button
    }
}
</script>
<style scoped="">
.prdem{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

}
.successPay{
    width:6.826667rem;
    
height:4.56rem;
background:rgba(255,255,255,1);
border-radius:.133333rem;
margin: 0 auto;
margin-top: 1.66667rem;
padding-top: .08rem;
}

.textk{
    font-size:.373333rem;
    text-align: center;
font-family:PingFang-SC-Bold;
font-weight:bold;
padding: .133333rem 0;
color:rgba(51,51,51,1);
}

.pj{
    text-align: center;
    font-size:.32rem;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(187,187,187,1);
}

.success{
    width: .906667rem;
    height: .906667rem;
    display: block;
    margin: 0 auto;
    margin-top: .48rem;
}

.form{
    width: 100%;
    margin-top: 1px solid rgba(221,221,221,1);
    height: 1.306667rem;
    padding-top: 0.6rem;
}

.form button:first-child{
    border-right: 1px solid rgba(221,221,221,1);
    background-color: transparent;
    border: none;
    outline: none;
     height: 1.306667rem;
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(153,153,153,1);
width: 50%;
float: left;
}


.form button:nth-child(2){
    background-color: transparent;
    border: none;
    outline: none;
     height: 1.306667rem;
    float: left;
    width: 50%;
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(72,203,183,1);
}

.bottom{
    position: absolute;
    bottom: 1rem;
    width: 100%;
}

.inback{
    display: inline-block;
}

.jt{
    width: .186667rem;
    height: .346667rem;
    margin-left: .266667rem;
}

.name{
    font-size:.373333rem;
font-family:PingFang-SC-Heavy;
font-weight:800;
color:rgba(51,51,51,1);

}

.border{
    width: 4.026667rem;
    height: 1px;
    background:rgba(221,221,221,1);
opacity:0.4;
}

.bar{
    margin-top: .233333rem;
}

.yhj{
    font-size:.4rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(72,203,183,1);
}

.text{
    font-size:.373333rem;
    text-align: center;
font-family:PingFang-SC-Medium;
font-weight:500;
position: relative;
bottom: -0.1rem;
color:rgba(153,153,153,1);
}

.xinxing{
    width: .453333rem;
    height: .453333rem;
    font-size:.293333rem;
font-family:ArialMT;
font-weight:400;
color:rgba(51,51,51,1);
}
#container {
  width: 100%;
  height: 100%;
  position: absolute;
}

.mlf{
    margin-left: 0.1rem;
}

.colb{
    font-weight:bold;
}



.or {
  height: 0.6rem;
  padding-top: 0.4rem;
  font-size: 0.426667rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
  text-align: center;
}

.wait {
  line-height: 1rem;
  height: 1rem;
  text-align: center;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}

.moren{
    width: 1.306667rem;
    height: 1.306667rem;
}
.amap-icon {
  z-index: 99999 !important;
}

.form{
    width: 6.5rem;
    margin: 0 auto;
}

.sure{
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(255,255,255,1);
    border: none;
    outline: none;
    width:2.666667rem;
height:1.066667rem;
background:#48CBB7;
border-radius:.133333rem;
}

.quxiao{
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(255,255,255,1);
    border: none;
    outline: none;
    width:2.666667rem;
height:1.066667rem;
background:#48CBB7;
border-radius:.133333rem;
}

.lin{
    padding-top: .153333rem;
    clear: both;
    font-size:.32rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(153,153,153,1);
}

.line{
    width: .96rem;
    height: .96rem;
}

.mobile{
    width: .96rem;
    height: .96rem;
    margin-left: .253333rem;
}

.mag{
    margin-top: .413333rem;
    height: 1.5rem;
}

.pj{
    margin-left: .166667rem;
}

.pj img{
    position: relative;
    top: 0.05rem;
}

.title{
    font-size:.373333rem;
font-family:PingFang-SC-Heavy;
font-weight:800;
text-align: center;
color:rgba(51,51,51,1);
padding: .366667rem 0;
}

.vlist{
    clear: both;
    height: 1rem;
    line-height: 1rem;
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}

.list{
    height: 1.3rem;
    line-height: 1.3rem;
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}

.money{
    width: .8rem;
    height: .8rem;
    position: relative;
    top: 0.3rem;
}

.xuanze{
    float: right;
    width: .613333rem;
    height: .613333rem;
    position: relative;
    top: 0.3rem;
}

.border{
    width: 4.026667rem;
    height: 1px;
    background:rgba(221,221,221,1);
opacity:0.4;
}

.bar{
    margin-top: .933333rem;
}

.text{
    font-size:.373333rem;
    text-align: center;
font-family:PingFang-SC-Medium;
font-weight:500;
position: relative;
bottom: -0.1rem;
color:rgba(153,153,153,1);
}

.top img{
    width: 1.6rem;
    height: 1.6rem;
}

.clear{
    clear: both;
    height: 1rem;
    line-height: 1rem;
}

.clear:first-child{
    font-size:.373333rem;
font-family:PingFang-SC-Bold;
font-weight:bold;
color:rgba(51,51,51,1);
}

.clear:nth-child(2){
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}

.title{
    font-size:.453333rem;
font-family:PingFang-SC-Heavy;
font-weight:800;
color:rgba(51,51,51,1);
position: relative;
bottom: .616667rem;
left: .48rem;

}

.btn{
    margin-top: 0.2rem;
}

</style>

