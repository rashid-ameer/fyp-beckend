const express=require('express');
const userController=require("../Controller/user.controller");
const router=express.Router();

router.post("/saveUser",userController.saveUser);
router.post("/updateUser",userController.updateUser);
router.post("/deleteUser",userController.deleteUser);
router.post("/showUserByUserName",userController.showUserByUserName);
router.get("/showAllUsers",userController.showAllUsers);
router.post("/showAllUsersByRole",userController.showAllUsersByRole);
router.post("/showAllUsersByBatch",userController.showAllUsersByBatch);
router.post("/showAllUsersAttendanceByBatch",userController.showAllUsersAttendanceByBatch);
router.get("/showAllUsersAttendance",userController.showAllUsersAttendance);
router.post("/getAttendanceByUserId",userController.getAttendanceByUserId);


module.exports=router;