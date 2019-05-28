<template>
    <div>
        <div class="navBar">
            <div class="nav" :class="status==0?'active':''" @click="changeStatus(0)">处理中</div>
            <div class="nav" :class="status==1?'active':''"  @click="changeStatus(1)">已完成</div>
        </div>
        <div class="scroll">
        <div class="all" v-for="(item,index) in list" :key="index">
        <div class="time">
            <div class="row">
            <span class="left day">{{item.on_time}}</span>
            <span class="right ing" v-if="status==0">进行中</span>
             <span class="right ing" v-if="status==1">已完成</span>
            </div>
        </div>
        
        <div class="address">
            <div class="list">
                <div class="row">
                <img class="dz left" src="@/assets/dz.png" alt="" srcset="">
                <span class="pd">代驾出发地:{{item.origin_name}}</span>
               <img class="jt right" src="@/assets/jt.png" alt="" srcset="">
               </div>
            </div>
        </div>
        <div class="address">
            <div class="list">
                <div class="row">
                <img class="dz left" src="@/assets/dz.png" alt="" srcset="">
                <span class="pd">代驾目的地:{{item.destination_name}}</span>
               </div>
            </div>
        </div>
       </div>
        </div>
        <div class="bottom">
    <div class="weui-loadmore" v-show="load==1">
    <i class="weui-loading"></i>
    <span class="weui-loadmore__tips">正在加载</span>
</div>
<div class="weui-loadmore weui-loadmore_line" v-show="load==0">
    <span class="weui-loadmore__tips">暂无数据</span>
</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            load:2,
            list:[],
            page:1,
            page_size:10,
            total:'',
            status:0
        }
    },
    created(){
        this.getList();
        this.getMore();
    },
    methods:{
        changeStatus(id){
            this.status = id;
            this.getList();
        },
        getList(){
            let data = { page:this.page,page_size:this.page_size,status:this.status }
            this.$postAjax('/api/complain/myComplain',data)
            .then(res=>{
                //console.log(res);
                this.total = res.data.total;
                this.list = res.data.list;
            })
        },
        getMore(){
        window.onscroll = () =>{
           		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
           		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
           		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
               if(scrollTop+windowHeight==scrollHeight){
                //写后台加载数据的函数
                        if(this.page_size>this.total){
                                this.load =0;
                                return false;
                        }
                        if(this.load == 1){
                            return false;
                        }
                        this.load = 1;
                       var Loader = setTimeout(()=>{
                            this.page_size = this.page_size+10;
                            this.getList();
                            this.load = 2;
                        },2000)
              }   
        }
    }
    }
        
}
</script>
<style scoped="">
.scroll{
    width: 100%;
    height: 16rem;
    overflow-y:scroll;
}
.jt{
    width:.186667rem;
height:.346667rem;
}
.dz{
    width:.266667rem;
height:.346667rem;
}

.bottom{
  font-size:.32rem;
  width: 100%;
  text-align: center;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(187,187,187,1);  
}

.list{
    height: 1rem;
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
    top: 0.1rem;
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
