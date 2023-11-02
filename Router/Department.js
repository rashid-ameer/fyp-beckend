const express=require('express');
const departmentController=require("../Controller/department.controller");
const router=express.Router();

router.post("/saveDepartment",departmentController.saveDepartment);
router.get("/showAllDepartments",departmentController.showAllDepartment);
router.post("/showDepartment",departmentController.showDepartment);
router.post("/showDepartmentById",departmentController.showDepartmentById);
router.post("/deleteDepartment",departmentController.deleteDepartment);
router.post("/updateDepartment",departmentController.updateDepartment);

module.exports=router;