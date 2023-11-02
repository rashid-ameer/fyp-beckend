const express=require('express');
const studentController=require("../Controller/student.controller");
const router=express.Router();
const uploadImages = require("./../Controller/uploadImage");

// router.post("/saveStudent",studentController.saveStudent);
router.post("/saveStudent",uploadImages,studentController.saveStudent);
router.post("/showStudentByCMS",studentController.showStudentByCMS);
router.post("/showAllStudentsInBatch",studentController.showAllStudentsInBatch);
router.post("/updateStudent",uploadImages,studentController.updateStudent);
router.post("/deleteStudent",studentController.deleteStudent);
router.get("/showAllStudents",studentController.showAllStudents);



module.exports=router;