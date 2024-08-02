const mongoose = require('mongoose');
const Thought = require('../models/Thought');  // Ensure you have a Thought model

// Get all thoughts
async function getAllThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Get thought by ID
async function getThoughtById(req, res) {
  try {
    const thoughtId = req.params.id;
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).send('Thought not found');
    }
    res.json(thought);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Create a new thought
async function createThought(req, res) {
  try {
    const newThought = new Thought(req.body);
    await newThought.save();
    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).send(err.message);  // 400 for bad request
  }
}

// Update thought by ID
async function updateThought(req, res) {
  try {
    const thoughtId = req.params.id;
    const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).send('Thought not found');
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(400).send(err.message);  // 400 for bad request
  }
}

// Delete thought by ID
async function deleteThought(req, res) {
  try {
    const thoughtId = req.params.id;
    const result = await Thought.findByIdAndDelete(thoughtId);
    if (!result) {
      return res.status(404).send('Thought not found');
    }
    res.status(204).send();  // No content response
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Create a reaction
async function createReaction(req, res) {
  try {
    const { thoughtId } = req.params;
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).send('Thought not found');
    }
    thought.reactions.push(req.body);  // Assuming reactions is an array
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(400).send(err.message);  // 400 for bad request
  }
}

// Delete a reaction
async function deleteReaction(req, res) {
  try {
    const { thoughtId, reactionId } = req.params;
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).send('Thought not found');
    }
    const reactionIndex = thought.reactions.findIndex(reaction => reaction._id.toString() === reactionId);
    if (reactionIndex === -1) {
      return res.status(404).send('Reaction not found');
    }
    thought.reactions.splice(reactionIndex, 1);
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
};
