let express = require('express');
let path = require('path');
let favicon = require('static-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let RedisStrore = require('connect-redis')(session);
let cors = require('cors');
let config = {
    "cookie": {
        "maxAge": 1800000
    },
    "sessionStore": {
        "host": "127.0.0.1",
        "port": "6379",
        //"pass": "12345678",
        "db": 1,
        "ttl": 18000,
        "logErrors": true
    }
}

// 路由信息（接口地址），存放在routes的根目录
let routes = require('./routes/index');
let users = require('./routes/users');
let dikind = require('./routes/dikind');
let diname = require('./routes/diname');
let dicase = require('./routes/dicase');
let department = require('./routes/department');
let stay = require('./routes/stay');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 载入中间件
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(session({
    name : "pcsid",
    secret : 'keyboard cat',
    resave : true,
    rolling:true,
    saveUninitialized : false,
    cookie : config.cookie,
    store : new RedisStrore(config.sessionStore)
}));
app.use(cors());

//配置路由
app.use('/', routes);
app.use('/users', users);
app.use('/dikind', dikind);
app.use('/diname', diname);
app.use('/dicase', dicase);
app.use('/department', department);
app.use('/stay', stay);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
