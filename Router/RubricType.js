const express = require("express");
const rubricTypeController = require("../Controller/rubricType.controller");

// making router
const router = express.Router();

// making https method
router.post("/addRubricType", rubricTypeController.addRubricType);
router.put("/updateRubricType/:id", rubricTypeController.updateRubricType);
router.delete("/deleteRubricType/:id", rubricTypeController.deleteRubricType);

// exporting router
module.exports = router;
