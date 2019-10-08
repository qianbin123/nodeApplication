require('http').createServer(function(req, res){
  res.writeHead(200);
  res.write('Hello');

   /* 
      在调用end前，可以多次调用write方法来发送数据；
      使用end，Node会结束响应，并不在允许往这次响应中发送数据
   */
  setTimeout(function(){
    res.end('world');
  }, 5000);
}).listen(3091);