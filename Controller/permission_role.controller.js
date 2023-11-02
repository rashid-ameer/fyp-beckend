const models=require('../models');

function savePermission_role(req,res){
    models.role_permission.create(req.body).then(result=>{
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


function showAllPermission_role(req,res){

    models.role_permission.findAll({
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

function showPermission_role(req,res){
    models.role_permission.findAll({
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


function updatePermission_role(req,res){
    models.role_permission.update(req.body,{
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

function deletePermission_role(req,res){
    models.role_permission.update({
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
    savePermission_role,
    showAllPermission_role,
    showPermission_role,
    updatePermission_role,
    deletePermission_role

}