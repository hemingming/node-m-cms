/*
 * Node-M CMS
 * 主路由文件
 */

const main  = require('./main.js'),
	  adminController = require('./admin.js');


/*
var userController = require('./usercontroller.js');

	main = require('../models/main.js'),
	user = require('../models/user.js'),
	usermodel = require('../models/usermodel.js'),
	userinfo = require('../models/userinfo.js');
	
	//captcha = require('../models/captcha.js');
*/

module.exports = function(app){

	//首页
	app.get('/', main.home);

	adminController.Routes(app);
    
	/*
	//登录
	app.get('/login', user.login);

	//注册
	app.get('/register*', user.register);

	

	//用户逻辑
	userController.userRoutes(app);
    */
};