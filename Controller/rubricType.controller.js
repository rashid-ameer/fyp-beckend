const model = require("../models");

// function to add rubric to database
async function addRubricType(req, res) {
  try {
    const { rubric_type } = req.body;

    // adding rubric type to database
    const newRubrictype = model.rubric_type.create({ rubric_type, is_deleted: 0 });

    res.status(201).json(newRubrictype); //Send back the rubric type
  } catch (error) {
    console.error("Error adding Rubric Type:", error);
    res.status(500).json({ error: "Failed to add Rubric Type" });
  }
}

// function to update the rubric
async function updateRubricType(req, res) {
  const { id } = req.params;
  const { rubric_type } = req.body;

  try {
    const rubricType = await model.rubric_type.findByPk(id);

    if (!rubricType) {
      return res.json({ error: "Rubric Type does not exists" });
    }

    rubricType.rubric_type = rubric_type;
    await rubricType.save();
    res.json(rubricType);
  } catch (error) {
    console.log("Error updating rubric type", error);
    res.status(500).json({ error: "Failed to update Rubric Type" });
  }
}

// function to delete the rubric
async function deleteRubricType(req, res) {
  const { id } = req.params;

  try {
    const rubricType = await model.rubric_type.findByPk(id);
    if (!rubricType) {
      return res.json({ error: "Rubric Type does not exists" });
    }

    // delete the rubric
    await rubricType.destroy();
    res.json({ message: "Rubric Type deleted successfully" });
  } catch (error) {
    console.log("Error deleting rubric type", error);
    res.status(500).json({ error: "Failed to delete Rubric Type" });
  }
}

// exporting function
module.exports = {
  addRubricType,
  updateRubricType,
  deleteRubricType,
};
