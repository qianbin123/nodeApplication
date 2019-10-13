var qs = require('querystring');
var http = require('http');

// http.createServer(function(req, res){
//   var body = '';
//   req.on('data', function(chunk){
//     body += chunk;
//   })
//   req.on('end', function(){
//     res.writeHead(200);
//     res.end('Done');
//     console.log('\n got name \033[90m' + qs.parse(body).name + '\033[39m\n')
//   })
// }).listen(4002);

//利用第三方的up模块对node服务进行热更新
module.exports = http.createServer(function(req, res){
  var body = '';
  req.on('data', function(chunk){
    body += chunk;
  })
  req.on('end', function(){
    res.writeHead(200);
    res.end('Done');
    console.log('\n got name \033[90m' + qs.parse(body).name + '\033[39m\n')
  })
})