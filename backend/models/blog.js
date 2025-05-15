 const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter blog title'],
        trim: true,
        maxLength: [200, 'Blog title cannot exceed 200 characters']
    },
    subtitle: {
        type: String,
        trim: true,
        maxLength: [300, 'Blog subtitle cannot exceed 300 characters']
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    contentBlocks: [{
        type: {
            type: String,
            enum: ['title', 'subtitle', 'paragraph', 'headline', 'gallery'],
            required: true
        },
        content: {
            type: String,
            required: function() {
                return this.type !== 'gallery';
            }
        },
        photos: [{
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }],
        order: {
            type: Number,
            required: true
        }
    }],
    image: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    pdf: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: [true, 'Please select a category for this blog'],
        enum: {
            values: [
                'Technology',
                'Programming',
                'Web Development',
                'Mobile Development',
                'Artificial Intelligence',
                'Data Science',
                'Cybersecurity',
                'Blockchain',
                'Cloud Computing',
                'DevOps',
                'UI/UX Design',
                'Business',
                'Startups',
                'Marketing',
                'Finance',
                'Productivity',
                'Health & Fitness',
                'Travel',
                'Food & Cooking',
                'Lifestyle',
                'Personal Development',
                'Education',
                'Entertainment',
                'Gaming',
                'News & Trends'
            ],
            message: 'Please select a valid blog category'
        }
    },
    tags: [String],
    publicationDate: {
        type: Date,
        default: Date.now
    },
    readTime: {
        type: String,
        required: [true, 'Please provide estimated read time']
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);