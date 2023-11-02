const express = require('express');
const notificationController = require('../Controller/notification_queue.controller');
const router = express.Router();

router.post('/saveNotification',notificationController.saveNotification);
router.post('/updateNotification',notificationController.updateNotification);
router.post('/showAllNotificationByBatch',notificationController.showAllNotificationByBatch);
router.post('/showAllNotificationByStudent',notificationController.showAllNotificationByStudent);
router.get('/showAllNotification',notificationController.showAllNotification);
router.post('/updateNotificationReadStatus',notificationController.updateNotificationReadStatus);

module.exports = router;