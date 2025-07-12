const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const {
  getNotifications,
  markAsRead
} = require('../controllers/notificationController');

router.get('/', authenticate, getNotifications);
router.patch('/read', authenticate, markAsRead);

module.exports = router;