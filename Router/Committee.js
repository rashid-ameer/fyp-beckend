const express = require("express");
const committeeController = require("../Controller/committee.controller");

const router = express.Router();

router.post("/createCommittee", committeeController.createCommittee);
router.delete("/deleteCommittee/:id", committeeController.deleteCommittee);
router.put("/updateCommittee/:id", committeeController.updateCommittee);

module.exports = router;
