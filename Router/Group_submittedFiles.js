const express=require('express');
const groupFilesUploadController=require("../Controller/group_submitted_file.Controller");
const router=express.Router();


router.post("/saveGroupSubmission",groupFilesUploadController.saveGroupSubmission);
router.post("/updateGroupSubmission",groupFilesUploadController.updateGroupSubmission);
router.post("/showSubmittedFilesByGroup",groupFilesUploadController.showSubmittedFilesByGroup);
router.post("/showSubmittedFilesByAssignedWork",groupFilesUploadController.showSubmittedFilesByAssignedWork);
router.post("/showSubmittedFilesByAssignedWorkId",groupFilesUploadController.showSubmittedFilesByAssignedWorkId);
router.get("/showSubmittedFilesByAllGroup",groupFilesUploadController.showSubmittedFilesByAllGroup);

module.exports=router;