const model = require("../models");

// function for adding rubric to database
async function addRubric(req, res) {
  const { criteria, rubric_type_id, PLO_id } = req.body;

  try {
    const newRubric = await model.rubric.create({ criteria, rubric_type_id, PLO_id, is_deleted: 0 });
    res.status(201).json(newRubric);
  } catch (error) {
    console.log("Error creating rubric", error);
    res.status(500).json({ error: "Error while creating Rubric." });
  }
}

async function updateRubric(req, res) {
  const { criteria, rubric_type_id, PLO_id } = req.body;
  const { id } = req.params;

  try {
    // updating rubric
    const [rowsUpdated] = await model.rubric.update({ criteria, rubric_type_id, PLO_id }, { where: { id } });

    if (rowsUpdated === 0) {
      return res.status(400).json({ error: "No rubric found with this id" });
    }

    res.json({ message: "Rubric updated successfully" });
  } catch (error) {
    console.log("Error updating rubric", error);
    res.status(500).json({ error: "Error updating rubric" });
  }
}

async function deleteRubric(req, res) {
  const { id } = req.params;
  try {
    // Find the rubric by ID
    let rubric = await model.rubric.findByPk(id);

    if (!rubric) {
      return res.status(404).json({ error: "Rubric not found" });
    }

    // Soft delete the rubric by setting is_deleted to 1
    await rubric.update({ is_deleted: 1 });

    res.json({ message: "Rubric deleted successfully" });
  } catch (error) {
    console.error("Error deleting rubric:", error);
    res.status(500).json({ error: "Failed to delete rubric" });
  }
}

// exporting all functions
module.exports = {
  addRubric,
  updateRubric,
  deleteRubric,
};
