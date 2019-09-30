var fs = require('fs');
// 打印当前同级目录下的其他文件 同步版本
// console.log(fs.readdirSync(__dirname));

// 打印当前同级目录下的其他文件 异步版本
// fs.readdir('.' ,function(err, files){
//   console.log(files);
// })