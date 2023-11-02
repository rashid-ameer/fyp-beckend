const express = require('express');
const attendanceController = require('../Controller/attendance.controller');
const router = express.Router();

router.post('/saveAttendance',attendanceController.saveAttendance);
router.post('/showAttendanceByStudentId',attendanceController.showAttendanceByStudentId);
// router.post('/deleteAnnouncement',attendanceController.deleteAnnouncement);
// router.post('/showAnnouncementByBatch',attendanceController.showAllAnnouncementsByBatch);
router.get('/showAllAttendance',attendanceController.showAllAttendance);

module.exports = router;