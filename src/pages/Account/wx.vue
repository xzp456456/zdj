<template>
    <div>
        <div class="list">
            <div class="row">
            <span class="left"><img class="wx" src="@/assets/wx.png" alt="">
            微信</span>
            <span class="right">已绑定<img class="jt" src="@/assets/qqew.png" alt="" srcset=""></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped="">
.list{
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    border-bottom:1px solid  #DDDDDD;
}

.list .right{
    font-size:.32rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(153,153,153,1);
}

.list .left{
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}

.jt{
    width: .213333rem;
    position: relative;
    top: 0.07rem;
    margin-left: 0.1rem;
}

.wx{
    width: .64rem;
    position: relative;
    top: 0.15rem;
}
</style>
