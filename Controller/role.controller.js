const models=require('../models');
const role = require('../models/role');

function saveRole(req,res){
    const role={
        role:req.body.role,
        role_name: req.body.role_name,
        isActive: req.body.isActive,
        role_description: req.body.role_description,
        is_deleted: 0
    };
    models.role.create(role).then(result=>{
        res.status(201).json({
            message:"Post successfully",
            role:result
        })
    }).catch(error=>{

        res.status(500).json({
            message:"error occurred",
            error:error

        })
    })
}


function showAllRoles(req,res){

    models.role.findAll({
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

function showRoleWithPermission(req,res){

    models.role.findAll({
        include:"permissions"
        // include :[{
        //     model: models.user,
        //     where: {
        //         is_deleted:0
        //     },
        //     required: false
        // }],
        // where:{
        //     is_deleted:0
        // }
  
    }).then(result=>{
        res.status(200).json(result);
    }).catch(error=>{

        res.status(500).json({
            message:"error occurred"

        })
    })
}
//input should be role like role super admin 0 , coordinator 1, supervisor 2,student 3
function showRole(req,res){
    models.role.findAll({
        where:{
            role:req.body.role,
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

// show role by role Id
function showRoleById(req,res){
    models.role.findAll({
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

function updateRole(req,res){
    models.role.update({
        role_name:req.body.role_name,
        role_description:req.body.role_description,
        isActive:req.body.isActive
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

function deleteRole(req,res){
    models.role.update({
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
    saveRole:saveRole,
    showAllRoles:showAllRoles,
    showRole,showRole,
    showRoleById:showRoleById,
    updateRole:updateRole,
    deleteRole:deleteRole,
    showRoleWithPermission

}