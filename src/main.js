// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAMap from 'vue-amap';
import router from './router'
import 'mint-ui/lib/style.css';
import { getAjax,postAjax,postFileUp } from './request/axios'
Vue.config.productionTip = false
import { Picker,Popup,Toast,InfiniteScroll,Loadmore,MessageBox  } from 'mint-ui';
Vue.prototype.Toast = Toast;
Vue.prototype.MessageBox = MessageBox;
Vue.prototype.$getAjax = getAjax;
Vue.prototype.$postAjax = postAjax;
Vue.prototype.$postFileUp = postFileUp;

import 'weui';
import weui from 'weui.js';
Vue.prototype.weui = weui;
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  key:'1a891fe02c21d86d0fe612e58d987428',
  plugin: [
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
    "AMap.Geocoder"
  ],
  uiVersion: "1.0"
});
Vue.component(Picker.name,Picker);
Vue.component(Popup.name, Popup);
Vue.component(Loadmore.name, Loadmore);
Vue.use(InfiniteScroll);
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

