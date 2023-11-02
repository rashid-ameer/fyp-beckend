const express=require('express');
const roleController=require("../Controller/login.controller");
const router=express.Router();

router.post("/userLogin",roleController.userLogin);


module.exports=router;