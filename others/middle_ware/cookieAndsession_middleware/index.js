var connect = require('connect');
var users = require("./users");

var server = connect(
  connect.logger('dev'),
  connect.bodyParser(),
  connect.cookieParser(),
  connect.session({secret: 'my app secret'}),

  // 检查用户是否登陆，如果没有登陆则交给其他中间件处理
  function(req, res, next){
    console.log('1', req)
    if('/' == req.url && req.session.logged_in){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(
        'Welcome back,' + req.session.name + '<a href="/logout">logout</a>'
      )
    }else{
      next();
    }
  },

  // 展示登录表单
  function(req, res, next){
    console.log('2', req)
    if('/' == req.url && 'GET' == req.method){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end([
        '<form action="/login" method="POST">',
        '<fieldset>',
          '<legend>Please log in</legend>',
          '<p>User: <input type="text" name="user"></p>',
          '<p>Password: <input type="password" name="password"></p>',
          '<button>Submit</button>',
        '</fieldset>'
      ].join(''))
    }else{
      next();
    }
  },

  // 检查表单信息是否和用户凭证匹配，匹配则成功
  function (req, res, next){
    console.log('3', req)
    if('/login' == req.url && 'POST' == req.method){
      res.writeHead(200);
      if(!users[req.body.user] || req.body.password != users[req.body.user].password){
        res.end('Bad username/password');
      }else{
        req.session.logged_in = true;
        req.session.name = users[req.body.user].name;
        res.end('Authentica')
      }
    }else{
      next();
    }
  },

  function(req, res, next){
    if('/logout' == req.url){
      req.session.logged_in = false;
      res.writeHead(200);
      res.end('Logged out!');
    }else{
      next()
    }
  }
)

server.listen(3004);