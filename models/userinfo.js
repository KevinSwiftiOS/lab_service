//用户信息
//用来交验

var mongoose = require('mongoose')

var userinfo = new mongoose.Schema({
    unionId:String,
    studentId:Number
})


userinfo.static.findByUnionAndStu = function(unionId,studentId,callback){
    this.find({unionId:unionId,studentId:studentId},callback)
}

var userinfoModel = mongoose.model('userinfo',userinfo)
module.exports = userinfoModel