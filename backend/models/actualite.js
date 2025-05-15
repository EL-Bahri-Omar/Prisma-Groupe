const mongoose = require('mongoose');

const actualiteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter news title'],
        trim: true,
        maxLength: [100, 'News title cannot exceed 100 characters']
    },
    subtitle: {
        type: String,
        trim: true,
        maxLength: [200, 'News subtitle cannot exceed 200 characters']
    },
    paragraph: {
        type: String,
        required: [true, 'Please enter news content']
    },
    date: {
        type: Date,
        required: [true, 'Please enter news date'],
        default: Date.now
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    photos: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this news'],
        enum: {
            values: [
                'Company News',
                'Industry Updates',
                'Product Launches',
                'Events',
                'Partnerships',
                'Awards',
                'Team Updates',
                'Community'
            ],
            message: 'Please select correct category for news'
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Actualite', actualiteSchema);