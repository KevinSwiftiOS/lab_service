//预约记录

var mongoose = require('../common/db')

var reservations =  new mongoose.Schema({
    id:Number,
    userId:Number,
    username:String,
    userType:String,
    userPhone:String,
    labId:Number,
    labName:String,
    date:String,
    numberOfUser:Number,
    section01:Boolean,
    section02:Boolean,
    section03:Boolean,
    section04:Boolean,
    section05:Boolean,
    section06:Boolean,
    section07:Boolean,
    section08:Boolean,
    section09:Boolean,
    section10:Boolean,
    reason:String,
    status:String,
    aduitResponseMsg:String
})




var reservationsModel = mongoose.model('reservations',reservations)

module.exports = reservationsModel