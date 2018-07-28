const nodemailer = require('nodemailer');
const setting = require('../config/emailSetting')
const checkP = require('./checkParam')

const transporter = nodemailer.createTransport(setting.set)


module.exports = function (to, title, html) {
  var mailOption = {
    to: to,
    from: setting.set.auth.user,
    subject: title,
    html: html
  }
  return new Promise((resolve, reject)=>{
    if(!checkP.isValidEmail(to).code) {
      return reject('不支持该类邮箱！')
    }
    transporter.sendMail(mailOption, (e,info)=>{
      if(e) {
        return reject(e)
      }
      console.log('Message sent: ' + info.response)
      reject(info.response)
      transporter.close();
    })
  })
}




