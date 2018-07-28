class User {
  constructor(account, email, password){
    this.account = account
    this.email = email
    this.password = password
  }
}

class UserInfo {
  constructor(account){
    this.account = account
    this.nickname = ''
    this.age = null
    this.address = ''
    this.sex = 'man' // man woman
    this.fav = [] // ['','']
    this.intro = ''
    this.articleCount = 0
    this.pohtoCount = 0
    this.keep = [] // 关注
    this.kept = [] // 被关注
    this.LastLoginTime = new Date()
    this.registerTime = new Date()
  }
}




module.exports = {
  User: User,
  UserInfo: UserInfo
}