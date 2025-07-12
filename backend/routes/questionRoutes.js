const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const {
  createQuestion,
  getQuestions,
  getQuestion
} = require('../controllers/questionController');

router.post('/', authenticate, createQuestion);
router.get('/', getQuestions);
router.get('/:id', getQuestion);

module.exports = router;