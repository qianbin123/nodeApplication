var http = require('http');
var qs = require('querystring');

function send(theName){
  const option = {
    host: '127.0.0.1',
    port: 4005,
    url: '/',
    method: 'POST' 
  }

  var req = http.request(option, function(res){
    // console.log(res);
    res.setEncoding('utf8');
    res.on('data',function(){})
    res.on('end', function(){
      console.log('\n \033[90m request complete! \033[39m ');
      process.stdout.write('\n your name: ');
    });
  })
  
  req.end(qs.stringify({name: theName}))
  req.on('error', function(){
    console.error(`请求遇到问题: ${e.message}`);
  })
}

process.stdout.write('\n your name:');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(name){
  send(name.replace('\n', ''));

})