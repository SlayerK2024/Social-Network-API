const mongoose = require('mongoose');
const Thought = require('../models/Thought');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Get all thoughts
async function getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.error(err); 
    res.status(500).send('Server error');
  }
}

// Get thought by ID
async function getSingleThought(req, res) {
  try {
    const thoughtId = req.params.thoughtId;

    if (!isValidObjectId(thoughtId)) {
      return res.status(400).send('Invalid thought ID');
    }

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).send('Thought not found');
    }
    res.json(thought);
  } catch (err) {
    console.error(err); 
    res.status(500).send('Server error');
  }
}

// Create a new thought
async function createThought(req, res) {
  try {
    const { thoughtText, username } = req.body;

    if (!thoughtText || !username) {
      return res.status(400).send('Missing required fields');
    }

    const newThought = new Thought(req.body);
    await newThought.save();
    res.status(201).json(newThought);
  } catch (err) {
    console.error(err); 
    res.status(400).send('Bad request');
  }
}

// Update thought by ID
async function updateThought(req, res) {
  try {
    const thoughtId = req.params.thoughtId;

    if (!isValidObjectId(thoughtId)) {
      return res.status(400).send('Invalid thought ID');
    }

    const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).send('Thought not found');
    }
    res.json(updatedThought);
  } catch (err) {
    console.error(err); 
    res.status(400).send('Bad request');
  }
}

// Delete thought by ID
async function deleteThought(req, res) {
  try {
    const thoughtId = req.params.thoughtId;

  
    if (!isValidObjectId(thoughtId)) {
      return res.status(400).send('Invalid thought ID');
    }

    const result = await Thought.findByIdAndDelete(thoughtId);
    if (!result) {
      return res.status(404).send('Thought not found');
    }
    res.status(204).send(); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

// Create a reaction
async function addReaction(req, res) {
  try {
    const { thoughtId } = req.params;

    if (!isValidObjectId(thoughtId)) {
      return res.status(400).send('Invalid thought ID');
    }

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).send('Thought not found');
    }

    const { reactionBody, username } = req.body;
    if (!reactionBody || !username) {
      return res.status(400).send('Missing required fields');
    }

    thought.reactions.push(req.body);  
    await thought.save();
    res.json(thought);
  } catch (err) {
    console.error(err); 
    res.status(400).send('Bad request');
  }
}

// Delete a reaction
async function deleteReaction(req, res) {
  try {
    const { thoughtId, reactionId } = req.params;

    if (!isValidObjectId(thoughtId) || !isValidObjectId(reactionId)) {
      return res.status(400).send('Invalid thought or reaction ID');
    }

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
    console.error(err); 
    res.status(500).send('Server error');
  }
}

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
};
