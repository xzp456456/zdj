<template>
    <div>
        <div class="title">
            <div class="row">
                当前进度：{{info.status}}
            </div>

        </div>
         <div class="title">
            <div class="row">
                订单编号：{{info.trip_id}}
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
                <span class="pd">代驾出发地 :</span>
                 <span class="nar">{{info.origin_name}}</span>
               </div>
            </div>
             <div class="list">
                <div class="row">
                <img class="dz left" src="@/assets/dz.png" alt="" srcset="">
                <span class="pd">代驾目的地 :</span>
                <span  class="nar">{{info.destination_name}}</span>
               </div>
            </div>
        </div>
        <div class="yuanying row">
            <div class="left let">投诉原因：</div>
            <div class="left desc">{{info.complain_reason}}
        </div>
        </div>
         <div class="yuanying row pd">
            <div class="left let">投诉凭证：</div>
            <div class="left img">
                <img class="pz" v-for="(item,index) in info.files" :key="index" :src="item" :onerror=" defaultImg" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
             defaultImg: 'this.src="' + require('@/assets/img.png') + '"',
            info:{}
        }
    },
    created(){
        this.getComplain()
    },
    methods:{
        getComplain(){
            let data = { complain_id:1 }
            this.$postAjax('/api/complain/complainDetail',data)
            .then(res=>{
                this.info = res.data;
            })
        }
    }
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

.nar{
    line-height: normal;
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
    /* height: 1rem; */
    /* line-height: 1rem; */
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
margin-bottom: .4rem;
}

.pd{
    margin-left: 0.2rem;
}

.list img{
    position: relative;
    top: 0.13rem;
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
