const models=require('../models');

function saveNotification(req,res){
    const notification={
        id: req.body.id,
        user_id: req.body.user_id,
        status_viewed: 0,
        is_deleted: 0
    };

    models.notification_queue.create(notification).then(result=>{
        res.status(201).json({
            message:"Post successfully",
            notification:result
        })
    }).catch(error=>{

        res.status(500).json({
            message:"error occurred",
            error:error

        })
    })
}

function showAllNotification(req,res){
    models.notification_queue.findAll({
        include: "announcement",
        where: {
            is_deleted:0,
        }
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(500).json({message: "error occukrred"})
    })
}
function showAllNotificationByBatch(req,res){
    models.notification_queue.findAll({
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

function showAllNotificationByStudent(req,res){
    models.notification_queue.findAll({
        include: "announcement",
        where: {
            user_id: req.body.id,
            is_deleted:0,
        }
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(500).json({message: "error occukrred"})
    })
}

function updateNotification(req,res){
    models.notification_queue.update({
        status_viewed: req.boy.status_viewed
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


function updateNotificationReadStatus(req,res){
    models.notification_queue.update({
        status_viewed: 1
    },{
        where: {
            user_id:req.body.id,
            is_deleted:0
        }
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(500).json({message: 'error occurred: could not update announcement'})
    })
}




module.exports={
    saveNotification,
    showAllNotification,
    showAllNotificationByBatch,
    updateNotification,
    showAllNotificationByStudent,
    updateNotificationReadStatus

}