const model = require("../models");

async function addPlo(req, res) {
  try {
    const { title } = req.body;

    // Create a new PLO
    const newPLO = await model.PLO.create({ title, is_deleted: 0 });

    res.status(201).json(newPLO); // Send back the created PLO
  } catch (error) {
    console.error("Error adding PLO:", error);
    res.status(500).json({ error: "Failed to add PLO" });
  }
}

async function updatePlo(req, res) {
  try {
    const { id } = req.params;
    const { title } = req.body;

    // Find the PLO by ID
    const plo = await model.PLO.findByPk(id);

    if (!plo) {
      return res.status(404).json({ error: "PLO not found" });
    }

    console.log(plo);
    // Update the PLO's title
    plo.title = title;
    await plo.save();

    res.json(plo); // Send back the updated PLO
  } catch (error) {
    console.error("Error updating PLO:", error);
    res.status(500).json({ error: "Failed to update PLO" });
  }
}

async function deletePlo(req, res) {
  try {
    const { id } = req.params;

    // Find the PLO by ID
    const plo = await model.PLO.findByPk(id);

    if (!plo) {
      return res.status(404).json({ error: "PLO not found" });
    }

    // Delete the PLO
    await plo.destroy();

    res.json({ message: "PLO deleted successfully" });
  } catch (error) {
    console.error("Error deleting PLO:", error);
    res.status(500).json({ error: "Failed to delete PLO" });
  }
}

module.exports = {
  addPlo,
  updatePlo,
  deletePlo,
};
