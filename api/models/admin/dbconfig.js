/**
 * MongoDB mongoose Config
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost/onemall');
var db = mongoose.connection;
db.on('error', function(error){
	console.log('mongodb:', error);
});
db.on('open', function(error){
	if(!error)console.log('mongodb database success!');
});


/**
 * 数据模型
 */

var adminSchema = new Schema({
	account: String,
	password: String

}, { versionKey: false });


var itemSchema = new Schema({
	//itemid : {type : Number, default : 0},
	itemtype : {type : Number, required : true},
	itemcode : {type : String, required : true},
	itemname : String,
	itemnumber : Number,
	itemprice : Number,
	itemunit : Number,
	itemtoal : Number,
	itempic : [String],
	itemimage : [String],
	itemtext : String,
	itemstate: Number,
	teamtime: {type : Date, default : Date.now}

}, { versionKey: false });


var sellSchema = new Schema({
    ordernumber : {type : String},
    orderstate : Number,
    itemtype : {type : Number},
    itemname : String,
    totalgold : Number,
    overgold : Number,
    surplusgold : Number,
    paycode : Number,
    getgoods : String,    
    paygolds : Number,
    city : String,
    starttime : String,
    endtime : String,
    teamtime: {type : Date, default : Date.now}
}, { versionKey: false});

var userSchema = new Schema({
    account : { type : String, required : true},
    password : { type : String, required : true},
    nickname : { type : String},
    tel : Number,
    grade : String,
    wechat : String,
    email : String,
    head : String,
    sumgold : Number,
    amountgold : Number,
    friends : [String],
    userip : String,
    city : String,
    address : String,
    teamtime: {type : Date, default : Date.now}
}, { versionKey: false});


exports.adminuser = mongoose.model('onemalladmin', adminSchema, 'onemalladmin');

exports.adminitem = mongoose.model('onemallitems', itemSchema);

exports.adminsell = mongoose.model('onemallsells', sellSchema);

exports.adminpersons = mongoose.model('onemallusers', userSchema);



/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require("./dbmodel");

for(var m in models){
	mongoose.model( m, new Schema(models[m], { safe: {wtimeout: 1000} }) );
}

var _getModel = function(type){
  return mongoose.model(type);
};

module.exports = {
  getModel: function(type){
    return _getModel(type);
  }
};
*/


/*
var BookSchema = new Schema({
  name: String,                                          //名称
  author: String,                                        //作者
  category: [{type: objectId, ref: 'Category'}],         //分类
  from: [{type: objectId, ref: 'Users'}],                //贡献人
  image: String,                                         //封面
  press: String,                                         //出版社
  isbn: String,                                          //ISBN
  page: {type: String, default: '未知'},                 //页数
  sky_drive: String,                                     //网盘地址
  description: String,                                   //内容简介
  press_time: String,                                    //出版时间
  remark: String,                                        //备注
  average: { type: String, default: '0' },               //豆瓣评分
  reply_count: { type: String, default: '0' },           //评论数
  create_time: { type: Date, default: Date.now },        //创建时间
  update_time: { type: Date, default: Date.now },        //更新时间
  pv: { type: Number, default: 0 },                      //浏览次数
  dv: { type: Number, default: 0 },                      //下载次数
  thanks: [{                                             //感谢次数
    user: {type: objectId, ref: 'Users'},
    username: String,
    at: {type: Date, default: Date.now }
  }],
  visitors: [{
    user: {type: objectId, ref: 'Users'},
		username: String,
		gravatar: String,
    at: {type: Date, default: Date.now }
  }]
});
*/