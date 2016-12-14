

module.exports = {
    adminRoutes : function(app){

        app.get('/nodemalladministrator', this.adminMain);

    },

    adminMain : function(req, res, next){
        res.render('admin/home', {
            layout : 'admin'
        });
    }
}