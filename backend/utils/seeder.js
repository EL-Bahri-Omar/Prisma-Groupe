const Project = require('../models/project');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const Projects = require('../data/projects');

//Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const seedProjects = async () => {
    try {

        await Project.deleteMany();
        console.log('All Project are deleted.');

        await Project.insertMany(Projects);
        console.log('All Project are added');

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProjects();