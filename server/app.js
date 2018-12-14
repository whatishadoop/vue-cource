var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//拦截任何请求，设置cross服务端跨域请求访问
// app.all('*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
//   res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
//   next()
// })

const whiteListUrl = {  // 设置白名单，对于白名单请求路径无需进行认证，直接跳转
  get: [
  ],
  post: [
    '/index/login',
  ]
}

const hasOneOf = (str, arr) => {
  return arr.some(item => item.includes(str))
}

app.all('*', (req, res, next) => {
  let method = req.method.toLowerCase()
  let path = req.path
  if(whiteListUrl[method] && hasOneOf(path, whiteListUrl[method])) next()  // 白名单中的url直接跳转，无需token认证
  else {   // 非白名单中的请求，需要进行token 认证处理
    const token = req.headers.authorization
    if (!token) res.status(401).send('there is no token, please login')  // 若是token不存在则直接返回错误
    else {
      jwt.verify(token, 'abcd', (error, decode) => {  // 对传入的token进行认证，abcd为秘钥解析，
        if (error) res.send({  // token存在过期则会报错
          code: 401,
          mes: 'token error',
          data: {}
        })
        else {   // token 认证通过则重新返回userName生成新的token,继续访问页面
          req.userName = decode.name
          next()
        }
      })
    }
  }
})

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
