var express = require('express');
var wsio = require('websocket.io');

var app = express.createServer();
//绑定websocket服务
var ws = wsio.attach(app);
app.use(express.static('public'));

ws.on('connection', function(socket){
  //直接将收到的消息返回客户端,监听message事件
  socket.on('message', function(msg){
    console.log('\033[96mgot:\033[39m' + msg);
    socket.send('pong');
  })
})

app.listen(3013);