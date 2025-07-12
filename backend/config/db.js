const mongoose = require('mongoose');

const connectDB = async () => {
  const connectionOptions = {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10,
    retryWrites: true,
    w: 'majority'
  };

  try {
    await mongoose.connect(process.env.MONGO_URI, connectionOptions);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Connection events
mongoose.connection.on('connecting', () => {
  console.log('Connecting to MongoDB...');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = connectDB;