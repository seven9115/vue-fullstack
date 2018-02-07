"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');

router.use(expressJwt({secret: "secret"}).unless({path: ["/api/login"]}));
router.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(200).send({errorCode:6,restbody:"token过期"});
  }
});
/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
router.post("/api/authToken", function(req, res) {
  res.send({errorCode:0,restbody:"登录成功"})
})
router.post("/api/login", function(req, res) {
  const user = req.body.user;
  const password = req.body.password;

  if (!user) {
    return res.status(400).send("user require");
  }
  if (!password) {
    return res.status(400).send("password require");
  }

  if (user != "admin" && password != "password") {
    return res.status(401).send("invaild password");
  }
  // 通过模型去查找数据库
  const userModel = {
    'user': req.body.user,
    'password': req.body.password
  }
  models.User.findOne(userModel, (err,data) => {
      if (err) {
          res.send(err)
      } else {
        if(data){
          const authToken = jwt.sign({user: user}, "secret")
          res.status(200).json({errorCode:0,restbody:{token: authToken}})
        }
        else{
          res.send({errCode:1,restbody:"用户名或密码错误"})
        }
      }
  });

});

// 获取已有博客账号接口
router.get('/api/users',(req,res) => {
    // 通过模型去查找数据库
    models.User.find((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

router.post('/api/users',(req,res) => {
    // 通过模型去查找数据库
    var user = new models.User({
    	title:req.body.title,
    	website:req.body.website
    });
    user.save((err,data) => {
    	if (err) {
    		res.send(err);
    	} else {
    		res.send(data);
    	}
    });
});

router.put('/api/users/:id',(req,res) => {
	return models.User.findById(req.params.id,(err,user) => {
		if(!user){
			res.statusCode = 404;
			return res.send({ error: "未找到该博客"});
		}
		user.title = req.body.title;
		user.website = req.body.website;
		return user.save((err,data) => {
			if (!err) {
                return res.send({ status: 'OK', user:user });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: '服务器异常' });
                }
            }
		})
	})
}) 

router.delete('/api/users/:id',(req,res) => {
	return models.User.findById(req.params.id,(err,user) => {
		if(!user){
			res.statusCode = 404;
			return res.send({error: "未找到该博客"});
		}
		return user.remove((err) => {
			if(!err){
				return res.send({ status: "删除成功"})
			} else {
				res.statusCode = 500;
				return res.send({ error: "服务器异常"})
			}
		})
	})
})

/* 图片上传路由 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({storage: storage}).single('file');
router.post('/api/uploader', function(req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send({
        errorCode: 12,
        restbody: err
      })
    }
    return res.send({
      errorCode: 0,
      restbody:{"path": "uploads/" + path.basename(req.file.path)}
    });
  })
});
module.exports = router;