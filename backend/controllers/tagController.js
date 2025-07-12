const Tag = require('../models/Tag');
const Question = require('../models/Question');

exports.createTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const tag = new Tag({
      name: name.toLowerCase(),
      description
    });

    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTags = async (req, res) => {
  try {
    const { search } = req.query;
    const query = {};
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const tags = await Tag.find(query).sort({ questionsCount: -1 });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTag = async (req, res) => {
  try {
    const tag = await Tag.findOne({ name: req.params.name.toLowerCase() });
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    const questions = await Question.find({ tags: tag.name })
      .sort({ createdAt: -1 })
      .populate('askedBy', 'name');

    res.json({ tag, questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};