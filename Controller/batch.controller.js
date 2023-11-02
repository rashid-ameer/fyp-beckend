const models=require('../models');

function saveBatch(req,res){
    const batch={
        batch: req.body.batch,
        isActive: req.body.isActive,
        is_deleted: req.body.is_deleted
    };
    models.batch.create(batch).then(result=>{
        res.status(201).json({
            message:"Post successfully",
            batch:result
        })
    }).catch(error=>{

        res.status(500).json({
            message:"error occurred",
            error:error

        })
    })
}

function showAllBatches(req,res){

    models.batch.findAll({
        where:{
            is_deleted:0
        }
    }).then(result=>{
        res.status(200).json(result);
    }).catch(error=>{

        res.status(500).json({
            message:"error occurred",

        });
    });
}

function showBatchById(req,res){

    models.batch.findOne({
        where:{
            id:req.body.id,
            is_deleted:0
        }
    }).then(result=>{
        res.status(200).json(result);
    }).catch(error=>{

        res.status(500).json({
            message:"error occurred",

        });
    });
}


function showStudentByBatch(req,res){
    models.batch.findOne({
        include: [
            {
              model: models.student,
              where: {
                is_deleted: 0,
              },
              required: false,
            },
          ],
        where:{
            id:req.body.id,
            is_deleted:0
        }
    }).then(result=>{
        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json({
            message:"error occurred",
        });
    });
}

function updateBatch(req,res){
    models.batch.update({
        batch:req.body.batch,
        isActive:req.body.isActive
    },{
        where:{
         id:req.body.id,
        // is_deleted:0
        }
    }).then(result=>{
        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json({
            message:"error occurred"
        })
    })
}

function deleteBatch(req,res){
    models.batch.update({
       is_deleted:1
    },{
        where:{
         batch:req.body.batch
        }
    }).then(result=>{
        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json({
            message: error.errors
        })
    })
}

module.exports={
    saveBatch:saveBatch,
    showAllBatches:showAllBatches,
    showBatchById:showBatchById,
    showStudentByBatch:showStudentByBatch,
    updateBatch:updateBatch,
    deleteBatch:deleteBatch
}