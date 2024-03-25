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

const getCommittee = async (req, res) => {
  try {
    // Assuming the batch_id and committee_id are provided in the request, for example, as query parameters
    const { committee_id } = req.body;

    const committee = await models.committee.findOne({
      where: { id: committee_id }, // Filter by committee_id
      attributes: ["id"],
      include: [
        {
          model: models.batch,
          // where: { id: batch_id }, // Filter by batch_id
          attributes: ["id", "batch"], // Include only specific fields from the batch
        },
        {
          model: models.supervisor_committee,
          attributes: ["id"],
          include: [
            {
              model: models.supervisor,
              attributes: ["id"],
              include: [
                {
                  model: models.user, // Include user details for each supervisor
                  attributes: ["id", "name", "email"], // Include only specific fields from the user
                },
              ],
            },
          ],
        },
        {
          model: models.group, // Include groups associated with the committee
          attributes: ["id", "project_title", "projectStatus"],
          include: [
            {
              model: models.student, // Include students within each group
              attributes: ["id"],
              include: [
                {
                  model: models.user, // Include user details for each student
                  attributes: ["id", "name", "email"], // Include only specific fields from the user
                },
              ],
            },
          ],
        },
      ],
    });

    // Check if the committee was found
    if (!committee) {
      return res.status(404).json({ message: "Committee not found" });
    }

    // Return the fetched committee
    res.json(committee);
  } catch (error) {
    // Log any errors that occur during the fetch operation
    console.error("Error fetching committee data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllCommittees = async (req, res) => {
  try {
    const committees = await models.committee.findAll({
      attributes: ["id", "batch_id"],
    });
    res.json(committees);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error in fetching committees");
  }
};

const getCommitteesByBatchId = async (req, res) => {
  const batch_id = req.body.batch_id;
  try {
    const committees = await models.committee.findAll({
      attributes: ["id"],
      where: { batch_id },
    });
    res.json(committees);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error in fetching committees");
  }
};

async function updateCommittee(req, res) {
  const committee_id = req.params.id;
  const { supervisors, groups } = req.body;

  try {
    // Fetch the committee by id to ensure it exists
    const committee = await models.committee.findByPk(committee_id);
    if (!committee) {
      return res.status(404).json({ message: "Committee not found" });
    }

    // Remove the committee_id from all supervisor_committee entries where it matches
    await models.supervisor_committee.destroy({
      where: { committee_id: committee_id },
    });
    await Promise.all(
      supervisors.map((supervisor_id) => {
        models.supervisor_committee.destroy({
          where: { supervisor_id, committee_id },
        });
      })
    );

    // Set the committee_id to null for all groups associated with this committee
    await models.group.update({ committee_id: null }, { where: { committee_id: committee_id } });
    await Promise.all(
      groups.map((group_id) => {
        models.group.update({ committee_id: null }, { where: { id: group_id } });
      })
    );

    // Add new supervisor_committee associations for each provided supervisor_id
    await Promise.all(
      supervisors.map((supervisor_id) =>
        models.supervisor_committee.create({
          committee_id: committee_id,
          supervisor_id: supervisor_id,
        })
      )
    );

    // Update or add the committee_id to each provided group_id
    await Promise.all(
      groups.map((group_id) => models.group.update({ committee_id: committee_id }, { where: { id: group_id } }))
    );

    // delete an isolated committee from committee table
    const committeeIds = await models.committee.findAll({ attributes: ["id"] });

    for (const committee_id of committeeIds) {
      const count = await models.supervisor_committee.count({
        where: { committee_id },
      });

      if (count === 0) {
        await models.committee.destroy({
          where: { id: committee_id },
        });
      }
    }

    res.status(200).json({
      message: "Committee updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while updating the committee",
      error: error.message,
    });
  }
}

async function getProjectsUnderCommittee(req, res) {
  const supervisor_id = req.body.supervisor_id;
  try {
    // Fetch all committees associated with the given supervisor through the supervisor_committee table
    const committees = await models.supervisor_committee.findAll({
      attributes: ["id", "committee_id", "supervisor_id"],
      where: { supervisor_id },
      include: [
        {
          model: models.committee,
          attributes: ["id"],
          include: [
            // Include groups/projects associated with each committee
            {
              model: models.group,
              attributes: ["id", "project_title", "projectStatus", "supervisor_id"],
              include: [
                // For each group's supervisor_id, include the supervisor and their user details
                {
                  model: models.supervisor,
                  attributes: ["id", "user_id"],
                  include: [
                    {
                      model: models.user,
                      attributes: ["id", "name", "email"],
                    },
                  ],
                },
                // Include students associated with each group
                {
                  model: models.student,
                  attributes: ["id", "user_id"],
                  include: [
                    // Include user details for each student
                    {
                      model: models.user,
                      attributes: ["id", "name", "email"],
                    },
                  ],
                },
              ],
            },
            // Include batch information for each committee
            {
              model: models.batch,
              attributes: ["id", "batch"],
            },
          ],
        },
      ],
    });

    res.json(committees);
  } catch (error) {
    res.status(500).json({ message: "Error occurred while fetching projects by supervisor", error: error.message });
  }
}

async function getCommitteeDetails(req, res) {
  const { committee_id } = req.body;
  try {
    const batch = await models.committee.findOne({
      where: { id: committee_id },
      attributes: ["id"],
      include: [
        {
          model: models.batch,
          attributes: ["id", "batch"],
        },
      ],
    });

    const supervisors = await models.supervisor_committee.findAll({
      where: { committee_id },
      attributes: [],
      include: [
        {
          model: models.supervisor,
          attributes: ["id", "office", "specialization"],
          include: [
            {
              model: models.user,
              attributes: ["id", "name", "email"],
            },
          ],
        },
      ],
    });

    const formattedSupervisors = supervisors.map((item) => item.supervisor);

    const groups = await models.group.findAll({
      where: { committee_id },
      attributes: ["id", "project_title"],
      include: [
        {
          model: models.student,
          attributes: ["id"],
          include: [
            {
              model: models.user,
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: models.supervisor,
          attributes: ["id"],
          include: [
            {
              model: models.user,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    res.json({
      supervisors: formattedSupervisors,
      groups,
      batch,
    });
  } catch (error) {
    console.error("Error fetching committee details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createCommittee,
  deleteCommittee,
  updateCommittee,
  getAllCommittees,
  getCommitteesByBatchId,
  getCommittee,
  updateCommittee,
  getProjectsUnderCommittee,
  getCommitteeDetails,
};
