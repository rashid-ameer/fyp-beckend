const express = require('express');
const announcementController = require('../Controller/announcement.controller');
const router = express.Router();

router.post('/saveAnnouncement',announcementController.saveAnnouncement);
router.post('/updateAnnouncement',announcementController.updateAnnouncement);
router.post('/deleteAnnouncement',announcementController.deleteAnnouncement);
router.post('/showAnnouncementByBatch',announcementController.showAllAnnouncementsByBatch);
router.get('/showAllAnnouncements',announcementController.showAllAnnouncements);

module.exports = router;