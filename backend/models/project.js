const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter project title'],
        trim: true,
        maxLength: [100, 'Project title cannot exceed 100 characters']
    },
    subtitle: {
        type: String,
        trim: true,
        maxLength: [200, 'Project subtitle cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter project description']
    },
    date: {
        type: Date,
        required: [true, 'Please enter project date']
    },
    ratings: {
        type: Number,
        default: 0
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
    video: {
        public_id: {
            type: String
        },
        url: {
            type: String
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
        required: [true, 'Please select category for this project'],
        enum: {
            values: [
                "Education",
                "Web",
                "Finance",
                "Commerce",
                "Tourism",
                "Hotels",
                "IT",
                "Immobilier",
                "Culture",
                "Organizations",
                "Events",
                "Restauration",
                "Magazine",
                "Automobile",
                "BTP",
                "Assurance"
            ],
            message: 'Please select correct category for project'
        }
    },
    place: {
        type: String,
        required: [true, 'Please enter project location']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
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

module.exports = mongoose.model('Project', projectSchema);