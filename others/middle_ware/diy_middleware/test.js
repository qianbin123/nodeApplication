var connect = require('connect');
var time = require('./request-time');

// 创建服务器
var server = connect.createServer();
// 记录请求情况
server.use(connect.logger('dev'));

// 实现中间件
server.use(time({time: 500}));

// 实现快速响应
server.use(function(req, res, next){
  if('/a' == req.url){
    res.writeHead(200);
    res.end('Fast');
  }else{
    next();
  }
})

// 实现慢速响应
server.use(function(req, res, next){
  if('/b' == req.url){
    setTimeout(function(){
      res.writeHead(200);
      res.end('Slow');
    }, 1000)
  }else{
    next();
  }
})

// 监听
server.listen(3000); 