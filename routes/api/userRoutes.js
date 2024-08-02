const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// Validate ObjectId format
function validateObjectId(req, res, next) {
  const { id, userId, friendId } = req.params;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid user ID');
  }
  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send('Invalid user ID');
  }
  if (friendId && !mongoose.Types.ObjectId.isValid(friendId)) {
    return res.status(400).send('Invalid friend ID');
  }
  next();
}

router.use('/:id', validateObjectId);
router.use('/:userId/friends/:friendId', validateObjectId);

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
