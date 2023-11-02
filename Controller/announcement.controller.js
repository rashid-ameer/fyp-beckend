const models=require('../models');

const {Sequelize,Op} = require('sequelize');

function saveAnnouncement(req,res){
    const announcement={
    supervisor_id: req.body.supervisor_id,
    title: req.body.title,
    description: req.body.description,
    batch_id: req.body.batch_id,
    is_deleted: req.body.is_deleted,
    date_and_time: req.body.date_and_time
    };

    models.announcement.create(announcement).then(result=>{
        res.status(201).json({
            message:"Post successfully",
            announcement:result
        })
    }).catch(error=>{

        res.status(500).json({
            message:"error occurred",
            error:error

        })
    })
}

function showAllAnnouncements(req,res){
    models.announcement.findAll({
        include:[
            models.notification_queue,
        ],
        where: {
            is_deleted:0
        }
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(500).json({message: "error occurred"})
    })
}
function showAllAnnouncementsByBatch(req,res){
    models.announcement.findAll({
        where: {
            is_deleted:0,
            batch_id:req.body.batch_id
        }
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(500).json({message: "error occurred"})
    })
}

function updateAnnouncement(req,res){
    models.announcement.update({
        title: req.body.title,
        description: req.body.description,
        batch_id: req.body.batch_id,
        is_deleted: req.body.is_deleted,
    },{
        where: {
            id:req.body.id,
            is_deleted:0
        }
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(500).json({message: 'error occurred: could not update announcement'})
    })
}

function deleteAnnouncement(req,res){
    models.announcement.update({
        is_deleted:1
    },{
        where:{
            id:req.body.id
        }
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(500).json({message: 'error occurred! could not delete record'});
    })
}


module.exports={
    saveAnnouncement,
    showAllAnnouncements,
    updateAnnouncement,
    deleteAnnouncement,
    showAllAnnouncementsByBatch
}