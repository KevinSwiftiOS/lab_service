//实验室预约控制

var mongoose = require('mongoose')

var labReserveConfigs = new mongoose.Schema({
    labId:Number,
    date:String,
    sectionOpened01:Boolean,
    sectionOpened02:Boolean,
    sectionOpened03:Boolean,
    sectionOpened04:Boolean,
    sectionOpened05:Boolean,
    sectionOpened06:Boolean,
    sectionOpened07:Boolean,
    sectionOpened08:Boolean,
    sectionOpened09:Boolean,
    sectionOpened10:Boolean,
    weekNum:Number
})


labReserveConfigs.statics.findByWeekNum = function (labId,weekNum,callback) {
    this.find({labId:labId,weekNum:parseInt(weekNum)},callback)
}
labReserveConfigs.statics.findByDate = function(labId,date,callback){
    this.find({labId:labId,date:date},callback)
}

var labReserveConfigsModel = mongoose.model('labReserveConfigs',labReserveConfigs)

module.exports = labReserveConfigsModel