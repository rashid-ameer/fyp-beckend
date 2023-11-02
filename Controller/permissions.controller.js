const models=require('../models');
const role = require('../models/role');

function savePermission(req,res){
   
    models.permission.create(req.body).then(result=>{
        res.status(201).json({
            message:"Post successfully",
            result
        })
    }).catch(error=>{

        res.status(500).json({
            message:"error occurred",
            error:error

        })
    })
}


function showAllPermission(req,res){

    models.permission.findAll({
        // include :[{
        //     model: models.user,
        //     where: {
        //         is_deleted:0
        //     },
        //     required: false
        // }],
        where:{
            is_deleted:0
        }
  
    }).then(result=>{
        res.status(200).json(result);
    }).catch(error=>{

        res.status(500).json({
            message:"error occurred"

        })
    })
}

//input should be role like permission Id
function showPermission(req,res){
    models.permission.findAll({
        where:{
            id:req.body.id,
            is_deleted:0
        }
    }).then(result=>{
        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json({
            message:"error occurred"
        })
    })
}


function updatePermission(req,res){
    models.permission.update(req.body,{
        where:{
            id:req.body.id,
            is_deleted:0
        }
    }).then(result=>{
        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json({
            message:"error occurred"
        })
    })
}

function deletePermission(req,res){
    models.permission.update({
        include:"role_permission",
        is_deleted:1

    },{
        where:{
            id:req.body.id
        }
    }).then(result=>{
        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json({
            message:"error occurred"
        })
    })
}


module.exports={
    savePermission,
    showAllPermission,
    showPermission,
    updatePermission,
    deletePermission

}