const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3, 
        maxlength: 20 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
}, { timestamps: true });

// Virtual field for friend count
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

UserSchema.methods.setPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
};

// validate password
UserSchema.methods.validatePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

//generate JWT token
UserSchema.methods.generateAuthToken = function() {
    const payload = {
        _id: this._id,
        username: this.username,
        email: this.email
    };
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
};

UserSchema.statics.findByEmail = function(email) {
    return this.findOne({ email });
};

UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);
