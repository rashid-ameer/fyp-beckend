const models = require("../models");

function saveGroup(req, res) {
  const group = {
    groupStatus: req.body.groupStatus,
    project_title: req.body.project_title,
    is_deleted: 0,
    projectStatus: "in progress",
  };
  models.group
    .create(group)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
        error: error,
      });
    });
}

function showGroupsByBatch(req, res) {
  models.group
    .findAll({
      include: [
        {
          model: models.student,
          include: [
            {
              model: models.user,
              where: {
                is_deleted: 0,
              },
              required: false,
            },
          ],
          where: {
            batch_id: req.body.batch_id,
          },
          required: false,
        },
      ],
      where: {
        is_deleted: 0,
      },
    })
    .then((result) => {
      result = result?.filter((group) => group.students.length > 1) || null;
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function showGroupsByBatchWithoutCommittee(req, res) {
  models.group
    .findAll({
      include: [
        {
          model: models.student,
          include: [
            {
              model: models.user,
              where: {
                is_deleted: 0,
              },
              required: false,
            },
          ],
          where: {
            batch_id: req.body.batch_id,
          },
          required: false,
        },
      ],
      where: {
        is_deleted: 0,
        committee_id: null,
      },
    })
    .then((result) => {
      result = result?.filter((group) => group.students.length > 1) || null;
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function showAllGroups(req, res) {
  models.group
    .findAll({
      include: [
        {
          model: models.student,
          include: [
            {
              model: models.user,
              where: {
                is_deleted: 0,
              },
              required: false,
            },
          ],
          required: false,
        },
      ],
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

function showAllGroupsUnderSupervisions(req, res) {
  models.group
    .findAll({
      include: [
        {
          model: models.student,
          include: [
            {
              model: models.user,
              where: {
                is_deleted: 0,
              },
              required: false,
            },
          ],
          required: false,
        },
      ],
      where: {
        supervisor_id: req.body.supervisor_id,
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

function showAllGroupsUnderSupervisionsByBatch(req, res) {
  models.group
    .findAll({
      include: [
        {
          model: models.student,
          include: [
            {
              model: models.user,
              where: {
                is_deleted: 0,
              },
              required: false,
            },
          ],
          where: {
            batch_id: req.body.batch_id,
          },
        },
      ],
      where: {
        supervisor_id: req.body.supervisor_id,
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

function showGroupById(req, res) {
  models.group
    .findAll({
      include: [
        {
          model: models.student,
          include: [
            {
              model: models.user,
              where: {
                is_deleted: 0,
              },
              required: false,
            },
          ],
          required: false,
        },
      ],
      where: {
        id: req.body.id,
        is_deleted: 0,
      },
    })
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function showGroupAttendanceById(req, res) {
  models.group
    .findAll({
      include: [
        {
          model: models.student,
          include: [
            {
              model: models.attendance,
              required: false,
            },
          ],
          required: false,
        },
      ],
      where: {
        id: req.body.id,
        is_deleted: 0,
      },
    })
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function updateMember(req, res) {
  models.student
    .update(
      {
        group_id: req.body.group_id,
      },
      {
        where: {
          user_id: req.body.user_name,
          is_deleted: 0,
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function addSupervisor(req, res) {
  models.group
    .update(
      {
        supervisor_id: req.body.supervisor_id,
        groupStatus: req.body.groupStatus,
      },
      {
        where: {
          id: req.body.id,
          is_deleted: 0,
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

module.exports = {
  saveGroup,
  showGroupById,
  showAllGroups,
  updateMember,
  showGroupsByBatch,
  // updateStudent,
  // deleteStudent
  addSupervisor,
  showAllGroupsUnderSupervisions,
  showAllGroupsUnderSupervisionsByBatch,
  showGroupAttendanceById,
  showGroupsByBatchWithoutCommittee,
};
