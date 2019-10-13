var http = require('http');

const option ={
  host: '127.0.0.1',
  port: 3020,
  url: '/',
  method: 'GET'
}

/*
  使用 http.request() 时，必须始终调用 req.end() 来表示请求的结束，即使没有数据被写入请求主体。
  在创建完一个请求之后，在发送给服务器前还可以和request对象进行交互
*/
const req = http.request(option, function(res){
  var body = '';
  res.setEncoding('utf8');
  res.on('data',function(chunk){
    body += chunk;
  })
  res.on('end', function(){
    console.log('\n We got : \033[96m' + body + '\033[39m\n');
  })
});

req.end();