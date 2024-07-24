const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
