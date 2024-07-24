const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config').get(process.env.NODE_ENV)

const UserSchema = new Schema({
   username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
            },
           thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
           }],
           friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
           }]
           }, {timestamps: true})

           userSchema.virtual('friendCount').get(function() {
            return this.friends.length;
          });

           module.exports = mongoose.model('User', UserSchema)
