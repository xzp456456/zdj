import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/Home/index'], resolve),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/address',
      name: 'address',
      component: resolve => require(['@/pages/Home/address'], resolve),
      meta: {
        title: '选择地点'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/Account/login'], resolve),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: resolve => require(['@/pages/Account/forgetPassword'], resolve),
      meta: {
        title: '忘记密码'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/pages/Account/register'], resolve),
      meta: {
        title: "注册"
      }
    },
    {
      path: '/discuss',
      name: 'discuss',
      component: resolve => require(['@/pages/Account/discuss'], resolve),
      meta: {
        title: "注册"
      }

    },
    {
      path: '/city',
      name: 'city',
      component: resolve => require(['@/pages/Home/city'], resolve),
      meta: {
        title: "选择城市"
      }
    },
    {
      path: '/surePage',
      name: 'surePage',
      component: resolve => require(['@/pages/Home/surePage'], resolve),
      meta: {
        title: "确认下单"
      }
    },
    {
      path: '/freePage',
      name: 'freePage',
      component: resolve => require(['@/pages/Home/freePage'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/wait',
      name: 'wait',
      component: resolve => require(['@/pages/Home/wait'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/cancel',
      name: 'cancel',
      component: resolve => require(['@/pages/Home/cancel'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/success',
      name: 'success',
      component: resolve => require(['@/pages/order/success'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/pail',
      name: 'pail',
      component: resolve => require(['@/pages/order/pail'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/cancelSuccess',
      name: 'cancelSuccess',
      component: resolve => require(['@/pages/order/cancelSuccess'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/reason',
      name: 'reason',
      component: resolve => require(['@/pages/order/reason'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/cancelSure',
      name: 'cancelSure',
      component: resolve => require(['@/pages/Home/cancelSure'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/underway',
      name: 'underway',
      component: resolve => require(['@/pages/Home/underway'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/underwayAddress',
      name: 'underwayAddress',
      component: resolve => require(['@/pages/Home/underwayAddress'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/order',
      name: 'order',
      component: resolve => require(['@/pages/order/order'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/discount',
      name: 'discount',
      component: resolve => require(['@/pages/order/discount'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/unLine',
      name: 'unLine',
      component: resolve => require(['@/pages/order/unLine'], resolve),
      meta: {
        title: "张代驾"
      },
    },
    {
      path: '/center',
      name: 'center',
      component: resolve => require(['@/pages/report/center'], resolve),
      meta: {
        title: "张代驾"
      }

    },
    {
      path: '/systemReport',
      name: 'systemReport',
      component: resolve => require(['@/pages/report/systemReport'], resolve),
      meta: {
        title: "张代驾"
      }

    },
    {
      path: '/notCompleted',
      name: 'notCompleted',
      component: resolve => require(['@/pages/order/notCompleted'], resolve),
      meta: {
        title: "张代驾"
      }

    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: resolve => require(['@/pages/order/orderDetails'], resolve),
      meta: {
        title: "张代驾"
      },
    },
    {
      path: '/costBreakdown',
      name: 'costBreakdown',
      component: resolve => require(['@/pages/copper/costBreakdown'], resolve),
      meta: {
        title: "张代驾"
      }

    },
    {
      path: '/myAccount',
      name: 'myAccount',
      component: resolve => require(['@/pages/copper/myAccount'], resolve),
      meta: {
        title: "张代驾"
      }

    },
    {
      path: '/accountBalance',
      name: 'accountBalance',
      component: resolve => require(['@/pages/copper/accountBalance'], resolve),
      meta: {
        title: "张代驾"
      }

    },
    {
      path: '/invest',
      name: 'invest',
      component: resolve => require(['@/pages/copper/invest'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/advance',
      name: 'advance',
      component: resolve => require(['@/pages/copper/advance'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/bindCard',
      name: 'bindCard',
      component: resolve => require(['@/pages/copper/bindCard'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/myDiscount',
      name: 'myDiscount',
      component: resolve => require(['@/pages/copper/myDiscount'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/serverCenter',
      name: 'serverCenter',
      component: resolve => require(['@/pages/server/serverCenter'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/recentOrders',
      name: 'recentOrders',
      component: resolve => require(['@/pages/server/recentOrders'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/appeal',
      name: 'appeal',
      component: resolve => require(['@/pages/server/appeal'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/messageCenter',
      name: 'messageCenter',
      component: resolve => require(['@/pages/server/messageCenter'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path: '/processing',
      name: 'processing',
      component: resolve => require(['@/pages/server/processing'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/problem',
      name: 'problem',
      component: resolve => require(['@/pages/server/problem'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/share',
      name: 'share',
      component: resolve => require(['@/pages/server/share'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/setup',
      name: 'setup',
      component: resolve => require(['@/pages/Home/setup'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/accountSecurity',
      name: 'accountSecurity',
      component: resolve => require(['@/pages/server/accountSecurity'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/changePhone',
      name: 'changePhone',
      component: resolve => require(['@/pages/Account/changePhone'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/newPhone',
      name: 'newPhone',
      component: resolve => require(['@/pages/Account/newPhone'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/changePassword',
      name: 'changePassword',
      component: resolve => require(['@/pages/Account/changePassword'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/findPassword',
      name: 'findPassword',
      component: resolve => require(['@/pages/Account/findPassword'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/wx',
      name: 'wx',
      component: resolve => require(['@/pages/Account/wx'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/cancelAccount',
      name: 'cancelAccount',
      component: resolve => require(['@/pages/Account/cancelAccount'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/rule',
      name: 'rule',
      component: resolve => require(['@/pages/Account/rule'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/serverUser',
      name:'serverUser',
      component: resolve => require(['@/pages/server/serverUser'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/demo',
      name:'demo',
      component: resolve => require(['@/pages/server/demo'], resolve),
      meta: {
        title: "张代驾"
      }
    },
    {
      path:'/evaluate',
      name:'evaluate',
      component: resolve => require(['@/pages/order/evaluate'], resolve),
      meta: {
        title: "张代驾"
      }
    }
    
  ]
})
