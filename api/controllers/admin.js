
const admindb = require('../models/admin/dbconfig'),
      dologin = require('../models/admin/dologin'),
	  crypto = require('crypto'),
	  os = require('os');


module.exports = {
    Routes : function(app){

        //系统首页登录
        app.get('/admin&login*', this.adminLogin);
        app.post('/adminlogin*', this.adminSignin);

        //系统信息
        app.get('/admin&adminmain*', dologin.islogin, this.adminMain);

        //商品
        app.get('/admin&mallgoods*', dologin.islogin, this.adminMallgoods);
        app.get('/admin&pubgoods*',  dologin.islogin, this.adminPubgoods);

        app.post('/adminputitem*', this.adminPutitem);

        //订单
        app.get('/admin&ordersales*', dologin.islogin, this.adminOrdersales);
        app.get('/admin&orderpayment*', dologin.islogin, this.adminOrderpayment);

        //用户
        app.get('/admin&userdatas*', dologin.islogin, this.adminUserdatas);
        app.get('/admin&userinformation*', dologin.islogin, this.adminUserinformation);

        //消息
        app.get('/admin&news*', dologin.islogin, this.adminNews);
        app.get('/admin&pubnews*', dologin.islogin, this.adminPubnews);

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
        
        admindb.adminuser.count(query, function(err, data){
				if(data == 1){

					//res.cookie('Node_M_CMS', cookiekey, { httpOnly: false, signed: true, maxAge: 60*60*1000 }).redirect('/administrator-main/');
                    req.session.regenerate(function(){
                        req.session.account = account;
                        req.session.save();  //保存一下修改后的Session
                        res.redirect('/admin&adminmain?sid='+account);
                    }); 

				}else{
                    req.flash('message','account error!');
					return res.redirect(303, '/admin&login&sid=error');
				}
        });
	},


    adminMain : function(req, res, next){
        res.render('admin/home', {
            layout : 'adminmain',

            sid         : req.query.sid,
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
        admindb.adminitem.find({}, function(err, data){
            res.render('admin/mallgoods', {
                layout : 'adminmain',
                sid : req.query.sid,
                datas : data
            })
            console.log(data);
        });

    },

    adminPubgoods : function(req, res, next){
        res.render('admin/pubmallgoods', {
            layout : 'adminmain',
            sid : req.query.sid
        })
    },

    adminPutitem : function(req, res){
        
        var itemtype    = req.body.itemType;
        var itemcode    = req.body.itemCode;   
        var itemname    = req.body.itemName;    
        var itemnumber  = req.body.itemNumber;  
        var itemprice   = req.body.itemPrice;   
        var itemunit    = req.body.itemPriced;  
        var itemtoal    = req.body.itemPricec;  
        var itempic     = [req.body.itemPic1, req.body.itemPic2, req.body.itemPic3, req.body.itemPic4, req.body.appitemPic1, req.body.appitemPic2, req.body.appitemPic3, req.body.appitemPic4];     
        var itemimage   = [req.body.itemImage1, req.body.itemImage2, req.body.itemImage3, req.body.itemImage4, req.body.appitemImage1, req.body.appitemImage2, req.body.appitemImage3, req.body.appitemImage4];
        var itemtext    = req.body.itemText;    
        
        if(itemtype == '' || itemname == ''){
            req.flash('message','提交失败!');
            return res.redirect('/admin&pubgoods?sid='+req.session.account+'&pubgoods.html');
        }else{
			var query = {
				//itemid: new mongoose.Types.ObjectId,
                itemtype : itemtype,        //商品类型
                
                itemcode : itemcode,        //商品编码
                itemname : itemname,        //商品名称
                itemnumber : itemnumber,    //商品数量
                itemprice : itemprice,      //市场价格
                itemunit : itemunit,        //单次价格
                itemtoal : itemtoal,        //总需价格
                itempic : itempic,          //文描图片
                itemimage : itemimage,      //商品图片
                itemtext : itemtext,        //文字说明
				itemstate: 1,				//商品状态
				teamtime: new Date			//发布日期
			}
			admindb.adminitem.create(query, function(err, data){
				//if (err) return handleError(err);
				if (err) return res.redirect('/admin&pubgoods?sid='+req.session.account+'&pubgoods.html');
                req.flash('message','提交成功!');
                return res.redirect('/admin&pubgoods?sid='+req.session.account+'&pubgoods.html');
			});
        }
        
        //console.log(req.body);
        
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