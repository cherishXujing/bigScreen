import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/pages/index'], resolve),
      meta: {
        title: '数据监测'
      }
    },
    {
      path: '/test',
      name: 'indexTest',
      component: (resolve) => require(['@/pages/indexTest'], resolve),
      meta: {
        title: '数据监测测试'
      }
    }
  ]
})
