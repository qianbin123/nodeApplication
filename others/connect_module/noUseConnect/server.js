var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
  if('GET' == req.method && '/images' == req.url.substr(0, 7) && '.jpg' == req.url.substr(-4)){
    //检查文件是否存在, stat获取文件信息
    fs.stat(__dirname + req.url, function(err, stat){
      if(err || !stat.isFile()){
        res.writeHead(404);
        res.end('Not Found');
        return
      }
      serve(__dirname + req.url, 'application/jpg');
    })
  }else if('GET' == req.method && '/' == req.url){
    serve(__dirname + '/index.html', 'text/html');
  }else{
    res.writeHead(404);
    res.end('Not Found');
  }

  function serve(path, type){
    res.writeHead(200, {'Content-Type': type});
    /* 
      方法一和方法二等效：
      HTTP响应对象是一个只写流，从文件创建的流是只读的，将文件系统流接（pipe）到HTTP响应流中
    */
    // 方法一：
    // fs.createReadStream(path).pipe(res);
  
    // 方法二：
    fs.createReadStream(path)
      .on('data', function(data){
        res.write(data);
      })
      .on('end', function(){
        res.end();
      })
  }
})

server.listen(3006);