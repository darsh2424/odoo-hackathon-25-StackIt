const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const {
  createTag,
  getTags,
  getTag
} = require('../controllers/tagController');

router.post('/', authenticate, createTag);
router.get('/', getTags);
router.get('/:name', getTag);

module.exports = router;