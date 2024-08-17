const mongoose = require('mongoose');
const User = require('../models/User');

// Utility function to validate ObjectId
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Get all users
async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err); 
    res.status(500).send('Server error');
  }
}

// Get user by ID
async function getSingleUser(req, res) {
  try {
    const userId = req.params.userId;

    if (!isValidObjectId(userId)) {
      return res.status(400).send('Invalid user ID');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

// Create a new user
async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Validate input data
    if (!username || !email || !password) {
      return res.status(400).send('Missing required fields');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    const newUser = new User(req.body);
    await newUser.setPassword(password); // Hash password before saving
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err); 
    res.status(400).send('Bad request');
  }
}

// Update user by ID
async function updateUser(req, res) {
  try {
    const userId = req.params.userId;

    if (!isValidObjectId(userId)) {
      return res.status(400).send('Invalid user ID');
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err); 
    res.status(400).send('Bad request');
  }
}

// Delete user by ID
async function deleteUser(req, res) {
  try {
    const userId = req.params.userId;

    if (!isValidObjectId(userId)) {
      return res.status(400).send('Invalid user ID');
    }

    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).send('User not found');
    }
    res.status(204).send(); 
  } catch (err) {
    console.error(err); 
    res.status(500).send('Server error');
  }
}

// Add a friend
async function addFriend(req, res) {
  try {
    const { userId, friendId } = req.params;

    if (!isValidObjectId(userId) || !isValidObjectId(friendId)) {
      return res.status(400).send('Invalid user or friend ID');
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user) {
      return res.status(404).send('User not found');
    }
    if (!friend) {
      return res.status(404).send('Friend not found');
    }
    if (user.friends.includes(friendId)) {
      return res.status(400).send('Friend already added');
    }

    user.friends.push(friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err); 
    res.status(500).send('Server error');
  }
}

// Remove a friend
async function removeFriend(req, res) {
  try {
    const { userId, friendId } = req.params;

    if (!isValidObjectId(userId) || !isValidObjectId(friendId)) {
      return res.status(400).send('Invalid user or friend ID');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const friendIndex = user.friends.indexOf(friendId);
    if (friendIndex === -1) {
      return res.status(400).send('Friend not found in user\'s friends list');
    }

    user.friends.splice(friendIndex, 1);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err); 
    res.status(500).send('Server error');
  }
}

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};

