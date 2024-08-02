const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// Middleware to validate ObjectId
function validateObjectId(req, res, next) {
  const { id, thoughtId, reactionId } = req.params;
  
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid thought ID');
  }
  if (thoughtId && !mongoose.Types.ObjectId.isValid(thoughtId)) {
    return res.status(400).send('Invalid thought ID');
  }
  if (reactionId && !mongoose.Types.ObjectId.isValid(reactionId)) {
    return res.status(400).send('Invalid reaction ID');
  }
  next();
}

// Apply validation middleware
router.use('/:id', validateObjectId);
router.use('/:thoughtId/reactions/:reactionId', validateObjectId);

router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions')
  .post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
