//实验室

var mongoose = require('../common/db')

var labs = new mongoose.Schema({
    id:Number,
    labName:String,
    buildingId:Number,
    numOfSeats:Number,
    status:Boolean,
    image:String,
    intro:String
})


labs.statics.findAll = function(callback){
    this.find({},callback)
}

labs.statics.findByBuildingId = function(id,callback){
    this.find({buildingId:id},callback)
}

labs.statics.findByLabId = function (id, callback) {
    this.find({id:id},callback)
}

var labsModel = mongoose.model("labs",labs)
module.exports = labsModel