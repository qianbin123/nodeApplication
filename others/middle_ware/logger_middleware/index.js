var connect = require('connect');
var server = connect.createServer();

// logger 中间件会将请求和响应信息都打印到控制台
// server.use(connect.logger('dev'));

// 记录请求方法和IP地址
// server.use(connect.logger(`:method :remote-addr`));

// 记录响应内容长度（content-length）和 信息（content-type）
server.use(connect.logger('type is :res[content-type], length is' + ':res[content-length] and it took :response-time ms.'));

server.use(function(req, res, next){
    if('/' == req.url){
      res.writeHead(200);
      res.end('Hello World');
    }else{
      next();
    }
  }
)


server.listen(3033);