const express = require("express");
const committeeController = require("../Controller/committee.controller");

const router = express.Router();

router.post("/createCommittee", committeeController.createCommittee);
router.delete("/deleteCommittee/:id", committeeController.deleteCommittee);
router.get("/getAllCommittees", committeeController.getAllCommittees);
router.post("/getCommitteesByBatchId", committeeController.getCommitteesByBatchId);
router.post("/getCommittee", committeeController.getCommittee);
router.post("/getProjectsUnderCommittee", committeeController.getProjectsUnderCommittee);
router.post("/getCommitteeDetails", committeeController.getCommitteeDetails);
router.put("/updateCommittee/:id", committeeController.updateCommittee);

module.exports = router;
