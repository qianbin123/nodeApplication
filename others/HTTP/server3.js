/* 
  传图到前端
*/
//方法一：
// require('http').createServer(function(req, res){
//   res.writeHead(200,{'Content-Type': 'image/png'});
//   var stream = require('fs').createReadStream('./img.png');
//   stream.on('data', function(data){
//     res.write(data);
//   })
//   stream.on('end', function(){
//     res.end();
//   })
// }).listen(3002);

//方法二：
require('http').createServer(function(req, res){
  res.writeHead(200,{'Content-Type': 'image/png'});
  require('fs').createReadStream('./img.png').pipe(res);
}).listen(3003)

//在浏览器打开http://localhost:3002/即可查看到图片