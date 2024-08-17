const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const { users, thoughts } = require('./data');
const User = require('../models/User'); 
const Thought = require('../models/Thought'); 
// Database connection
mongoose.connect('mongodb://localhost:27017/socialNetworkDB', { 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Hash user passwords and seed the database
const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Hash passwords and create users
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      await user.save();
    }

    // Create thoughts
    await Thought.insertMany(thoughts);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();


