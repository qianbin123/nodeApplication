var connect = require('connect');

var server = connect.createServer();
/* 
  static中间件用法
*/

// 挂载: 假设让 '/my-images' URL和名为/images的目录对应起来
server.use('/my-images', connect.static('/path/to/images'));


// maxAge: static中间件接受一个maxAge的选项，这个选项代表一个资源在客户端缓存的时间，这个非常实用
server.use('/js', connect.static('path/to/bundles', {maxAge: 1000000000000}));

// hidden: 另一个static接受的参数是hidden, 如果选项为true, Connect就会托管哪些文件名以（ . ）开始的在UNIX文件系统中被认为是隐藏的文件
server.use(connect.static('/path/to/resources', {hidden: true}));

