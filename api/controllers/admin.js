
var admindb = require('../models/admin/dbconfig.js'),
	  crypto = require('crypto'),
	  os = require('os');


module.exports = {
    Routes : function(app){

        //系统首页登录
        app.get('/admin&login*', this.adminLogin);
        app.post('/adminlogin*', this.adminSignin);

        //系统信息
        app.get('/admin&adminmain*', this.adminMain);

        //商品管理
        app.get('/admin&mallgoods*', this.adminMallgoods);
        app.get('/admin&pubgoods*', this.adminPubgoods);

        app.post('/adminputitem*', this.adminPutitem);

        //订单管理
        app.get('/admin&ordersales*', this.adminOrdersales);
        app.get('/admin&orderpayment*', this.adminOrderpayment);

        //用户管理
        app.get('/admin&userdatas*', this.adminUserdatas);
        app.get('/admin&userinformation*', this.adminUserinformation);

        //消息管理
        app.get('/admin&news*', this.adminNews);
        app.get('/admin&pubnews*', this.adminPubnews);

    },

    adminLogin : function(req, res, next){
        res.render('admin/login',{
            layout : 'admin'
        });
    },
	adminSignin : function(req, res, next){
		
		var accountHash = crypto.createHash('sha1');
		accountHash.update(req.body.account);
		var account = accountHash.digest('hex');

		var passwordHash = crypto.createHash('sha1');
		passwordHash.update(req.body.password);
		var password = passwordHash.digest('hex');

		var cookiekey = account;
		var query = {account: account, password: password};
        
        /*
			onedb.adminuser.count(query, function(err, doc){
				if(doc == 1){
					res.cookie('Node_M_CMS', cookiekey, { httpOnly: false, signed: true, maxAge: 60*60*1000 }).redirect('/administrator-main/');
				}else{
					return res.redirect(303, '/administrator-login?error=no');
				}
			})
        */
        
        req.flash('message','account error!');
        return res.redirect('/admin&login&sid=error');
        console.log(query);
	},


    adminMain : function(req, res, next){
        res.render('admin/home', {
            layout : 'adminmain',

			sysname 	: os.hostname(),
			sysplat 	: os.platform(),
			sysversion  : os.release(),
			runtime 	: os.uptime() + ' \'second',
			cmemory		: os.totalmem() / 1024,
			smemory		: os.freemem() / 1024,
			cpu 		: os.cpus()[0].model+' '+os.arch()
        });
    },
    //console.log( '系统主机名'+os.hostname(), '系统平台'+os.type(), os.platform(), '服务器版本'+os.release(),  '运行的时间'+os.uptime(),  '负载数组'+os.loadavg(), '内存总量byte'+os.totalmem(), '空闲内存byte'+os.freemem(), 'CPU'+os.cpus()[0].model, os.arch());


    adminMallgoods : function(req, res, next){
        res.render('admin/mallgoods', {
            layout : 'adminmain'
        })
    },

    adminPubgoods : function(req, res, next){
        res.render('admin/pubmallgoods', {
            layout : 'adminmain'
        })
        console.log(888);
    },

    adminPutitem : function(req, res){
        
        var itemtype    = req.body.itemType;    //商品类型
        var itemname    = req.body.itemName;    //商品名称
        var itemcode    = req.body.itemCode;    //商品编码
        var itemnumber  = req.body.itemNumber;  //商品数量
        var itemprice   = req.body.itemPrice;   //市场价格
        var itemunit    = req.body.itemPriced;  //单次价格
        var itemtoal    = req.body.itemPricec;  //总需价格
        var itempic     = req.body.itemPic;        //文描图片
        var itemimage   = req.body.itemImage;     //商品图片
        var itemtext    = req.body.itemText;
        
        console.log(itemtype);
        req.flash('message','提交成功!');
        return res.redirect('/admin&pubgoods&sid=pubgoods.html');

    },


    adminOrdersales : function(req, res, next){
        res.render('admin/ordersales', {
            layout : 'adminmain'
        })
    },

    adminOrderpayment : function(req, res, next){
        res.render('admin/orderpayment', {
            layout : 'adminmain'
        })
    },


    adminUserdatas : function(req, res, next){
        res.render('admin/userdatas', {
            layout : 'adminmain'
        })  
    },

    adminUserinformation : function(req, res, next){
        res.render('admin/userinformation', {
            layout : 'adminmain'
        })  
    },    


    adminNews : function(req, res, next){
        res.render('admin/mallgoods', {
            layout : 'adminmain'
        })
    },

    adminPubnews : function(req, res, next){
        res.render('admin/mallgoods', {
            layout : 'adminmain'
        })
    }


}