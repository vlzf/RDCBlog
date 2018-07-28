const setting = require('../config/dataSetting')
const MongoClient = require('mongodb').MongoClient

const origin = setting.origin
const pathname = setting.pathname
const sitename = setting.sitename.UserInfo

function addUserInfo(objUserInfo){
  return new Promise((resolve, reject)=>{
    MongoClient.connect(origin, (err, db)=>{
      if(err) {
        reject(err)
        throw err
      }
      var site = db.db(pathname).collection(sitename)
      site.insert(objUserInfo, (err, r)=>{
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

module.exports = {
  addUserInfo: addUserInfo
}