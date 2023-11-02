const express=require('express');
const batchController=require("../Controller/batch.controller");
const router=express.Router();

router.post("/saveBatch",batchController.saveBatch);
router.post("/updateBatch",batchController.updateBatch);
router.post("/deleteBatch",batchController.deleteBatch);
router.post("/showBatchById",batchController.showBatchById);
router.get("/showAllBatches",batchController.showAllBatches);
router.post("/showStudentByBatch",batchController.showStudentByBatch);

module.exports=router;