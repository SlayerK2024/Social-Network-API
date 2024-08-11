const mongoose = require('mongoose');
const { User, Thought } = require('../models'); // Ensure models are correctly imported
const { users, thoughts } = require('./data'); // Ensure seed data is correctly imported


// Handle connection errors
mongoose.connection.on('error', (err) => console.error(err));

mongoose.connection.once('open', async () => {
  console.log('Connected to the database');

  try {
    // Drop collections if they exist
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const collection of collections) {
      await mongoose.connection.db.dropCollection(collection.name);
      console.log(`Dropped collection: ${collection.name}`);
    }

    // Create user data with hashed passwords
    const hashedUsers = await Promise.all(users.map(async (user) => {
      const newUser = new User(user);
      await newUser.setPassword(user.password); // Hash the password
      return newUser.save();
    }));

    console.log(`Inserted ${hashedUsers.length} users`);

    // Insert thoughts
    const thoughtData = await Thought.create(thoughts);
    console.log(`Inserted ${thoughtData.length} thoughts`);

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');

  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    // Close the connection and exit
    mongoose.connection.close(() => process.exit(0));
  }
});
