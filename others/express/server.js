var express = require('express');
var search = require('./search');
var request = require('superagent');

//创建服务器
var app = express.createServer();

// 通过set方法来修改默认配置项
app.set("view engine", "ejs");
// 可以理解为'views': __dirname + '/views'
app.set('views', __dirname + '/views');
app.set('view options', { layout: false});
console.log(app.set('views'))

app.get('/', function(req, res){
  /*
    express 为response 对象提供render方法，该方法完成如下三件事：
    1、初始化引擎模版
    2、读取图文件并传给模版引擎
    3、获取解析后的HTML页面并作为响应发送给客户端
  */
  res.render('index');
})

app.get('/search', function(req, res, next){
  search(req.query.q, function(err, tweets){
    if(err) return next(err);
    res.render('search', {results: tweets, search: req.query.q});
  })
})

module.exports = function search(query, fn){
  request.get('http://search.twitter.com/search.json')
    .data({q: query})
    .end(function(res){
      if(res.body && Array.isArray(res.body.results)){
        return fn(null, res.body.results);
      }
      fn(new Error('Bad twitter response'));
    })
}

app.listen(3007);