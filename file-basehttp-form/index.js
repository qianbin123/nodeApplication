var http = require('http');
var qs = require('querystring');

http.createServer(function(req, res){
  if('/' == req.url){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end([
      '<form method="POST" action="/url">',
        '<h1>My Form</h1>',
        '<fieldset>',
        '<label>Personal information</label>',
        '<p>What is your name?</p>',
        '<input type="text" name="name">',
        '<p><button>Submit</button></p>',
      '</form>'
    ].join(''));
  }else if('/url' == req.url && req.method == 'POST'){
    var body = '';
    req.on('data', function(chunk){
      console.log(chunk)       //比如：<Buffer 6e 61 6d 65 3d 71 62 69 6e>
      body += chunk;
      console.log(body)        //比如：name=qbin
    });
    req.on('end', function(){
      res.writeHead(200, {'Content-Type': 'text/html'});
      //qs将key = value 转化 {key : value}
      res.end('<p>Content-Type:' + req.headers['content-type'] + '</p>' + '<p>Data:</p><pre>' + qs.parse(body).name + '</pre>');
    });
  }else{
    res.writeHead(404);
    res.end('Not Found');
  }
}).listen(3027)