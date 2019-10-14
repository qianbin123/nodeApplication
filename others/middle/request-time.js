// 请求时间中间件
module.exports = function(opts){
  //设置默认阈值
  var time = opts.time || 100;

  return function(req ,res, next){
    var timer = setTimeout(function(){
      console.log(
        '\033[90m%s %s\033[39m  \033[91m is taking too long! \033[39m', req.method, req.url
      )
    },time)

    // 保存对原始函数的引用
    var end = res.end;
    res.end = function(chunk, encoding){
      // 恢复原始函数
      res.end = end;
      res.end(chunk, encoding);
      clearTimeout(timer);
    }

    // 让其他中间件能够处理请求
    next();
  }
}