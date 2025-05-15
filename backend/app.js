const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

const errorMiddleware = require('./middlewares/errors');

//setting up config file 
dotenv.config({ path: 'backend/config/config.env' });
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


//Import all routes 
const actualites = require('./routes/actualite');
const blogs = require('./routes/blog');
const projects = require('./routes/project');
const teams = require('./routes/team');

const auth = require('./routes/auth');
const messages = require('./routes/message');


app.use('/api/v1', actualites)
app.use('/api/v1', blogs)
app.use('/api/v1', projects)
app.use('/api/v1', teams)

app.use('/api/v1', auth)
app.use('/api/v1', messages)

// Midcleware to handle errors
app.use(errorMiddleware);

module.exports = app
