import { fstat } from "fs";

/* **************************** 1 process.argv ***************************** */
/*
  process.argv返回一个数组
  第一个元素：process.execPath，返回启动 Node.js 进程的可执行文件的绝对路径名 '/usr/local/bin/node'
  第二个元素：是正在执行的 JavaScript 文件的路径
*/
// console.log(process.argv);

/* **************************** 2 process.cwd() ***************************** */
/*
  __dirname             显示当前文件所在目录
  process.cwd()         显示程序运行时的当前目录
*/

// 获取当前工作目录
// console.log(__dirname);             //   显示/Users/XXXXXX/nodeApplication/others
// console.log(process.cwd());         //   显示/Users/XXXXXX/nodeApplication/others

//process.chdir()改变当前工作目录
// process.chdir('/');         
// console.log(__dirname);                //   显示/Users/XXXXXX/nodeApplication/others
// console.log(process.cwd());            //   显示/

/* **************************** 3 process.env ***************************** */
/*
  process.env 返回用户环境变量
  用来控制程序是运行在开发模式下，还是在生产模式下
*/
// 效果: 
// NODE_ENV="production" node
// process.env.NODE_ENV        //显示production

/* **************************** 4 process.exit() ***************************** */
/* 
  让一个应用退出，可以调用一个退出码。这样可以让Node命令行程序和操作系统中其他工具进行更好的协同
  比如：当发生错误时，要退出程序，这时候最好使用退出码1
*/
// console.error('错误出现');
// process.exit(1);

/* **************************** 6 信号 ***************************** */
/* 
  信号: 进程和操作系统进行通信的其中一种方式就是通过信号
       比如：要让进程终止，可以发送GIGKILL信号
*/
// process.on('SIGKILL', function(){
//   //信号已收到
// })

/* **************************** 7 Stream ***************************** */
//第一种
fs.createFile('myContent.txt', function(err, contents){
  //必须等到整个文件读取完毕，载入到RAM，才会触发
})

//第二种
var stream = fs.createReadStream('myContent.txt');
//每次会读取可变大小的内容块
stream.on('data', function(chunk){
  //处理文件部分内容
})

stream.end('end', function(chunk){
  //文件读取完毕
})

/* 
  总结：在处理大文件时，逐块进行解析相对比较好
  场景：在进行上传视频文件到服务器时，无需等读取完整个视频内容后进行上传
*/

