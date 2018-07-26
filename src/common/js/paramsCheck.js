export class EMs {
  constructor(res, mes){
    this.code = res || false
    this.mes = mes || ''
  }
}

const email = [
  '@gmail.com',
  '@yahoo.com',
  '@msn.com',
  '@hotmail.com',
  '@aol.com',
  '@ask.com',
  '@live.com',
  '@qq.com',
  '@0355.net',
  '@163.com',
  '@163.net',
  '@263.net',
  '@3721.net',
  '@yeah.net',
  '@googlemail.com',
  '@mail.com',
  '@126.com',
  '@sina.com',
  '@21cn.com',
  '@sohu.com',
  '@yahoo.com.cn',
  '@tom.com',
  '@etang.com',
  '@eyou.com',
  '@56.com',
  '@x.cn',
  '@chinaren.com',
  '@sogou.com',
  '@citiz.com'
]

export const isValidPassword = (param) => {
  param += ''
  if(param.length < 6){
    return new EMs(false, '密码长度不得小于 6 ！')
  } else if(/[^a-zA-Z0-9]/g.test(param)) {
    return new EMs(false, '密码只能包含数字、字母！')
  } else {
    return new EMs(true)
  }
}

export const isValidAccount = (param) => {
  param += ''
  if(param.length < 3){
    return new EMs(false, '账号长度不得小于 3 ！')
  } else if(/ /g.test(param)) {
    return new EMs(false, '用户名不得有空格！')
  } else {
    return new EMs(true)
  }
}

export const isValidEmail = (param) => {
  param += ''
  var r = email.some((e) => {
    var reg = new RegExp(e + '$')
    return reg.test(param)
  })
  return r ? new EMs(true) : new EMs(false, '不支持该类邮箱')
}