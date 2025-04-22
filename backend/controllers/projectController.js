const Project = require('../models/project');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

// Create new project => /api/v1/admin/project/new
exports.newProject = catchAsyncErrors(async (req, res, next) => {
    // Upload featured image
    const imageResult = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: 'projects/image'
    });

    // Upload gallery photos
    let photos = [];
    if (req.body.photos && req.body.photos.length > 0) {
        photos = typeof req.body.photos === 'string' 
            ? [req.body.photos] 
            : req.body.photos;

        let photosLinks = [];
        for (let i = 0; i < photos.length; i++) {
            const result = await cloudinary.v2.uploader.upload(photos[i], {
                folder: 'projects/gallery'
            });
            photosLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }
        req.body.photos = photosLinks;
    }

    req.body.image = {
        public_id: imageResult.public_id,
        url: imageResult.secure_url
    };
    req.body.user = req.user.id;

    const project = await Project.create(req.body);

    res.status(201).json({
        success: true,
        project
    });
});

// Get all projects => /api/v1/projects?keyword=modern
exports.getProjects = catchAsyncErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Project.find(), req.query)
                        .search()
                        .filter();
                        
    const projects = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: projects.length,
        projects
    });
});

// Get all projects (Admin) => /api/v1/admin/projects
exports.getAdminProjects = catchAsyncErrors(async (req, res, next) => {
    const projects = await Project.find();

    res.status(200).json({
        success: true,
        count: projects.length,
        projects
    });
});

// Get single project details => /api/v1/project/:id
exports.getSingleProject = catchAsyncErrors(async (req, res, next) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        return next(new ErrorHandler('Project not found', 404));
    }

    res.status(200).json({
        success: true,
        project
    });
});

// Update Project => /api/v1/admin/project/:id
exports.updateProject = catchAsyncErrors(async (req, res, next) => {
    let project = await Project.findById(req.params.id);

    if (!project) {
        return next(new ErrorHandler('Project not found', 404));
    }

    // Handle image update
    if (req.body.image) {
        // Delete previous image
        await cloudinary.v2.uploader.destroy(project.image.public_id);

        const result = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: 'projects/image'
        });
        req.body.image = {
            public_id: result.public_id,
            url: result.secure_url
        };
    }

    // Handle photos update
    if (req.body.photos && req.body.photos.length > 0) {
        // Delete existing photos
        for (let i = 0; i < project.photos.length; i++) {
            await cloudinary.v2.uploader.destroy(project.photos[i].public_id);
        }

        let photosLinks = [];
        const photos = typeof req.body.photos === 'string' 
            ? [req.body.photos] 
            : req.body.photos;

        for (let i = 0; i < photos.length; i++) {
            const result = await cloudinary.v2.uploader.upload(photos[i], {
                folder: 'projects/gallery'
            });
            photosLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }
        req.body.photos = photosLinks;
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        project
    });
});

// Delete Project => /api/v1/admin/project/:id
exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        return next(new ErrorHandler('Project not found', 404));
    }

    // Delete featured image
    await cloudinary.v2.uploader.destroy(project.image.public_id);

    // Delete gallery photos
    for (let i = 0; i < project.photos.length; i++) {
        await cloudinary.v2.uploader.destroy(project.photos[i].public_id);
    }

    await project.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Project is deleted'
    });
});

// Create new review => /api/v1/review
exports.createProjectReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, projectId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const project = await Project.findById(projectId);

    const isReviewed = project.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        project.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        });
    } else {
        project.reviews.push(review);
        project.numOfReviews = project.reviews.length;
    }

    project.ratings = project.reviews.reduce((acc, item) => item.rating + acc, 0) / project.reviews.length;

    await project.save({ validateBeforeSave: false });
    
    res.status(200).json({
        success: true
    });
});

// Get project reviews => /api/v1/reviews
exports.getProjectReviews = catchAsyncErrors(async (req, res, next) => {
    const project = await Project.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: project.reviews
    });
});

// Delete review => /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const project = await Project.findById(req.query.projectId);

    const reviews = project.reviews.filter(
        review => review._id.toString() !== req.query.id.toString()
    );

    const numOfReviews = reviews.length;
    const ratings = numOfReviews > 0 
        ? project.reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews 
        : 0;

    await Project.findByIdAndUpdate(req.query.projectId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    });
});