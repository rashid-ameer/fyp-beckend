const models = require("../models");
const batch = require("../models/batch");
const { Op } = require("sequelize");
function saveSupervisor(req, res) {
  const supervisor = {
    id: "",
    user_id: req.body.user_name,
    office: req.body.office,
    specialization: req.body.specialization,
    is_deleted: 0,
  };
  const user = {
    user_name: req.body.user_name,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    imgUrl: req.file ? "http://localhost:8080/File/getImage/" + req.file.filename : null,
    isActive: req.body.isActive,
    is_varified: req.body.is_varified,
    department_id: req.body.department_id,
    department_id: req.body.department_id,
    is_deleted: 0,
    role_id: req.body.role_id,
  };
  models.user
    .create(user)
    .then((header) => {
      res.status(200).json(header);
      supervisor.id = header.id;
      models.supervisor.create(supervisor);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
        error: error,
      });
    });
}

function showAllSupervisorsInDepartment(req, res) {
  models.department
    .findAll({
      include: [
        {
          model: models.user,
          include: [
            {
              model: models.supervisor,
              where: {
                //   user_id:models.user.user_name
              },
              required: false,
            },
          ],
          required: false,
        },
      ],
      where: {
        department_name: req.body.department_name,
      },
      //  include :[{
      //     model: models.user,
      //     where: {
      //         is_deleted:0,
      //         //role_id:2
      //     },
      //     required: false
      // }],
      // where: {
      //     department_name:req.body.department_name,
      //     //is_deleted: 0
      // }
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function showAllSupervisors(req, res) {
  models.supervisor
    .findAll({
      include: "user",
      where: {
        is_deleted: 0,
      },
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function showSupervisorByINS(req, res) {
  models.supervisor
    .findOne({
      include: "user",
      where: {
        user_id: req.body.user_name,
        is_deleted: 0,
      },
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function updateSupervisor(req, res) {
  models.supervisor
    .update(
      {
        user_id: req.body.user_name,
        office: req.body.office,
        specialization: req.body.specialization,
      },
      {
        where: {
          id: req.body.id,
          user_id: req.body.user_name,
          is_deleted: 0,
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
      models.user.update(
        {
          user_name: req.body.user_name,
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: req.body.password,
          imgUrl: req.file ? "http://localhost:8080/File/getImage/" + req.file.filename : null,
          isActive: req.body.isActive,
          is_varified: req.body.is_varified,
          role_id: req.body.role_id,
          department_id: req.body.department_id,
        },
        {
          where: {
            id: req.body.id,
            is_deleted: 0,
          },
        }
      );
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function deleteSupervisor(req, res) {
  models.supervisor
    .update(
      {
        is_deleted: 1,
      },
      {
        where: {
          id: req.body.id,
          user_id: req.body.user_name,
          is_deleted: 0,
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
      models.user.update(
        {
          is_deleted: 1,
        },
        {
          where: {
            id: req.body.id,
            user_name: req.body.user_name,
            is_deleted: 0,
          },
        }
      );
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

async function getAvailableSupervisorsForCommittee(req, res) {
  const batch_id = req.params.id;

  console.log("batch id", batch_id);
  try {
    // Fetch committee IDs associated with the batch ID
    const committees = await models.committee.findAll({
      attributes: ["id"],
      where: {
        batch_id,
      },
    });

    // Extract committee IDs from the result
    const committeeIds = committees.map((committee) => committee.id);

    // Fetch supervisors associated with the retrieved committee IDs
    const supervisorsWithCommittee = await models.supervisor_committee.findAll({
      attributes: ["supervisor_id"], // Assuming you only want supervisor IDs
      where: {
        committee_id: committeeIds,
      },
      raw: true,
    });

    // Extract supervisor IDs associated with committees
    const supervisorIdsWithCommittee = supervisorsWithCommittee.map((supervisor) => supervisor.supervisor_id);

    // Fetch supervisors that are not associated with the retrieved committee IDs
    const availableSupervisors = await models.supervisor.findAll({
      where: {
        id: { [Op.notIn]: supervisorIdsWithCommittee }, // Exclude supervisors with committee IDs
      },
      include: [
        {
          model: models.user, // Include the User model
          attributes: ["id", "name"], // Specify which user attributes to include
        },
      ],
      raw: true,
    });
    // Adjust the structure of the returned data
    const formattedSupervisors = availableSupervisors.map((supervisor) => ({
      ...supervisor,
      user: {
        id: supervisor["user.id"],
        name: supervisor["user.name"],
      },
    }));

    // Remove user-related attributes from the supervisor object
    formattedSupervisors.forEach((supervisor) => {
      delete supervisor["user.id"];
      delete supervisor["user.name"];
    });

    res.status(200).json(formattedSupervisors);
  } catch (error) {
    console.error("Error fetching supervisors without committee:", error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  saveSupervisor,
  showAllSupervisorsInDepartment,
  showAllSupervisors,
  showSupervisorByINS,
  updateSupervisor,
  deleteSupervisor,
  getAvailableSupervisorsForCommittee,
};
