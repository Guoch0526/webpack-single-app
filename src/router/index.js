/**
* title： 如果页面 title 相对固定，不会随着页面的数据进行改动可以直接在 meta 中添加 title，在路由切换后，会自动设置 title 的值
*/
export default {
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      name: 'index',
      component (resolve) {
        require(['../views/index'], resolve)
      },
      meta: {
        title: '首页'
      }
    }, {
      path: '*',
      name: '404',
      component (resolve) {
        require(['../views/404'], resolve)
      },
      meta: {
        title: '404，找不到页面'
      }
    }
  ]
}
