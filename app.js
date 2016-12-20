/*
 * oneMall
 * Node-M CMS @ author Ming
 * version 1.0.0
 */

const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    connect = require('connect'),
    flash = require('connect-flash'),
    express = require('express'),
    session = require('express-session'),
    compression = require('compression'),
    voucher = require('./api/voucher/voucher.js');
 
//express
var app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
 
//handlebars视图引擎
var handlebars = require('express-handlebars').create({ 
    defaultLayout : 'main' ,
    helpers : {
        section : function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        static : function(name){
            return require('./api/lib/static.js').map(name);
        }
    }
    //,extname : '.hc'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//app.set('view cache', true);//开启缓存
 
//端口
app.set('port', process.env.PORT || 3000);
 
//数据解析
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
 
//静态文件
app.use(express.static(__dirname + '/public'));
 
//cookie session
app.use(require('cookie-parser')(voucher.cookieSecret));
app.use(require('express-session')({
    name : 'nodemcms',
    resave: true,
    saveUninitialized: false,
    secret: voucher.cookieSecret,
    cookie: { maxAge: 60 * 10000 }
    //store: sessionStore,
}));
app.use(flash());

//局部模板
app.use(function(req, res, next){
	res.locals.message = req.flash('message');
    if(!res.locals.partials) res.locals.partials = {};
    //res.locals.partials.data = getData();
    next();
});

//路由文件
require('./api/controllers/routes.js')(app);

//自动化视图渲染
var autoViews = {};
app.use(function(req, res, next){
    var path = req.path.toLowerCase();  
    // 检查缓存 如果存在渲染视图
    if(autoViews[path]) return res.render(autoViews[path]);
    // 如果不在缓存 匹配相关的.handlebars文件
    if(fs.existsSync(__dirname + '/views' + path + '.handlebars')){
        autoViews[path] = path.replace(/^\//, '');
        return res.render(autoViews[path]);
    }
    // 失败转入404
    next();
});

 
//404
app.use(function(req, res){
    res.status(404).render('404');
});
 
//500
app.use(function(req, res){
    res.status(500).render('500');
});
 
 
//启动
app.listen(app.get('port'), function(){
    console.log('Node-M CMS on 127.0.0.1:' + app.get('port'));
});
