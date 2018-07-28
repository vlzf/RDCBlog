const bodyParser = require('body-parser')
const urlencoded = bodyParser.urlencoded({extended:false})
const json = bodyParser.json()

const session = require('express-session');
const ms = require('connect-mongo')(session);

module.exports = function(app) {

  app.use(session({
    name: 'RDCBlog',
    secret: '123456',
    resave: true,
    saveUninitiallized: false,
    cookie: {
      maxAge: 36000
    },
    store: new ms({
      url: 'mongodb://localhost:27017/RDCBlog'
    })
  }));
  
  app.use(urlencoded)
  app.use(json)


  // app.use('/login', require(''))
  app.use('/register', require('./register'))
  app.use('/checkCode', require('./checkCode'))
  // app.use('/findBack', require(''))
  return app
}