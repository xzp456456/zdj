<template>
    <div>
        <div class="navBar">
            <div class="nav active">处理中</div>
            <div class="nav">已完成</div>
        </div>
        <div class="time">
            <div class="row">
            <span class="left day">2月28日 18:30</span>
            <span class="right ing">进行中</span>
            </div>
        </div>
        <div class="address">
            <div class="list">
                <div class="row">
                <img class="dz left" src="@/assets/dz.png" alt="" srcset="">
                <span class="pd">代驾出发地</span>
               <img class="jt right" src="@/assets/jt.png" alt="" srcset="">
               </div>
            </div>
        </div>
        <div class="address">
            <div class="list">
                <div class="row">
                <img class="dz left" src="@/assets/dz.png" alt="" srcset="">
                <span class="pd">代驾出发地</span>
               </div>
            </div>
        </div>
        <div class="bottom">
            没有更多了~
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped="">
.jt{
    width:.186667rem;
height:.346667rem;
}
.dz{
    width:.266667rem;
height:.346667rem;
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
</style>
