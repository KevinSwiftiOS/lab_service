//教学楼

var mongoose = require('../common/db')

var building = mongoose.Schema({
    id:Number,
    buildingName:String
})

building.statics.findAll = function (callback) {
    this.find({},callback)
}

var buildingModel = mongoose.model('building',building)
module.exports = buildingModel