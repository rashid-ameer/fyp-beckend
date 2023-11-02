const express = require('express');
const meetingController = require('../Controller/meeting.controller');
const router = express.Router();

router.post('/saveMeeting',meetingController.saveMeeting);
router.post('/showMeetingByGroupId',meetingController.showMeetingByGroupId);
router.get('/showAllMeetings',meetingController.showAllMeetings);

module.exports = router;