<template>
    <div class="shiyong">
        <div class="row">
        <span class="left">不使用优惠券</span>
        <span class="right"><img class="xuanze" src="@/assets/xuanze.png" alt="" srcset=""></span>
        </div>
        <div class="item">
            <div class="list">
                <div class="left money">￥1000</div>
                <div class="left all">
                    <div class="name">新用户优惠券</div>
                    <div class="time">2019-3-10到期</div>
                </div>
            </div>
             <div class="list">
                <div class="left money">￥1000</div>
                <div class="left all">
                    <div class="name">新用户优惠券</div>
                    <div class="time">2019-3-10到期</div>
                </div>
            </div>
              <div class="list">
                <div class="left money">￥1000</div>
                <div class="left all">
                    <div class="name">新用户优惠券</div>
                    <div class="time">2019-3-10到期</div>
                </div>
            </div>
        </div>
    </div>  
</template>
<script>
export default {
    
}
</script>
<style scoped="">
.shiyong{
    width: 100%;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}

.xuanze{
    width:.586667rem;
height:.586667rem;
position: relative;
top: 0.1rem;
}

.item{
    clear: both;
}

.money{
    margin-top: .866667rem;
    margin-left: 1rem;
}

.all{
    margin-top: 0.6rem;
    margin-left: 1.333333rem;
}

.list{
    background: url(../../assets/yuh.png)no-repeat;
     background-size: 100%;
    height: 2.64rem;
    line-height: normal;
    color: white;
    
}
</style>

