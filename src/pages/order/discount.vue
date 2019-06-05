<template>
    <div class="shiyong" >
        <div class="row" @click="navgateTo('order')">
        <span class="left">不使用优惠券</span>
        <span class="right"><img class="xuanze" src="@/assets/xuanze.png" alt="" srcset=""></span>
        </div>
        <div class="item" >
            <div class="list" v-for="(item,index) in list" :key="index" @click="select(item.coupon_id,item.discount)">
                <div class="left money">￥{{item.discount}}</div>
                <div class="left all">
                    <div class="name">{{item.name}}</div>
                    <div class="time">{{item.expire_time}}到期</div>
                </div>
            </div>
             <!-- <div class="list">
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
            </div> -->
        </div>
    </div>  
</template>
<script>
export default {
    data(){
        return{
            type:'',
            page:0,
            page_size:10,
            list:{}
        }
    },
    created(){
        this.getDiscount();
    },
    methods:{
        navgateTo(url){
            this.$router.push(url)
        },
        select(id,money){
            localStorage.setItem('coupon_id',id);
            localStorage.setItem('zk',money);
            this.navgateTo('order');
        },
        getDiscount(){
            let data = {type:this.type,page:this.page,page_size:this.page_size}
            this.$postAjax('/api/coupon/getList',data)
            .then(res=>{
                //console.log(res);
                this.list = res.data.list;
            })
        }
    }
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

