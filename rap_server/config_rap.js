// https://www.npmjs.com/package/rap-node-plugin
var configRap = {
  base: {
    projectId: '25',                // 项目ID，默认请参见config 
    port: 80,                       // 端口，默认请参见config 
    host: 'rap.tounick.com',    // 主机，默认请参见config 
    mock: '/mockjsdata/' //返回mock json 数据
  },
  urls: [
    '/member/stat/staff/report', 
    '/member/stat/staff/detail'
  ]
}

module.exports = configRap