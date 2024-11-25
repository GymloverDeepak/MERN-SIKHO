// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 10
    },
    age: {
        type: Number,
        required: true
    }
});
const User = mongoose.model('user', UserSchema);
User.createIndexes();
module.exports = User;
