var connect = require('connect');
// 前提必须安装好redis
var RedisStore = require('connect-redis')(connect);

// 将session脱离Node进程
var server = connect();
server.use(connect.session({
  store: new RedisStore,
  secret: 'my secret'
}))
