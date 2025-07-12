const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');

exports.createQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    
    const question = new Question({
      title,
      description,
      tags: tags.map(tag => tag.toLowerCase()),
      askedBy: req.user.uid
    });

    await question.save();
    
    // Update user's questions count
    await User.findOneAndUpdate(
      { uid: req.user.uid },
      { $inc: { questionsCount: 1 } }
    );

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const { search, tag, sort = 'newest' } = req.query;
    const query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (tag) {
      query.tags = tag.toLowerCase();
    }
    
    let sortOption = { createdAt: -1 };
    if (sort === 'votes') sortOption = { votes: -1 };
    if (sort === 'views') sortOption = { views: -1 };

    const questions = await Question.find(query)
      .sort(sortOption)
      .populate('askedBy', 'name');
      
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('askedBy', 'name')
      .populate({
        path: 'answers',
        populate: { path: 'answeredBy', select: 'name' }
      });
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Increment view count
    question.views += 1;
    await question.save();
    
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};