const express = require("express");
const supervisorController = require("../Controller/supervisor.controller");
const router = express.Router();
const uploadImages = require("./../Controller/uploadImage");

router.post("/saveSupervisor", uploadImages, supervisorController.saveSupervisor);
router.post("/showSupervisorByINS", supervisorController.showSupervisorByINS);
router.post("/showAllSupervisorsInDepartment", supervisorController.showAllSupervisorsInDepartment);
router.post("/updateSupervisor", uploadImages, supervisorController.updateSupervisor);
router.post("/deleteSupervisor", supervisorController.deleteSupervisor);
router.get("/showAllSupervisors", supervisorController.showAllSupervisors);
router.get("/getAvailableSupervisorsForCommittee/:id", supervisorController.getAvailableSupervisorsForCommittee);

module.exports = router;
