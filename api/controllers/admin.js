
const crypto = require('crypto'),
	  os = require('os'),
      fs = require('fs'),
      async = require('async'),
      dateFormat = require('dateformat'),
      admindb = require('../models/admin/dbconfig'),
      dologin = require('../models/admin/dologin'),
	  dbPage = require('../models/admin/page.js');



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
        app.post('/putonlineitems*', this.adminPutline);

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
            layout : 'admin',
            website : 'javascript:void(0);',
            version : 'Node-M v1.0.0'

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
                        req.session.user = req.body.account;
                        req.session.account = account;
                        req.session.save();  //保存一下修改后的Session
                        res.redirect('/admin&adminmain?sid='+account);
                    }); 

				}else{
                    req.flash('message','account error!');
					return res.redirect(303, '/admin&login&sid=error');
				}
                //db.close();
        });
	},


    adminMain : function(req, res, next){
        async.series({
            items: function(callback){
                admindb.adminitem.count({'itemstate' : 1}, function(err, data){
                    callback(null, data);
                });
                

            },
            users: function(callback){
                admindb.adminpersons.count({}, function(err, data){
                    callback(null, data);
                });
                
            },

            sales : function(callback){
                admindb.adminsell.count({'orderstate' : 1}, function(err, data){
                    callback(null, data);
                })
            }
        },function(err, results) {
            
            res.render('admin/home', {
                layout : 'adminmain',
                user : req.session.user,
                sid : req.query.sid,
                info : results,

                sysname     : os.hostname(),
                sysplat     : os.platform(),
                sysversion  : os.release(),
                runtime     : os.uptime() + ' \'second',
                cmemory     : os.totalmem() / 1024,
                smemory     : os.freemem() / 1024,
                cpu         : os.cpus()[0].model+' '+os.arch()
            });
        });





    },
    //console.log( '系统主机名'+os.hostname(), '系统平台'+os.type(), os.platform(), '服务器版本'+os.release(),  '运行的时间'+os.uptime(),  '负载数组'+os.loadavg(), '内存总量byte'+os.totalmem(), '空闲内存byte'+os.freemem(), 'CPU'+os.cpus()[0].model, os.arch());


    adminMallgoods : function(req, res, next){

        var page = req.query.page || 1;
        var goods = admindb.adminitem;
        dbPage.pageQuery(page, 10, goods, '', {}, {
            teamtime: 'desc'
        }, function(error, $page){
            if(error){
                next(error);
            }else{
                res.render('admin/mallgoods',{
                    layout : 'adminmain',
                    sid : req.query.sid,
                    user : req.session.user,
                    datas : $page.results,
                    pageNow : $page.pageNumber,
                    pageCount : $page.pageCount
                })
            }
        });

        /*
        admindb.adminitem.find({}, function(err, data){
            res.render('admin/mallgoods', {
                layout : 'adminmain',
                sid : req.query.sid,
                datas : data
            })
            console.log(data);
        });
        */
    },

    adminPubgoods : function(req, res, next){
        res.render('admin/pubmallgoods', {
            layout : 'adminmain',
            user : req.session.user,
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
                //itemid : req.body.itemid,
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
				itemstate: 0,				//商品状态
				teamtime: new Date			//发布日期
			}

			admindb.adminitem.create(query, function(err, data){
				//if (err) return handleError(err);
				if (err){
                    console.log(err);
                    return res.redirect('/admin&pubgoods?sid='+req.session.account+'&pubgoods.html');
                }
                req.flash('message','提交成功!');
                return res.redirect('/admin&pubgoods?sid='+req.session.account+'&pubgoods.html');
                //db.close();
			});

        }
        
        //console.log(req.body);
        
    },

    adminPutline : function(req, res, next){
        var modid = req.body.id;
        var state = req.body.state;
        var update = req.body.state;
        (update  == 0)?(update  = 1):(update  = 0);
        
        var itemtype = req.body.type;
        var itemname = req.body.name;
        var totalgold = req.body.total;
        
        var date = new Date();
        var query = {
            ordernumber : dateFormat(date, 'yymmddHHMMss'),
            orderstate : 0,
            itemtype : itemtype,
            itemname : itemname,
            totalgold : totalgold,
            overgold : 0,
            surplusgold : totalgold,
            paycode : null,
            getgoods : null,    
            paygolds : null,
            city : null,
            starttime : dateFormat(date, 'yyyy/mm/dd HH:MM:ss'),
            endtime : null
        }
        
        if(state == 0){
            admindb.adminsell.create(query, function(err, data){
                if (err) console.log(err);
            })
        }

        admindb.adminitem.update({'_id' : modid }, {'itemstate' : update }, function(err, data){
            if (err) {
                console.log("Error:" + err);
                return res.json(err);
            }else {
                return res.json(data);
            }
        });
        
    },


    adminOrdersales : function(req, res, next){
        var page = req.query.page || 1;
        var itemSales = admindb.adminsell;
        dbPage.pageQuery(page, 10, itemSales, '', {}, {
            teamtime: 'desc'
        }, function(error, $page){
            if(error){
                next(error);
            }else{
                res.render('admin/ordersales',{
                    layout : 'adminmain',
                    sid : req.query.sid,
                    user : req.session.user,
                    datas : $page.results,
                    pageNow : $page.pageNumber,
                    pageCount : $page.pageCount
                })
            }
        });
        
        /*
        res.render('admin/ordersales', {
            layout : 'adminmain',
            user : req.session.user,
            sid  : req.query.sid
        })
        */
    },

    adminOrderpayment : function(req, res, next){
        res.render('admin/orderpayment', {
            layout : 'adminmain',
            user : req.session.user,
            sid  : req.query.sid
        })
    },


    adminUserdatas : function(req, res, next){
        res.render('admin/userdatas', {
            layout : 'adminmain',
            user : req.session.user,
            sid  : req.query.sid
        })  
    },

    adminUserinformation : function(req, res, next){
        res.render('admin/userinformation', {
            layout : 'adminmain',
            user : req.session.user,
            sid  : req.query.sid
        })  
    },    


    adminNews : function(req, res, next){
        res.render('admin/home', {
            layout : 'adminmain',
            user : req.session.user,
            sid  : req.query.sid
        })
    },

    adminPubnews : function(req, res, next){
        res.render('admin/home', {
            layout : 'adminmain',
            user : req.session.user,
            sid  : req.query.sid
        })
    }


}