const router = require('express').Router()
const checkP = require('../common/checkParam')
const Erms = require('../class/erms').Erms
const dataUr = require('../data/user')
const dataRC = require('../data/registerCode')
const crUr = require('../class/user')
const dataUrInfo = require('../data/userInfo')

router.post('/', (req, res) => {
  // 获取参数
  var {
    account = '',
    email = '',
    password = '',
    checkCode = ''
  } = req.body
  console.log(account, email, password, checkCode)
  
  // 检查参数
  var r1 = checkP.isValidAccount(account)
  var r2 = checkP.isValidEmail(email)
  var r3 = checkP.isValidPassword(password)
  var r4 = checkP.isValidCode(checkCode)
  if(!r1.code) return res.json(r1)
  if(!r2.code) return res.json(r2)
  if(!r3.code) return res.json(r3)
  if(!r4.code) return res.json(r4)

  // 创建用户实例
  var user = new crUr.User(account, email, password)
  var userInfo = new crUr.UserInfo(account)

  // 检查账号或邮箱是否存在
  dataUr.findUser(account, email)
  .then((e)=>{
    if(e.length>0) return Promise.reject('账号或邮箱已存在存在')
    return dataRC.findCode(account, email, checkCode) // 找验证码
  }).then((e)=>{
    if(!e.length) return Promise.reject('验证码错误！')
    return dataUr.addUser(user) // 存入用户账号
  }).then(()=>{
    return dataUrInfo.addUserInfo(userInfo) // 初始化用户信息
  }).then(()=>{
    res.json(new Erms(true, '注册成功！'))
  }).catch((e)=>{
    res.json(new Erms(false, e))
  })


})

module.exports = router