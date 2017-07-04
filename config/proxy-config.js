var proxy = {
  defaultTarget: 'https://www.easy-mock.com/mock/58ff3c475e43ae5dbea5fe84/example_1493122119366',
  items: [{
    name: '/member',
    target: 'https://www.easy-mock.com/mock/58ff3c475e43ae5dbea5fe84/example_1493122119366'
  }, {
    name: '/test'
  }]
}

const proxyConfig = (function () {
  var obj = {}
  proxy.items.forEach(function (item) {
    if (item.target) {
      obj[item.name] = {
        target: item.target, // 代理ajax请求地址
        changeOrigin: true,
        secure: false
      }
    } else {
      obj[item.name] = {
        target: proxy.defaultTarget, // 代理ajax请求地址
        changeOrigin: true,
        secure: false
      }
    }
    obj[item.name].pathRewrite = {}
    obj[item.name].pathRewrite[item.name] = item.name// 代理地址替换标识
  })
  return obj
})()

module.exports = proxyConfig
