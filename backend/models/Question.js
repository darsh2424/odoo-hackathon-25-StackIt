const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  askedBy: { type: String, required: true, ref: 'User' },
  views: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

questionSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Question', questionSchema);