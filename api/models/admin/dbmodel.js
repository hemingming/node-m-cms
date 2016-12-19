/**
 * MongoDB mongoose Model
 */

module.exports = {

    putGoods : {
        id : {type : String},
        account : {type : String},
        password : {type : String},
        nickname : {type : String},
        tel : {Number},
        grade : {String},
        wechat : {String},
        email : {String},
        head : {String},
        sumgold : {Number},
        amountgold : {Number},
        friends : {Array},
        userip : {String},
        city : {String},
        address : {String},
        date : {type : Date, require : true, default : new Date()}
        
    }
}