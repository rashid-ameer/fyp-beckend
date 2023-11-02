const models=require('../models');
const role = require('../models/role');

function saveDepartment(req,res){
    const department={
        department_name:req.body.department_name,
        is_deleted: 0
    };
    models.department.create(department).then(result=>{
        res.status(201).json({
            message:"Post successfully",
            department:result
        })
    }).catch(error=>{

        res.status(500).json({
            message:"error occurred",
            error:error

        })
    })
}


function showAllDepartment(req,res){

    models.department.findAll({
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

//input should be department like role CS ,EE
function showDepartment(req,res){
    models.department.findAll({
        where:{
            department_name:req.body.department_name,
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

// show Department by Department Id
function showDepartmentById(req,res){
    models.department.findAll({
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

function updateDepartment(req,res){
    models.department.update({
        department_name:req.body.department_name
    },{
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

function deleteDepartment(req,res){
    models.department.update({
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
    saveDepartment,
    showAllDepartment,
    showDepartment,
    showDepartmentById,
    updateDepartment,
    deleteDepartment

}