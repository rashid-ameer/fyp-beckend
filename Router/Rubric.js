const express = require("express");
const rubricController = require("../Controller/rubric.controller");

// making router
const router = express.Router();

// making http methods
router.post("/addRubric", rubricController.addRubric);
router.put("/updateRubric/:id", rubricController.updateRubric);
router.delete("/deleteRubric/:id", rubricController.deleteRubric);

// exporting router
module.exports = router;
