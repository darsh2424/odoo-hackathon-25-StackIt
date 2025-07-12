const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  questionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Question', 
    required: true 
  },
  answeredBy: { type: String, required: true, ref: 'User' },
  upvotes: [{ type: String, ref: 'User' }],
  downvotes: [{ type: String, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

answerSchema.virtual('score').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

module.exports = mongoose.model('Answer', answerSchema);