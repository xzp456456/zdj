// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css';
import { getAjax,postAjax } from './request/axios'
Vue.config.productionTip = false
import { Picker,Popup,Toast,InfiniteScroll,Loadmore,MessageBox  } from 'mint-ui';
Vue.prototype.Toast = Toast;
Vue.prototype.MessageBox = MessageBox;
Vue.prototype.$getAjax = getAjax;
Vue.prototype.$postAjax = postAjax;

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

