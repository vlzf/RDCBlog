const MongoClient = require('mongodb').MongoClient
const setting = require('../config/dataSetting')

const origin = setting.origin
const pathname = setting.pathname
const sitename = setting.sitename.User

function addUser(objUser){
  return new Promise((resolve,reject)=>{
    MongoClient.connect(origin, (err, db)=>{
      if(err) {
        reject(err)
        throw err
      }
      var site = db.db(pathname).collection(sitename)
      site.insert(objUser, (err, r)=>{
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

function findUser(account, email){
  return new Promise((resolve, reject)=>{
    MongoClient.connect(origin, (err, db)=>{
      if(err){
        reject(err)
        throw err
      }
      var site = db.db(pathname).collection(sitename)
      site.find({
        $or: [
          {
            account: account || ''
          },
          {
            email: email || ''
          }
        ]
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



function deleteUser(account, email, password) {
  return new Promise((resolve, reject)=>{
    MongoClient.connect(origin, (err, db)=>{
      if(err){
        reject(err)
        throw err
      }
      var site = db.db(pathname).collection(sitename)
      site.deleteMany({
        account: account,
        email: email,
        password: password
      }, (err, r)=>{
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

// function changePass(account, email, password) {
//   return new Promise((resolve, reject)=>{
//     MongoClient.connect(origin, (err, db)=>{
//       if(err){
//         reject(err)
//         throw err
//       }
//       var site = db.db(pathname).collection(sitename)
//       site.deleteMany({
//         account: account,
//         email: email,
//         password: password
//       })
//       (err, r)=>{
//         if(err){
//           reject(err)
//           throw err
//         }
//         db.close()
//         resolve(r)
//       }
//     })
//   })
// }

module.exports = {
  addUser: addUser,
  findUser: findUser,
  deleteUser: deleteUser
}