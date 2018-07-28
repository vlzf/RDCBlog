const setting = require('../config/emailSetting')
const Erms = require('../class/erms').Erms

const email = setting.emailList

const isValidPassword = (param) => {
  if(!param) return new Erms(false, '密码不得为空！')
  param += ''
  if(param.length < 6){
    return new Erms(false, '密码长度不得小于 6 ！')
  } else if(/[^a-zA-Z0-9]/g.test(param)) {
    return new Erms(false, '密码只能包含数字、字母！')
  } else {
    return new Erms(true)
  }
}

const isValidAccount = (param) => {
  if(!param) return new Erms(false, '账号不得为空！')
  param += ''
  if(param.length < 3){
    return new Erms(false, '账号长度不得小于 3 ！')
  } else if(/ /g.test(param)) {
    return new Erms(false, '用户名不得有空格！')
  } else {
    return new Erms(true)
  }
}

const isValidEmail = (param) => {
  if(!param) return new Erms(false, '邮箱不得为空！')
  param += ''
  var r = email.some((e) => {
    var reg = new RegExp(e + '$')
    return reg.test(param)
  })
  return r ? new Erms(true) : new Erms(false, '不支持该类邮箱')
}

const isValidCode = (param) => {
  if(typeof param !== 'number' || (param+'').length < 6)
    return new Erms(false, '验证码错误')
  else return new Erms(true)
}

module.exports = {
  isValidPassword: isValidPassword,
  isValidAccount: isValidAccount,
  isValidEmail: isValidEmail,
  isValidCode: isValidCode
}