var fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;
// 打印当前同级目录下的其他文件 同步版本
// console.log(fs.readdirSync(__dirname));

// 打印当前同级目录下的其他文件 异步版本
// fs.readdir('.' ,function(err, files){
//   console.log(files);
// })

//其中process.cwd() 返回Node.js进程的当前工作目录
fs.readdir(process.cwd(), function(err, files){
  console.log('');
  if(!files.length){
    // \033[31m' 和 \033[39m'是让文本呈现红色
    return console.log('     \033[31m' + '没有文件展示' + '\033[39m\n');
  }

  console.log('     请选择目录或文件')


  function file(i){
    var filename = files[i];
    // fs.stat 会给出文件或目录的元数据
    fs.stat(__dirname + '/' + filename, function(err, stat){
      if(stat.isDirectory()){
        console.log(' ' + i + '     \033[36m' + filename + '/\033[39m');
      } else {
        console.log(' ' + i + '     \033[90m' + filename + '\033[39m');
      }
  
      // stdin 标准输入 ； stdout 标准输出 ； stderr 标准错误
      if(++i == files.length){
        read();
      } else {
        file(i);
      }
    })
  }

  function read(){
    console.log('');
    // process.stdout.write 相比 console.log()多了换行
    stdout.write('   \033[33mEnter your choice: \033[39m');
    stdin.resume();
    // 设置流编码为utf8，未来支持特殊字符
    stdin.setEncoding('utf8');
  }

  file(0);
})

console.log(' ')

