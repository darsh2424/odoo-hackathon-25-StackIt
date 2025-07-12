const Answer = require('../models/Answer');
const Question = require('../models/Question');
const Notification = require('../models/Notification');

exports.createAnswer = async (req, res) => {
  try {
    const { content } = req.body;
    const questionId = req.params.id;
    
    const answer = new Answer({
      content,
      questionId,
      answeredBy: req.user.uid
    });

    await answer.save();
    
    // Add answer to question
    await Question.findByIdAndUpdate(
      questionId,
      { $push: { answers: answer._id }, $inc: { answersCount: 1 } }
    );

    // Create notification for question asker
    const question = await Question.findById(questionId);
    if (question.askedBy.toString() !== req.user.uid) {
      await Notification.create({
        userId: question.askedBy,
        message: 'New answer to your question',
        link: `/questions/${questionId}`
      });
    }

    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.voteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { voteType } = req.body;
    
    const answer = await Answer.findById(id);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    
    const userId = req.user.uid;
    
    // Remove existing votes
    answer.upvotes = answer.upvotes.filter(v => v.toString() !== userId);
    answer.downvotes = answer.downvotes.filter(v => v.toString() !== userId);
    
    // Add new vote
    if (voteType === 'upvote') {
      answer.upvotes.push(userId);
    } else if (voteType === 'downvote') {
      answer.downvotes.push(userId);
    }
    
    await answer.save();
    
    res.json({
      upvotes: answer.upvotes.length,
      downvotes: answer.downvotes.length,
      score: answer.upvotes.length - answer.downvotes.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};