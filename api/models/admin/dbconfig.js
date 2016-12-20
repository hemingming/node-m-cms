/**
 * MongoDB mongoose Config
 */


/*
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/onemall');
var db = mongoose.connection;
db.on('error', function(error){
	console.log('mongodb:', error);
});
db.on('open', function(error){
	if(!error)console.log('mongodb database success!');
});

var userSchema = new Schema({
	account: String,
	password: String

}, { versionKey: false });


var itemSchema = new Schema({
	itemname: String,		
	itemcode: String,		
	itemnumber: Number,
	itemtype: Number,
	itemunit: Number, 
	itemtoal: Number,
	itempicurl: String,
	itempicurls: String,
	iteampurch: Number,
	iteamstate: Number,
	teamtime: Date

}, { versionKey: false });


exports.adminuser = mongoose.model('oneAdmin', userSchema, 'oneAdmin');

exports.adminitem = mongoose.model('oneCommodity', itemSchema, 'oneCommodity');
*/


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
