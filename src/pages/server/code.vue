<template>
    <div></div>
</template>
<script>
export default {
    created(){
        this.postCode();
    },
    methods:{
        getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        postCode(){
            this.$postAjax('/api/wx_oauth/callback',{
                code:this.getQueryString('code')
            }).then(res=>{
                if(res.status){
                    location.href = localStorage.getItem('uri');
                }else{
                       this.Toast({
                        message: res.msg,
                        duration: 1000
                    });
                }
            })
        }
    }
}
</script>
<style>

</style>
