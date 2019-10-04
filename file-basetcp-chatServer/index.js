var net = require('net');
var count = 0;             //记录用户数
var users = [];
/* 
  创建服务器
*/
var server = net.createServer(function(conn){
  conn.setEncoding('utf-8');
  var nickname;
  conn.write(
      '\n > welcome to \033[92m node-chat \033[39m!'
    + '\n > ' + count + ' other people are connected at this time.'
    + '\n > please write your name and press enter:'
  );
  count++;

  conn.on('data', function(data){
    //删除回车符
    data = data.replace('\r\n', '');
    //接收到用户输入的昵称
    if(!nickname){
      if(users[data]){
        conn.write('\033[93m> nickname already in use. try again:\033[39m');
      }else{
        nickname = data;
        users[nickname] = conn;

        for(var i in users){
          users[i].write('\033[90m> ' + nickname + ' joined the room\033[39m\n');
        }
      }
    }else{
      //否则视为聊天消息
      for(var i in users){
        //确保消息只发给除自己以外的其他用户
        if(i != nickname){
          users[i].write('\033[96m> ' + nickname + ':\033[39m' + data + '\n');
        }
      }
    }
  })

  conn.on('close', function(){
    count--;
  })
  // 处理连接
  console.log('\033[90m 新连接 \033[39m');
})

/* 
  监听
*/
server.listen(3008, function(){
  console.log('\033[96m server listening on : 3008 \033[39m');
})
