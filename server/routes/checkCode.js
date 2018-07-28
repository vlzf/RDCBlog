const router = require('express').Router()
const sendEmail = require('../common/sendEmail')
const Erms = require('../class/erms').Erms
const RegisterCode = require('../class/registerCode').RegisterCode
const dataRC = require('../data/registerCode')
const checkP = require('../common/checkParam')
const dataUr = require('../data/user')

var title = 'RDC Blog 账号注册', 
    content = '<h4>{{account}}，您的验证码是<a style="color: blue;">{{code}}</a>。</h4>'

router.post('/', (req, res)=>{
  // 获取参数
  var {
    account,
    email
  } = req.body
  
  // 参数验证
  var r1 = checkP.isValidAccount(account)
  var r2 = checkP.isValidEmail(email)
  if(!r1.code) return res.json(r1)
  if(!r2.code) return res.json(r2)

  // 生成验证码
  var code = (Math.random() * 1000000) | 0
  var objCode = new RegisterCode(account, email, code)

  // 邮件内容
  ctx = content.replace(/{{code}}/g, code).replace(/{{account}}/g,account)

  // 验证账号或邮箱是否已存在
  dataUr.findUser(account, email).then((e)=>{
    if(e.length>0) return Promise.reject('账号或邮箱已存在')
    return dataRC.addCode(objCode) // 保存验证码
  }).then((e)=>{ // 保存成功
    return sendEmail(email, title, ctx) // 发邮件
  }).then((e)=>{ // 发邮件成功
    res.json(new Erms(true, '发送成功'))
  }).catch((e)=>{ // 失败
    res.json(new Erms(false, e))
  })
  
})

module.exports = router