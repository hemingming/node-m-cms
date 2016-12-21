/*
 * doLogin
 */

exports.islogin = function(req, res, next){
    //console.log(req.session);
    if(!req.session.account){
        res.redirect(303, '/admin&login&sid=error');
    }else{
        next();
    }
}