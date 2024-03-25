const express = require("express");
const ploController = require("../Controller/plo.controller");

// making router
const router = express.Router();

// setting http methods
router.post("/addPlo", ploController.addPlo);
router.put("/updatePlo/:id", ploController.updatePlo);
router.delete("/deletePlo/:id", ploController.deletePlo);

// exporting router
module.exports = router;
