const Blog = require('../models/blog');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const Blogs = require('../data/blogs');

//Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const seedBlogs = async () => {
    try {

        await Blog.deleteMany();
        console.log('All Blog are deleted.');

        await Blog.insertMany(Blogs);
        console.log('All Blog are added');

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedBlogs();