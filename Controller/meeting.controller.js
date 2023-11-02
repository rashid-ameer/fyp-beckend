const models = require("../models");

function saveMeeting(req, res) {
  const work = {
    supervisor_id: req.body.supervisor_id,
    group_id: req.body.group_id,
    agenda: req.body.title,
    action_work: req.body.description,
    date_and_time: req.body.date,
    is_deleted: 0
  };
  models.meeting
    .create(work)
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

function showMeetingByGroupId(req, res) {
  models.meeting.findAll({
      where: {
        group_id:req.body.group_id,
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

function showAllMeetings(req, res) {
  models.meeting.findAll({
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
  saveMeeting,
  showMeetingByGroupId,
  showAllMeetings,
};
