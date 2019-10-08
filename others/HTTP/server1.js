require('http').createServer(function(req, res){
  res.writeHead(200,
    {
      'Content-Type': 'text/html',
      'Connection': 'keep-alive',
      'Transfer-Encoding': 'chunked'
    }
  );
  res.end('Hello <b>world</b>');
}).listen(3007);
