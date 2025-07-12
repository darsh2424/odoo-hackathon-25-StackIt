const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const {
  createAnswer,
  voteAnswer
} = require('../controllers/answerController');

router.post('/:id/answers', authenticate, createAnswer);
router.patch('/answers/:id/vote', authenticate, voteAnswer);

module.exports = router;