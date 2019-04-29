<template>
    <div class="success">
        <div class="top ">
            <img class="inback" src="@/assets/success.png" alt="" srcset="">
            <div class="title inback">取消成功</div>
        </div>
        <div class="bar">
            <div class="border inback"></div>
             <div class="text inback">车费详情</div>
             <div class="border inback"></div>
        </div>
        <div class="row">
            <div class="clear">
                <span class="left">费用合计</span>
                <span class="right">10.00元</span>
            </div>
             <div class="clear">
                <span class="left">费用合计</span>
                <span class="right">10.00元</span>
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
             <div class="list">
                <img class="money" src="@/assets/money.png" alt="" srcset="">
                 <span>余额支付</span>
                  <img class="xuanze" src="@/assets/ty.png" alt="" srcset="">
            </div>
            <div>
                
            </div>
        </div>
        <div class="btn">
            <v-button>确认支付20.3元</v-button>    
        </div>
        </div>
        
        
    </div>
</template>
<script>
import Button from '@/components/Button';
export default {
    components:{
        'v-button':Button
    }
}
</script>
<style scoped="">
.top{
    width: 5rem;
    margin: 0 auto;
    margin-top: .933333rem;
}

.inback{
    display: inline-block;
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

.bottom{
    position: absolute;
    bottom: 0;
    width: 100%;
    height:6rem;
}
</style>
