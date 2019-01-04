var mongoose = require('mongoose')

var url = 'mongodb://localhost/labdb'
mongoose.connect(url,{useNewUrlParser:true})

module.exports = mongoose
