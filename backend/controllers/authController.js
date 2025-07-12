const admin = require('firebase-admin');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Create Firebase user
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });

    // Create local user
    const user = new User({
      uid: firebaseUser.uid,
      email,
      name,
      username: email.split('@')[0]
    });

    await user.save();

    // Generate custom token for client
    const token = await admin.auth().createCustomToken(firebaseUser.uid);

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verify user exists in Firebase
    const firebaseUser = await admin.auth().getUserByEmail(email);
    
    // Get local user data
    const user = await User.findOne({ uid: firebaseUser.uid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate custom token for client
    const token = await admin.auth().createCustomToken(firebaseUser.uid);

    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};