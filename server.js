var express = require('express');
var path = require('path');
var fs = require('fs');
var uuid = require('uuid/v1');
var app = express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

var readFile = function () {
  return new Promise(function (resolve, reject) {
    fs.readFile(path.join(__dirname, './todoList.json'), 'utf-8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

var writeFile = function (data) {
  var json = JSON.stringify(data);
  console.log(json, 'json');
  return new Promise(function (resolve, reject) {
    fs.writeFile(path.join(__dirname, './todoList.json'), json, function (err) {
      console.log(err, 'err');
      if (err) {
        reject(err);
      } else {
        resolve(json)
      }
    });
  })
}

// 查询所有数据
app.get('/list', function (req, res) {
  readFile().then(function (data) {
    res.json({
      code: 200,
      data,
      message: 'success'
    })
  }).catch(function (err) {
    res.json({
      code: 500,
      message: err,
    })
  });
});

// 增加数据
app.get('/create', function (req, res) {
  var query = req.query;
  var obj = {
    id: uuid(),
    name: query.name, // 标题
    status: query.status, // 状态
    createTime: new Date().getTime(), // 创建时间
    info: query.info, // 详细内容
    weight: query.weight, // 重要性（hgin, middle, low）
  }
  readFile().then(function (data) {
    var json = data.concat(obj);
    writeFile(json).then(function () {
      res.json({
        code: 200,
        message: 'success',
      });
    });
  }).catch(function (err) {
    console.log(err);
    res.json({
      code: 500,
      message: err,
    });
  });
});

// 删除数据
app.get('/delete', function (req, res) {
  var query = req.query;

  readFile().then(function (data) {
    var id = query.id;
    var json = data.filter(item => item.id !== id);
    writeFile(json).then(function () {
      res.json({
        code: 200,
        message: 'success',
      });
    });
  }).catch(function (err) {
    console.log(err);
    res.json({
      code: 500,
      message: err,
    });
  });
});

// 更新数据
app.get('/update', function (req, res) {
  var query = req.query;

  readFile().then(function (data) {
    var id = query.id;
    var obj = {
      id,
      name: query.name, // 标题
      status: query.status, // 状态
      createTime: new Date().getTime(), // 创建时间
      info: query.info, // 详细内容
      weight: query.weight, // 重要性（hgin, middle, low）
    }

    var index = data.findIndex(item => item.id === id);
    data.splice(index, 1, obj);
    writeFile(data).then(function () {
      res.json({
        code: 200,
        message: 'success',
      });
    });
  }).catch(function (err) {
    console.log(err);
    res.json({
      code: 500,
      message: err,
    });
  });
});


app.listen(3001, function () {
  console.log('server on start %s', 3001);
});