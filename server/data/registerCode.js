const setting = require('../config/dataSetting')
const MongoClient = require('mongodb').MongoClient

const origin = setting.origin
const pathname = setting.pathname
const sitename = setting.sitename.RegisterCode

let index = 0
const expireTime = 0


function addCode(objCode){
  return new Promise((resolve, reject) => {
    MongoClient.connect(origin, (err, db)=>{ // 连接mdb
      if(err) {
        reject(err)
        throw err;
      }
      var site = db.db(pathname).collection(sitename)

      if(index === 0) { // 第一次设置过期时间
        index++
        site.createIndex({ "expireAt": 1 }, { expireAfterSeconds: expireTime }, function(err){
          if(err) {
            reject(err)
            throw err
          }
          site.insert(objCode, (err, r)=>{
            if(err) {
              reject(err)
              throw err;
            }
            db.close()
            resolve(r)
          })
        })
      } else { // 插入验证码
        site.insert(objCode, (err, r)=>{
          if(err) {
            reject(err)
            throw err;
          }
          db.close()
          resolve(r)
        })
      }
    })
  })
}


function findCode(account, email, code) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(origin, (err, db)=>{
      if(err){
        reject(err)
        throw err
      }
      var site = db.db(pathname).collection(sitename)
      site.find({
        account: account,
        email: email,
        code: code
      }).toArray((err, r)=>{
        if(err){
          reject(err)
          throw err
        }
        db.close()
        resolve(r)
      })
    })
  })
}



function deleteCode(email, code){
  return new Promise((resolve, reject) => {
    MongoClient.connect(origin, (err, db)=>{
      if(err){
        reject(err)
        throw err
      }
      var site = db.db(pathname).collection(sitename)
      site.deleteMany({
        email: email,
        code: code
      }, (err, r)=>{
        if(err) {
          reject(err)
          throw err
        }
        db.close()
        resolve(r)
      })
    })
  })
}



module.exports = {
  addCode: addCode,
  findCode: findCode,
  deleteCode: deleteCode
}