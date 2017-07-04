#webpack-single-app
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 模拟数据配置
vue结合rap调式mock数据

### 代理配置
``` 
// config/proxy-config.js
// items 为数组集，可配置多个接口 
var proxy = {
  defaultTarget: 'http://127.0.0.1:9527', // 默认代理目标地址
  items: [{
    name: '/member'
    // target: 'https://www.easy-mock.com/mock/58ff3c475e43ae5dbea5fe84/example_1493122119366' // 存在特殊的地址可配置此项
  }, {
    name: '/recruit'
  }]
}
```

### RAP Serevr 配置

``` 
// rap-server/config_rap.js
// https://www.npmjs.com/package/rap-node-plugin
var configRap = {
  base: {
    projectId: '33',                // 项目ID，默认请参见config 
    port: 80,                      // 端口，默认请参见config 
    host: 'rap.tounick.com',   // 主机，默认请参见config 
    mock: '/mockjsdata/' // 返回mock json 数据
  },
  urls: [
    '/member/mobile/searchUser',
    '/recruit/detail'
  ]
}
```
## 包安装规则
* dependencies：
安装生产环境依赖的包，简单点：该包最终会打包进生成环境的代码中;如： vue、 vue-router、axios等
安装命令： npm install PACKAGE_NAME@VERSION --save

* devDependencies： 
安装开发环境依赖的包，简单点：该包不会打包进生产环境的代码中，主要负责构建工具的工作；如: webpack、less-loader等
安装命令： npm install PACKAGE_NAME@VERSION --save-dev

## 开发中使用 shrinkwrap
### 在开发过程中，引入一个新包的流程

1. npm install PACKAGE_NAME@VERSION --save 获取特定版本的包
2. 测试功能
3. 如果在 install 后将包的版本信息写入 npm-shrinkwrap.json后可以不用在执行 npm shrinkwrap;
测试功能正常后，执行 npm shrinkwrap 把依赖写入 shrinkwrap 文件
4. 在代码仓库中提交 shrinkwrap / package.json 描述

### 升级一个包的流程

1. npm outdated 获取项目所有依赖的更新信息
2. npm install PACKAGE_NAME@VERSION --save 获取特定版本的包
3. 测试功能
4. 如果在 install 后将包的版本信息写入 npm-shrinkwrap.json后可以不用在执行 npm shrinkwrap;
测试功能正常后，执行 npm shrinkwrap 把依赖写入 shrinkwrap 文件
5. 在代码仓库中提交 shrinkwrap / package.json 描述

### 删除一个包的流程如下

1. npm uninstall PACKAGE_NAME --save 删除这个包
2. 测试功能
3. 如果在 install 后将包的版本信息写入 npm-shrinkwrap.json后可以不用在执行 npm shrinkwrap;
测试功能正常后，执行 npm shrinkwrap 把更新的依赖写入 shrinkwrap 文件
4. 在代码仓库中提交 shrinkwrap / package.json 描述