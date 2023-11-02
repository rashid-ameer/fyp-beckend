const models = require("../models");

function saveReport(req, res) {
  const report = {
    report_type: req.body.report_type,
    is_deleted: 0,
  };
  models.report_type
    .create(report)
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

function showReportById(req, res) {
  models.report_type
    .findAll({
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

function showAllReports(req, res) {
  models.report_type
    .findAll({
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

function updateReport(req, res) {
  models.report_type
    .update(
      {
        report_type: req.body.report_type,
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

function showAllReportsWithAssignedWork(req, res) {
  models.report_type
    .findAll({
      include: "assigned_work",
      where: {
        is_deleted: 0,
      },
    })
    .then((result) => {
      res.status(200).json(result.sort((a, b) => a.id - b.id));
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}
function showAllReportsWithAssignedWorkByBatch(req, res) {
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
                }
              ],
              where: {
                group_id: req.body.group_id,
              },
              required: false,
            },
          ],
          where: {
            batch_id: req.body.id,
            is_deleted: 0,
          },
          required: false,
        },
        
      ],
      where: {
        is_deleted: 0,
      },
    })
    .then((result) => {
      res.status(200).json(result.sort((a, b) => a.id - b.id));
    })
    .catch((error) => {
      res.status(500).json({
        message: "error occurred",
      });
    });
}
// function deleteStudent(req, res) {
//     models.student.update({
//        is_deleted:1
//     },{
//         where: {
//             id:req.body.id,
//             user_id: req.body.user_name,
//             is_deleted: 0
//         }
//     }).then(result => {
//         res.status(200).json(result);
//         models.user.update({
//             is_deleted:1
//         },{
//             where:{
//             id:req.body.id,
//              user_name:req.body.user_name,
//              is_deleted:0
//             }
//         })
//     }).catch(error => {
//         res.status(500).json({
//             message: "error occurred"
//         })
//     })
// }

module.exports = {
  saveReport,
  showReportById,
  showAllReports,
  updateReport,
  showAllReportsWithAssignedWork,
  showAllReportsWithAssignedWorkByBatch,
};
