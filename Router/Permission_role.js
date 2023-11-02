const express=require('express');
const permission_roleController=require("../Controller/permission_role.controller");
const router=express.Router();

router.post("/savePermission_role",permission_roleController.savePermission_role);
router.get("/showAllPermission_role",permission_roleController.showAllPermission_role);
router.post("/showPermission_role",permission_roleController.showAllPermission_role);
router.post("/deletePermission_role",permission_roleController.deletePermission_role);
router.post("/updatePermission_role",permission_roleController.deletePermission_role);

module.exports=router;