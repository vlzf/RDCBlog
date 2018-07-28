const expireAfterSeconds = 300

class RegisterCode {
  constructor(account ,email, code){
    this.account = account
    this.email = email
    this.code = code
    this.expireAt = new Date()
    this.expireAt.setSeconds(this.expireAt.getSeconds()+expireAfterSeconds)
  }
}

module.exports = {
  RegisterCode: RegisterCode
}