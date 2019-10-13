var connect = require('connect');

var server = connect.createServer();
server.use(connect.static(__dirname + '/website'));

/* 
  其中，next函数做流控制
*/
server.use(function(req, res, next){
  // 记录日志
  console.error(' %s %s', req.method, req.url);
  next();
})

server.use(function(req, res, next){
  if('GET' == req.method && '/images' == req.url.substr(0, 7)){
    // 托管照片
    console.log('托管照片')
  }else {
    //交给其他中间件处理
    next();
  }
})

server.use(function(req, res, next){
  if('GET' == req.method && '/' == req.url){
    // 响应index文件
    console.log('响应index文件')
  }else {
    //交给其他中间件处理
    next();
  }
})

server.use(function(req, res, next){
  // 最后一个中间件，返回404
  res.writeHead(404);
  res.end('Not Found');
})

server.use(connect.logger('dev'));

server.listen(3019);