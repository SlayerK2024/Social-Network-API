const User = require('../models/User');
const Thought = require('../models/Thought');
const isValidEmail = require('../utils/validationUtils');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;

      if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      const newUser = await User.create({ username, email });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { username, email } = req.body;

      if (email && !isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      await Thought.deleteMany({ username: deletedUser.username });
      res.json({ message: 'User and associated thoughts deleted' });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  addFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friend = await User.findById(req.params.friendId);
      if (!user || !friend) {
        return res.status(404).json({ message: 'User or friend not found' });
      }
      if (!user.friends.includes(req.params.friendId)) {
        user.friends.push(req.params.friendId);
        await user.save();
      }
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const index = user.friends.indexOf(req.params.friendId);
      if (index > -1) {
        user.friends.splice(index, 1);
        await user.save();
      }
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

module.exports = userController;