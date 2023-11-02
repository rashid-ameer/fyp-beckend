const models = require("../models");
function saveGroupSubmission(req, res) {
  const submission = {
    group_id: req.body.group_id,
    assigned_work_id: req.body.assigned_work_id,
    submission_date_time: req.body.submission_date_time,
    submission_status: 1,
    evaluation_status: 0,
    is_deleted: 0,
  };
  models.group_submitted_file
    .create(submission)
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

function updateGroupSubmission(req, res) {
  const submission = {
    submission_date_time: req.body.submission_date_time,
  };
  console.log(req.body);
  models.group_submitted_file
    .update(submission, {
      where: {
        id: req.body.id,
      },
    })
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

function showSubmittedFilesByAssignedWorkId(req, res) {
  models.group_submitted_file
    .findAll({
      include: [
        {
          model: models.file
        },
      ],
      where: {
        assigned_work_id: req.body.id,
      },
    })
    .then((result) => {
      result = result.filter((re) => re.assigned_work !== null);
      res.status(200).json(result.sort((a, b) => a.id - b.id));
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function showSubmittedFilesByAssignedWork(req, res) {
  models.report_type
    .findAll({
      include: [
        {
          model: models.assigned_work,
          where:{
            id: req.body.id
          }
        },
      ],
      where: {
        is_deleted: 0,
      },
    })
    .then((result) => {
      result = result.filter((re) => re.assigned_work !== null);
      res.status(200).json(result.sort((a, b) => a.id - b.id));
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function showSubmittedFilesByGroup(req, res) {
  models.report_type
    .findAll({
      include: [
        {
          model: models.assigned_work,
          include: [
            {
              model: models.group_submitted_file,
              include: [
                {
                  model: models.file,
                  required: false,
                },
              ],
              where: {
                group_id: req.body.group_id,
              },
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
      result = result.filter((re) => re.assigned_work !== null);
      res.status(200).json(result.sort((a, b) => a.id - b.id));
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

function showSubmittedFilesByAllGroup(req, res) {
  models.report_type
    .findAll({
      include: [
        {
          model: models.assigned_work,
          include: [
            {
              model: models.group_submitted_file,
              include: [
                {
                  model: models.file,
                },
              ],
            },
          ],
        },
      ],
      where: {
        report_type: 'Abstract',
        is_deleted: 0,
      },
    })
    .then((result) => {
      result = result.filter((re) => re.assigned_work !== null);
      res.status(200).json(result.sort((a, b) => a.id - b.id));
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}

module.exports = {
  saveGroupSubmission,
  showSubmittedFilesByGroup,
  updateGroupSubmission,
  showSubmittedFilesByAssignedWork,
  showSubmittedFilesByAssignedWorkId,
  showSubmittedFilesByAllGroup
};
