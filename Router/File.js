const express=require('express');
const filesUploadController=require("../Controller/filesUploading.controller");
const router=express.Router();
const uploadFile = require("./../Controller/upload");

router.post("/saveFiles",uploadFile,filesUploadController.saveFiles);
router.post("/updateFiles",uploadFile,filesUploadController.updateFiles);
router.get("/download/:file_name",filesUploadController.download);
router.get("/getImage/:fileName",filesUploadController.getImage);

module.exports=router;