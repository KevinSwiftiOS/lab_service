var express = require('express');
var router = express.Router();

var building = require('../models/building')
var labs = require('../models/labs')
var labReserveConfigs = require('../models/labReserveConfigs')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//查询教学楼列表
router.get('/getBuildingList',function (req, res, next) {
    building.findAll(function (err, buildingList) {
        return res.json({retcode:0,data:buildingList,})
    })
})

//查询实验室列表
router.post('/getLabsList',function (req, res, next) {
    labs.findByBuildingId(req.body.id,function (err, labList) {
        return res.json({retcode:0,data:labList})
    })
})

//获取实验室详情
router.post('/getLabDetail',function (req, res, next) {
    labs.findByLabId(req.body.id,function (err, lab) {
        return res.json({retcode:0,data:lab})
    })
})



/*
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
    weekNum:String

/
 */
//获取当前日期下的一周预约情况
router.post('/getReserveOneWeek',function (req, res, next) {
    labReserveConfigs.findByDate(req.body.labId,req.body.weekNum,function (err, reserveWeek) {
        //生成一个二维数组
        var sectionWeek = new Array();
        for(var i=0;i<7;i++){
            sectionWeek[i]=new Array();
            for(var j=0;j<10;j++){
                sectionWeek[i][j]=true;
            }
        }
        //获取到的七天数据遍历，提取每天的10节课的预约情况
        for(var i = 0;i <= reserveWeek.length - 1;i++){
            for(var j = 1; j <= 10;j++) {
                if(j==10){
                    sectionWeek[i][j-1]=reserveWeek[i]["sectionOpened" + j]
                }else{
                    sectionWeek[i][j-1]=reserveWeek[i]["sectionOpened0" + j]
                }
            }
        }
        return res.json({retcode:0,data:{sectionWeek:sectionWeek}})
    })
})
module.exports = router;