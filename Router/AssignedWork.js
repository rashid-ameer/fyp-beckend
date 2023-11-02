const express=require('express');
const assignedWorkController=require("../Controller/assigned_work.controller");
const router=express.Router();

router.post("/saveAssignedWork",assignedWorkController.saveAssignedWork);
router.post("/updateAssignWork",assignedWorkController.updateAssignWork);
router.post("/showAssignedWorkByBatch",assignedWorkController.showAssignedWorkByBatch);
router.post("/showAssignWorkById",assignedWorkController.showAssignWorkById);
router.get("/showAllAssignedWork",assignedWorkController.showAllAssignedWork);



module.exports=router;