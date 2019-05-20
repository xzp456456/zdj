<template>
    <div>
        <div class="list" @click="navgateTo('newPhone')">
            <div class="row">
            <div class="left">
               <div class="change">修改手机号</div>
               <div class="login">同时修改登录手机号</div>
            </div>
            <div class="right rd">
                {{mobile}} <img class="jt" src="@/assets/jt.png" alt="" srcset="">
            </div>
            </div>
        </div>
        <div class="li" @click="navgateTo('changePassword')">
            <div class="row">
                <span class="left mima">修改登录密码</span>
                <span class="right rs">去修改 <img class="jt pq" src="@/assets/jt.png" alt="" srcset=""></span>
            </div>
        </div>
        <div class="list"  @click="navgateTo('wx')">
            <div class="row">
            <div class="left">
               <div class="change">第三方账号绑定</div>
               <div class="login">绑定后可免验证快捷登录</div>
            </div>
            <div class="right rd">
                <img class="jt" src="@/assets/jt.png" alt="" srcset="">
            </div>
            </div>
        </div>
        <div class="list" @click="navgateTo('cancelAccount')">
            <div class="row">
            <div class="left">
               <div class="change">注销账号</div>
               <div class="login">绑定账号将清空所有用户信息</div>
            </div>
            <div class="right rd">
                <img class="jt" src="@/assets/jt.png" alt="" srcset="">
            </div>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    data(){
        return{
            info:{},
            mobile:''
        }
    },
    created(){
        this.getPhone()
    },
    methods:{
        getPhone(){
            this.$postAjax('/api/user/getUserInfo',{obj_uid:localStorage.getItem('obj_uid')})
            .then(res=>{
                let mobile = res.data.mobile;
               this.mobile = mobile.substr(0,3)+'****'+mobile.substr(7,11);
            })
        },
        navgateTo(url){
            this.$router.push(url)
        }
    }
}
</script>
<style scoped="">
.jt{
    width: .193333rem;
}

.list{
    border-bottom:1px solid #DDDDDD;
    height: 1.3rem;
    padding-top: 0.3rem;
}

.li{
    border-bottom:1px solid #DDDDDD;
    height: 1.3rem;
    line-height: 1.3rem;
}

.mima{
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}

.rs{
    font-size:.32rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(153,153,153,1);
}

.pq{
    margin-left: .166667rem;
}

.rd{
    font-size:.4rem;
font-family:PingFang-SC-Medium;
font-weight:500;
padding-top: 0.2rem;
color:rgba(153,153,153,1);
}

.login{
    font-size:.32rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(187,187,187,1);
}

.change{
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}

.change{
    font-size:.373333rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}
</style>
