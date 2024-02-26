const models = require("../models");

async function createCommittee(req, res) {
  const { supervisors, groups, batch_id } = req.body;

  const newCommittee = {
    supervisor_id: supervisors[0],
    batch_id: batch_id,
    is_deleted: 0,
  };

  try {
    // Create the committee
    const committee = await models.committee.create(newCommittee);
    // console.log(committee);

    // Associate supervisors with the committee
    await Promise.all(
      supervisors.map(async (supervisorId) => {
        await models.supervisor_committee.create({
          committee_id: committee.id,
          supervisor_id: supervisorId,
          is_deleted: 0,
        });
      })
    );

    // Update groups with the committee ID
    await Promise.all(
      groups.map(async (groupId) => {
        await models.group.update({ committee_id: committee.id }, { where: { id: groupId } });
      })
    );

    res.status(201).json({
      message: "Committee created successfully",
      committee: committee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while creating committee",
      error: error.message,
    });
  }
}

async function deleteCommittee(req, res) {
  const committeeId = req.params.id;
  console.log(committeeId);

  try {
    // Find the committee
    const committee = await models.committee.findByPk(committeeId);

    if (!committee) {
      return res.status(404).json({ message: "Committee not found" });
    }

    // Delete associations with supervisors
    await models.supervisor_committee.destroy({ where: { committee_id: committeeId } });

    // Remove the committee ID from all corresponding groups
    await models.group.update({ committee_id: null }, { where: { committee_id: committeeId } });

    // Delete the committee
    await committee.destroy();

    res.status(200).json({ message: "Committee and associated data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while deleting committee",
      error: error.message,
    });
  }
}

async function updateCommittee(req, res) {
  const committeeId = req.params.id;
  const { batch_id, supervisors, groups } = req.body;

  try {
    // Find the committee
    const committee = await models.committee.findByPk(committeeId);

    if (!committee) {
      return res.status(404).json({ message: "Committee not found" });
    }

    // Update the committee details
    await committee.update({
      batch_id: batch_id || committee.batch_id, // If batch_id is not provided, keep the existing value
    });

    // Update associations with supervisors if supervisors are provided
    if (supervisors) {
      // Delete existing associations
      await models.supervisor_committee.destroy({ where: { committee_id: committeeId } });
      // Create new associations based on the provided supervisor IDs
      await Promise.all(
        supervisors.map(async (supervisorId) => {
          await models.supervisor_committee.create({
            committee_id: committeeId,
            supervisor_id: supervisorId,
            is_deleted: 0,
          });
        })
      );
    }

    // If groups are provided, update groups with the new committee ID
    if (groups) {
      // Remove the committee ID from all corresponding groups
      await models.group.update({ committee_id: null }, { where: { committee_id: committeeId } });
      // Update the groups specified in the request with the new committee ID
      await models.group.update({ committee_id: committeeId }, { where: { id: groups } });
    }

    res.status(200).json({ message: "Committee updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while updating committee",
      error: error.message,
    });
  }
}

module.exports = {
  createCommittee,
  deleteCommittee,
  updateCommittee,
};
