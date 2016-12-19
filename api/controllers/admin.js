

module.exports = {
    adminRoutes : function(app){

        //系统首页
        app.get('/admin&malladministrator*', this.adminAdministrator);

        //系统信息
        app.get('/admin&adminmain*', this.adminMain);

        //商品管理
        app.get('/admin&mallgoods*', this.adminMallgoods);
        app.get('/admin&pubgoods*', this.adminPubgoods);

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


    adminAdministrator : function(req, res, next){
        res.render('admin/home', {
            layout : 'admin'
        });
    },

    adminMain : function(req, res, next){
        res.render('admin/home', {
            layout : 'adminmain'
        });
    },


    adminMallgoods : function(req, res, next){
        res.render('admin/mallgoods', {
            layout : 'adminmain'
        })
    },

    adminPubgoods : function(req, res, next){
        res.render('admin/pubmallgoods', {
            layout : 'adminmain'
        })
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