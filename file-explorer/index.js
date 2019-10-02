var fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;
var stats = [];
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
      stats[i] = stat;
      if(stat.isDirectory()){
        // 如果是文件夹
        console.log(' ' + i + '     \033[36m' + filename + '/\033[39m');
      } else {
        // 如果是文件
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
    // 监听data事件
    stdin.on('data', option);
  }

  function option(data){
    var filename = files[Number(data)];

    // if(!filename){
    //   stdout.write('   \033[31mEnter your choice: \033[39m');
    // }else{
    //   stdin.pause();
    //   fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data){
    //     console.log('');
    //     console.log('\033[90m' + data.replace(/(.*)/g, '    $1') +'\033[39m');
    //   })
    // }

    if(stats[Number(data)].isDirectory()){
      fs.readdir(__dirname + '/' + filename, function(err, files){
        console.log('');
        console.log('  (' + files.length + ' files)')
          files.forEach(function(file){
            console.log('     -   ' + file);
          });
          console.log()
      })
    }else{
      fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data){
        console.log('');
        console.log('\033[90m' + data.replace(/(.*)/g, '    $1') +'\033[39m');
      })
    }
  }

  file(0);
})

console.log(' ')

