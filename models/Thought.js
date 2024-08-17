const mongoose = require('mongoose');
const { format } = require('date-fns');
const Schema = mongoose.Schema;

// Define Reaction Schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => format(timestamp, 'yyyy-MM-dd HH:mm:ss')  
  }
}, { _id: false }); 

// Define Thought Schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => format(timestamp, 'yyyy-MM-dd HH:mm:ss')  
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]  
}, { timestamps: true }); 

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Include virtuals in JSON
thoughtSchema.set('toJSON', { virtuals: true });

// Export the Thought model
module.exports = mongoose.model('Thought', thoughtSchema);

