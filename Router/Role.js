const express=require('express');
const roleController=require("../Controller/role.controller");
const router=express.Router();

router.post("/saveRole",roleController.saveRole);
router.get("/showAllRoles",roleController.showAllRoles);
router.post("/showRole",roleController.showRole);
router.post("/showRoleById",roleController.showRoleById);
router.post("/deleteRole",roleController.deleteRole);
router.post("/updateRole",roleController.updateRole);
router.get("/showRoleWithPermission",roleController.showRoleWithPermission);


module.exports=router;