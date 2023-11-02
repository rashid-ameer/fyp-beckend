const express=require('express');
const permissionController=require("../Controller/permissions.controller");
const router=express.Router();

router.post("/savePermission",permissionController.savePermission);
router.get("/showAllPermission",permissionController.showAllPermission);
router.post("/showPermission",permissionController.showAllPermission);
router.post("/deletePermission",permissionController.deletePermission);
router.post("/updatePermission",permissionController.deletePermission);

module.exports=router;