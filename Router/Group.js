const express=require('express');
const groupController=require("../Controller/group.controller");
const router=express.Router();

router.post("/saveGroup",groupController.saveGroup);
router.post("/addSupervisor",groupController.addSupervisor);
router.post("/showGroupById",groupController.showGroupById);
router.post("/updateMember",groupController.updateMember);
// router.post("/showAllStudentsInBatch",groupController.showAllStudentsInBatch);
// router.post("/updateStudent",groupController.updateStudent);
// router.post("/deleteStudent",groupController.deleteStudent);
router.get("/showAllGroups",groupController.showAllGroups);
router.post("/showGroupsByBatch",groupController.showGroupsByBatch);
router.post("/showAllGroupsUnderSupervisions",groupController.showAllGroupsUnderSupervisions);
router.post("/showAllGroupsUnderSupervisionsByBatch",groupController.showAllGroupsUnderSupervisionsByBatch);
router.post("/showGroupAttendanceById",groupController.showGroupAttendanceById);

module.exports=router;