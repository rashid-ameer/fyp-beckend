const express=require('express');
const report_typeController=require("../Controller/report_type.controller");
const router=express.Router();

router.post("/saveReport",report_typeController.saveReport);
router.post("/showReportById",report_typeController.showReportById);
router.post("/updateReport",report_typeController.updateReport);
router.post("/showAllReportsWithAssignedWorkByBatch",report_typeController.showAllReportsWithAssignedWorkByBatch);
// router.post("/updateStudent",groupController.updateStudent);
// router.post("/deleteStudent",groupController.deleteStudent);
router.get("/showAllReports",report_typeController.showAllReports);
router.get("/showAllReportsWithAssignedWork",report_typeController.showAllReportsWithAssignedWork);


module.exports=router;