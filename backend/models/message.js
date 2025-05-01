const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: function() {
            return !this.societe; // Name required if societe not provided
        }
    },
    societe: {
        type: String,
        required: function() {
            return !this.name; // Societe required if name not provided
        }
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address']
    },
    subject: {
        type: String,
        required: [true, 'Please enter a subject']
    },
    message: {
        type: String,
        required: [true, 'Please enter your message']
    },
    adminReply: {
        type: String,
        default: ''
    },
    isResponded: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);