const models = require("../models");

function saveAttendance(req, res) {
  const attendance = {
    student_id: req.body.student_id,
    meeting_id: req.body.meeting_id,
    status_is_present: req.body.attendance,
    is_deleted: 0
  };
  models.attendance
    .create(attendance)
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

function showAttendanceByStudentId(req, res) {
  models.attendance.findAll({
      where: {
        student_id:req.body.student_id,
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

function showAllAttendance(req, res) {
  models.attendance.findAll({
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

// function showAssignWorkById(req, res) {
//   models.assigned_work
//     .findAll({
//       where: {
//         id: req.body.id,
//         is_deleted: 0,
//       },
//     })
//     .then((result) => {
//       res.status(200).json(result[0]);
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: "error occurred",
//       });
//     });
// }

// function updateAssignWork(req, res) {
//   models.assigned_work
//     .update(
//       {
//         title: req.body.title,
//         description: req.body.description,
//         total_points: req.body.total_points,
//         deadLine: req.body.deadLine,
//         report_type_id: req.body.report_type_id,
//         batch_id: req.body.batch_id,
//         is_deleted: 0,
//       },
//       {
//         where: {
//           id: req.body.id,
//           is_deleted: 0,
//         },
//       }
//     )
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: "error occurred",
//       });
//     });
// }



module.exports = {
  saveAttendance,
  showAllAttendance,
  showAttendanceByStudentId,
};
