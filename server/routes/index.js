var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

const getPasswordByName = (name) => {  //  获取登录密码，此处默认为123
  return { password: '123' }
}

router.post('/getUserInfo', function(req, res, next) {  // 获取用于登录名
  res.status(200).send({
    code: 200,
    data: {
      name: 'Lison'
    }
  })
});

router.post('/login', function(req, res, next) { // 登录操作
  const { userName, password } = req.body
  if (userName) {
    const userInfo = password ? getPasswordByName(userName) : ''  // 若密码存在，则根据用户用户名查询用户信息
    if (!userInfo || !password || userInfo.password !== password) { //若用户不存在，密码不存在，用于密码与后台用户密码不一样则直接返回错误
      res.status(401).send({
        code: 401,
        mes: 'user name or password is wrong',
        data: {}
      })
    } else {  // 若正确则返回登录成功，返回jwt形式token
      res.send({
        code: 200,
        mes: 'success',
        data: {
          token: jwt.sign({ name: userName }, 'abcd', {  //  abcd为秘钥， 10过期时间单位10s
            expiresIn: 10
          })
        }
      })
    }
  } else {
    res.status(401).send({
      code: 401,
      mes: 'user name is empty',
      data: {}
    })
  }
});

module.exports = router;
