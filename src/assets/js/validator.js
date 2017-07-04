import rules from './validator_rules.js'
function Validator (options) {
  this.result = this.checkfun(options)
}
Validator.prototype.checkfun = function (options) {
  // const that = this
  for (let i = 0, len = options.length; i < len; i++) {
    options[i].validator = (options[i].validator && typeof options[i].validator === 'string') ? rules[options[i].validator] : options[i].validator

    if (options[i].required) {
      if (!options[i].value) {
        options[i].error(options[i].tipMsg)
        return false
      }
    }
    if (options[i].required && options[i].regExp && !options[i].regExp.test(options[i].value)) {
      options[i].error(options[i].tipMsg)
      return false
    }
    if (options[i].required && options[i].validator && !options[i].validator(options[i].value)) {
      options[i].error(options[i].tipMsg)
      return false
    }
    // 非空验证， 但对输入数据格式有规则限制
    if (!options[i].required && options[i].value && options[i].validator && !options[i].validator(options[i].value)) {
      options[i].error(options[i].tipMsg)
      return false
    }
    if (!options[i].required && options[i].value && options[i].regExp && !options[i].regExp.test(options[i].value)) {
      options[i].error(options[i].tipMsg)
      return false
    }
  }
  return true
}

export {
  Validator
}
