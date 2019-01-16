var express = require('express');
var router = express.Router();

var building = require('../models/building')
var labs = require('../models/labs')
var labReserveConfigs = require('../models/labReserveConfigs')
var reservations = require("../models/reservations")

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


//查询教学楼列表
router.get('/getBuildingList', function (req, res, next) {
    building.findAll(function (err, buildingList) {
        return res.json({retcode: 0, data: buildingList,})
    })
})

//查询实验室列表
router.post('/getLabsList', function (req, res, next) {
    labs.findByBuildingId(req.body.id, function (err, labList) {
        return res.json({retcode: 0, data: labList})
    })
})

//获取实验室详情
router.post('/getLabDetail', function (req, res, next) {
    labs.findByLabId(req.body.id, function (err, lab) {
        return res.json({retcode: 0, data: lab})
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
router.post('/getReserveOneWeek', function (req, res, next) {
    labReserveConfigs.findByWeekNum(req.body.labId, req.body.weekNum, function (err, reserveWeek) {
        //生成一个二维数组
        var sectionWeek = new Array();
        for (var i = 0; i < 7; i++) {
            sectionWeek[i] = new Array();
            for (var j = 0; j < 10; j++) {
                sectionWeek[i][j] = true;
            }
        }
        // console.log(reserveWeek);
        // 获取到的七天数据遍历，提取每天的10节课的预约情况
        for (var i = 0; i <= reserveWeek.length - 1; i++) {
            for (var j = 1; j <= 10; j++) {
                if (j == 10) {
                    sectionWeek[i][j - 1] = reserveWeek[i]["sectionOpened" + j]
                } else {
                    sectionWeek[i][j - 1] = reserveWeek[i]["sectionOpened0" + j]
                }
            }
        }
        console.log(sectionWeek)
        return res.json({retcode: 0, data: {sectionWeek: sectionWeek}})
    })
})

//修改预约情况
//labId,date
router.post('/changeReserve', function (req, res, next) {
    // console.log(req.body.username)
    var updatelabReserveConfigs = {}
    var updatelabReservations = {}
    for (var item of req.body.retReserve) {
        updatelabReserveConfigs["sectionOpened" + item] = true
        updatelabReservations["section" + item] = true
    }


    var reservationsModel = new reservations({
        userId: 1,
        username: req.body.username,
        userType: 1,
        userPhone: 15168223039,
        labId: req.body.labId,
        date: req.body.date,
        numberOfUser: req.body.numberOfUser,
        reason: req.body.reason,
        status: "正在审核",
        aduitResponseMsg: "审核信息"
    })


    labReserveConfigs.findByDate(req.body.labId, req.body.date, function (err, reserveItem) {
        labReserveConfigs.updateOne({
                labId: req.body.labId,
                date: req.body.date
            }, updatelabReserveConfigs, function (err, updateReserve) {
                if (err) {
                    return res.json({retcode: 1, data: err})
                }
                reservationsModel.save(function () {
                    return res.json({retcode: 0})
                })
            }
        )
    })


})


//添加预约控制

// router.get('/addlabReserveConfigs',function (req, res, next) {
//     var model = new labReserveConfigs({
//         labId:0,
//         date:"2019-01-15",
//         sectionOpened01:true,
//         sectionOpened02:false,
//         sectionOpened03:true,
//         sectionOpened04:false,
//         sectionOpened05:false,
//         sectionOpened06:true,
//         sectionOpened07:false,
//         sectionOpened08:true,
//         sectionOpened09:false,
//         sectionOpened10:true,
//         weekNum:201902
//     })
//     model.save(function () {
//         var model = new labReserveConfigs({
//             labId:0,
//             date:"2019-01-15",
//             sectionOpened01:false,
//             sectionOpened02:true,
//             sectionOpened03:true,
//             sectionOpened04:false,
//             sectionOpened05:false,
//             sectionOpened06:true,
//             sectionOpened07:false,
//             sectionOpened08:true,
//             sectionOpened09:false,
//             sectionOpened10:true,
//             weekNum:201902
//         })
//         model.save(function () {
//             var model = new labReserveConfigs({
//                 labId:0,
//                 date:"2019-01-16",
//                 sectionOpened01:true,
//                 sectionOpened02:false,
//                 sectionOpened03:false,
//                 sectionOpened04:false,
//                 sectionOpened05:true,
//                 sectionOpened06:true,
//                 sectionOpened07:false,
//                 sectionOpened08:false,
//                 sectionOpened09:false,
//                 sectionOpened10:true,
//                 weekNum:201902
//             })
//             model.save(function(){
//                 var model = new labReserveConfigs({
//                     labId:0,
//                     date:"2019-01-17",
//                     sectionOpened01:false,
//                     sectionOpened02:false,
//                     sectionOpened03:true,
//                     sectionOpened04:false,
//                     sectionOpened05:true,
//                     sectionOpened06:true,
//                     sectionOpened07:false,
//                     sectionOpened08:true,
//                     sectionOpened09:false,
//                     sectionOpened10:true,
//                     weekNum:201902
//                 })
//                 model.save(function(){
//                     var model = new labReserveConfigs({
//                         labId:0,
//                         date:"2019-01-18",
//                         sectionOpened01:false,
//                         sectionOpened02:true,
//                         sectionOpened03:true,
//                         sectionOpened04:false,
//                         sectionOpened05:true,
//                         sectionOpened06:true,
//                         sectionOpened07:true,
//                         sectionOpened08:false,
//                         sectionOpened09:false,
//                         sectionOpened10:true,
//                         weekNum:201902
//                     })
//                     model.save(function(){
//                         var model = new labReserveConfigs({
//                             labId:0,
//                             date:"2019-01-19",
//                             sectionOpened01:true,
//                             sectionOpened02:false,
//                             sectionOpened03:true,
//                             sectionOpened04:false,
//                             sectionOpened05:false,
//                             sectionOpened06:true,
//                             sectionOpened07:true,
//                             sectionOpened08:false,
//                             sectionOpened09:false,
//                             sectionOpened10:true,
//                             weekNum:201902
//                         })
//                         model.save(function () {
//                             var model = new labReserveConfigs({
//                                 labId:0,
//                                 date:"2019-01-20",
//                                 sectionOpened01:false,
//                                 sectionOpened02:true,
//                                 sectionOpened03:true,
//                                 sectionOpened04:false,
//                                 sectionOpened05:true,
//                                 sectionOpened06:true,
//                                 sectionOpened07:true,
//                                 sectionOpened08:false,
//                                 sectionOpened09:false,
//                                 sectionOpened10:true,
//                                 weekNum:201902
//                             })
//                             model.save()
//                         })
//                     })
//                 })
//             })
//         })
//     })
//     return res.json({retcode:0})
// })
module.exports = router;
