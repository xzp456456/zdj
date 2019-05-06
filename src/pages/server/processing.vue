<template>
    <div>
        <div class="title">
            <div class="row">
                当前进度：处理中
            </div>

        </div>
         <div class="title">
            <div class="row">
                订单编号：0000001
            </div>

        </div>
         <div class="time">
            <div class="row">
            <span class="left day">2月28日 18:30</span>
            </div>
        </div>
        <div class="address">
            <div class="list">
                <div class="row">
                <img class="dz left" src="@/assets/dz.png" alt="" srcset="">
                <span class="pd">代驾出发地</span>
               </div>
            </div>
             <div class="list">
                <div class="row">
                <img class="dz left" src="@/assets/dz.png" alt="" srcset="">
                <span class="pd">代驾目的地</span>
            
               </div>
            </div>
        </div>
        <div class="yuanying row">
            <div class="left let">投诉原因：</div>
            <div class="left desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum
        </div>
        </div>
         <div class="yuanying row pd">
            <div class="left let">投诉凭证：</div>
            <div class="left img">
                <img class="pz" src="@/assets/img.png" alt="">
                <img class="pz" src="@/assets/img.png" alt="">
                <img class="pz" src="@/assets/img.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped="">
.pd{
    padding-top: .566667rem;
    clear: both;
}
.pz{
    width:7.013333rem;
height:4.04rem;
display: block;
margin-bottom:.466667rem; 
}
.yuanying{
    margin-top: 0.3rem;
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}
.title{
width: 100%;
height: 1.333333rem;
line-height: 1.333333rem;
font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
border-bottom:1px solid  #DDDDDD;
}

.jt{
    width:.186667rem;
height:.346667rem;
}
.dz{
    width:.266667rem;
height:.346667rem;
}

.let{
    width: 2rem;
}

.desc{
    width: 7rem;
}

.bottom{
    position: absolute;
    bottom: 0.5rem;
  font-size:.32rem;
  width: 100%;
  text-align: center;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(187,187,187,1);  
}

.list{
    height: 1rem;
    line-height: 1rem;
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}

.pd{
    margin-left: 0.2rem;
}

.list img{
    position: relative;
    top: 0.33rem;
}

.navBar{
    width:100%;
height:1.333333rem;
line-height: 1.333333rem;
background:rgba(255,255,255,1);
border-bottom:1px solid #DDDDDD;
}

.time{
    clear: both;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
}

.ing{
    font-size:.32rem;
font-family:PingFang-SC-Bold;
font-weight:bold;
color:rgba(72,203,183,1);
}

.day{
    font-size:.373333rem;
font-family:PingFang-SC-Bold;
font-weight:bold;
color:rgba(51,51,51,1);
}

.active{
    border-bottom:2px solid #48CBB7; 
}

.nav{
    float: left;
    width: 50%;
    text-align: center;
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}

.address{
    border-bottom:1px solid  #DDDDDD;
}
</style>
