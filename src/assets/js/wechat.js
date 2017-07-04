
/*global WeixinJSBridge:true*/
var WechatUtil = {
  URL_CONFIG: 'wx/get_jssdk_config',
  isWechatReady: false,
  isWechatError: false,
  Vue: undefined,
  appId: 'wx9a7a4c9593ce3fa6', // 给个默认的，读取到后重新赋值
  shareImageUrl: 'http://master.tounick.com/static/img/logo.png',
  readyFunctionArray: [],
  init (vue) {
    WechatUtil.Vue = vue
    WechatUtil.Vue.http.post(WechatUtil.URL_CONFIG, {}, { method: 'post' }).then((response) => {
      var obj = response.data
      WechatUtil.appId = obj.result.appid
      if (!obj.status) {
        return
      }
      window.wx.config({
        debug: false,
        appId: obj.result.appid,
        timestamp: obj.result.timestamp,
        nonceStr: obj.result.noncestr,
        signature: obj.result.signature, // url
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard'
        ]
      })
      window.wx.ready(function () {
        WechatUtil.isWechatReady = true
        while (WechatUtil.readyFunctionArray.length > 0) {
          var fn = WechatUtil.readyFunctionArray.shift()
          if (fn && typeof fn === 'function') {
            fn()
          }
        }
      })
      window.wx.error(function () {
        WechatUtil.isWechatError = true
      })
    }, (response) => {})
  },
  // 分享"学习/文章"列表
  shareArticleList () {
    // console.log('shareArticleList')
    // console.log(arguments)
    if (!WechatUtil.isWechatReady || WechatUtil.isWechatError) {
      return
    }

    const title = '【淘力师徒社区】这里有最精彩的文章，这里有蓝领大咖，赶快加入吧'
    const desc = '蓝领从业者最时髦的学习方式，找师父，找培训，经验交流，淘力师徒社区全都有。'
    const link = WechatUtil.getShareLink('/study')
    const imgUrl = WechatUtil.shareImageUrl

    WechatUtil.showMenu()
    window.wx.onMenuShareTimeline({ title, link, imgUrl })
    window.wx.onMenuShareAppMessage({ title, desc, link, imgUrl })
  },
  // 分享"学习/文章"详情
  shareArticle (articleTitle, articleDesc, id) {
    // console.log('shareArticle')
    // console.log(arguments)
    if (!WechatUtil.isWechatReady || WechatUtil.isWechatError) {
      return
    }

    const title = articleTitle + '-淘力师徒社区'
    const desc = articleDesc
    const link = WechatUtil.getShareLink('/study/detail/' + id)
    const imgUrl = WechatUtil.shareImageUrl

    WechatUtil.showMenu()
    window.wx.onMenuShareTimeline({ title, link, imgUrl })
    window.wx.onMenuShareAppMessage({ title, desc, link, imgUrl })
  },
  // 分享"培训/淘力大学"列表
  shareTrainList () {
    // console.log('shareTrainList')
    // console.log(arguments)
    if (!WechatUtil.isWechatReady || WechatUtil.isWechatError) {
      return
    }

    const title = '努力学习，提升自己，快来淘力大学和我一起参加培训吧！'
    const desc = '淘力大学提供各种蓝领培训，学厨师，学护工，学技工，提高收入，找工作，找兼职，就来淘力大学。'
    const link = WechatUtil.getShareLink('/train')
    const imgUrl = WechatUtil.shareImageUrl

    WechatUtil.showMenu()
    window.wx.onMenuShareTimeline({ title, link, imgUrl })
    window.wx.onMenuShareAppMessage({ title, desc, link, imgUrl })
  },
  // 分享"培训/淘力大学"详情
  shareTrain (trainName, trainDesc, id) {
    // console.log('shareTrain')
    // console.log(arguments)
    if (!WechatUtil.isWechatReady || WechatUtil.isWechatError) {
      return
    }

    const title = '我正在报名淘力大学 ' + trainName + ' ，一起来提升自己吧！'
    const desc = trainDesc
    const link = WechatUtil.getShareLink('/train/detail/' + id)
    const imgUrl = WechatUtil.shareImageUrl

    WechatUtil.showMenu()
    window.wx.onMenuShareTimeline({ title, link, imgUrl })
    window.wx.onMenuShareAppMessage({ title, desc, link, imgUrl })
  },
  // 分享"师父"列表
  shareMasterList () {
    // console.log('shareMasterList')
    // console.log(arguments)
    if (!WechatUtil.isWechatReady || WechatUtil.isWechatError) {
      return
    }

    const title = '淘力师徒社区-全国最大的蓝领知识、技能、经验分享社区'
    const desc = '淘力师徒社区是一个提供蓝领知识、技能、经验交流和学习的平台。就来淘力大学。找师父、学技能、蓝领知识培训，就来淘力师徒社区。'
    const link = WechatUtil.getShareLink('/master')
    const imgUrl = WechatUtil.shareImageUrl

    WechatUtil.showMenu()
    window.wx.onMenuShareTimeline({ title, link, imgUrl })
    window.wx.onMenuShareAppMessage({ title, desc, link, imgUrl })
  },
  // 分享"师父"详情
  shareMaster (masterName, masterTitle, id) {
    // console.log('shareMaster')
    // console.log(arguments)
    if (!WechatUtil.isWechatReady || WechatUtil.isWechatError) {
      return
    }

    const title = '【淘力师父】' + masterName + '-' + masterTitle
    const desc = '淘力师徒社区是一个提供蓝领知识、技能、经验交流和学习的平台。就来淘力大学。找师父、学技能、蓝领知识培训，就来淘力师徒社区。'
    const link = WechatUtil.getShareLink('/master/detail/' + id)
    const imgUrl = WechatUtil.shareImageUrl

    WechatUtil.showMenu()
    window.wx.onMenuShareTimeline({ title, link, imgUrl })
    window.wx.onMenuShareAppMessage({ title, desc, link, imgUrl })
  },
  // 分享"收徒课程"详情
  shareMasterCourse (masterName, courseTitle, id) {
    // console.log('shareMasterCourse')
    // console.log(arguments)
    if (!WechatUtil.isWechatReady || WechatUtil.isWechatError) {
      return
    }

    const title = masterName + ':' + courseTitle + '-淘力师徒社区'
    const desc = '淘力大学提供各种蓝领培训，学厨师，学护工，学技工，提高收入，找工作，找兼职，就来淘力大学。'
    const link = WechatUtil.getShareLink('/master/course/detail/' + id)
    const imgUrl = WechatUtil.shareImageUrl

    WechatUtil.showMenu()
    window.wx.onMenuShareTimeline({ title, link, imgUrl })
    window.wx.onMenuShareAppMessage({ title, desc, link, imgUrl })
  },
  hideMenu () {
    // console.log('hideMenu')
    if (!WechatUtil.isWechatReady || WechatUtil.isWechatError) {
      return
    }
    window.wx.hideOptionMenu()
  },
  showMenu () {
    // console.log('showMenu')
    if (!WechatUtil.isWechatReady || WechatUtil.isWechatError) {
      return
    }
    window.wx.showOptionMenu()
  },
  exec (fn) {
    // console.log('exec')
    if (!fn || typeof fn !== 'function') {
      return
    }

    if (WechatUtil.isWechatReady) {
      fn()
    } else {
      WechatUtil.readyFunctionArray.push(fn)
    }
  },
  getAuthUrl (strRedirectUrl, bUserInfo) {
    let appId = WechatUtil.appId
    let scope = bUserInfo ? 'snsapi_userinfo' : 'snsapi_base'
    let redirectUri = encodeURIComponent(strRedirectUrl)
    return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId +
      '&redirect_uri=' + redirectUri +
      '&response_type=code&scope=' + scope +
      '&state=123#wechat_redirect'
  },
  getShareLink (url) {
    let pre = window.location.protocol + '//' + window.location.host + '?p='
    return pre + encodeURIComponent(url)
  },
  payParams: {},
  // 初始化支付，获取相关支付参数
  payInit (option) {
    const that = this
    that.callback = option.callback // 支付成功回调
    that.failCallback = option.failCallback // 支付失败回调
    that.getPayParams(option.vue, option.url, option.initFail) // 获取支付初始化参数
  },
  // 绑定支付事件
  bindPay () {
    const that = this
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady)
        document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady)
      }
    } else {
      that.onBridgeReady()
    }
  },
  // 获取支付参数
  getPayParams (vue, url, callback) {
    const that = this
    vue.$http.post(url).then((response) => {
      const ret = response.data
      const data = response.data.result
      if (ret.status) {
        that.payParams = {
          'appId': data.appId, // 公众号名称，由商户传入
          'timeStamp': data.timeStamp, // 时间戳
          'nonceStr': data.nonceStr, // 随机串
          'package': data.package, // 扩展包
          'signType': data.signType, // 微信签名方式
          'paySign': data.paySign
        }
      } else {
        typeof callback === 'function' && callback()
      }
    }, (response) => {
      typeof callback === 'function' && callback()
      // console.log('获取支付参数失败')
    })
  },
  onBridgeReady () {
    const that = this
    WeixinJSBridge.invoke(
    'getBrandWCPayRequest', that.payParams, function (res) {
      switch (res.err_msg) {
        case 'get_brand_wcpay_request:cancel':
          typeof that.failCallback === 'function' && that.failCallback()
          // alert('用户取消支付！')
          break
        case 'get_brand_wcpay_request:fail':
          typeof that.failCallback === 'function' && that.failCallback()
          // alert('支付失败！（' + res.err_desc + '）')
          break
        case 'get_brand_wcpay_request:ok':
          // alert('支付成功！')
          typeof that.callback === 'function' && that.callback()
          break
        default:
          typeof that.failCallback === 'function' && that.failCallback()
          // alert(JSON.stringify(res))
          break
      }
    })
  },
  isWechatBrowser () {
    return navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1
  }
}

export {
  WechatUtil
}
