const mongoose = require('mongoose');
const User = require('../models/User');  // Ensure you have a User model

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Get user by ID
async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Create a new user
async function createUser(req, res) {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send(err.message);  // 400 for bad request
  }
}

// Update user by ID
async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).send(err.message);  // 400 for bad request
  }
}

// Delete user by ID
async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).send('User not found');
    }
    res.status(204).send();  // No content response
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Add a friend
async function addFriend(req, res) {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const friend = await User.findById(friendId);
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
    res.status(500).send(err.message);
  }
}

// Remove a friend
async function removeFriend(req, res) {
  try {
    const { userId, friendId } = req.params;
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
    res.status(500).send(err.message);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};

