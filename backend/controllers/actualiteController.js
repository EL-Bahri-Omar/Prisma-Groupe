const Actualite = require('../models/actualite');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

// Create new actualite => /api/v1/admin/actualite/new
exports.newActualite = catchAsyncErrors(async (req, res, next) => {
    // Upload featured image
    const imageResult = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: 'actualites/image'
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
                folder: 'actualites/gallery'
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

    const actualite = await Actualite.create(req.body);

    res.status(201).json({
        success: true,
        actualite
    });
});

// Get all actualites => /api/v1/actualites?keyword=update
exports.getActualites = catchAsyncErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Actualite.find(), req.query)
                        .search()
                        .filter();
                        
    const actualites = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: actualites.length,
        actualites
    });
});

// Get all actualites (Admin) => /api/v1/admin/actualites
exports.getAdminActualites = catchAsyncErrors(async (req, res, next) => {
    const actualites = await Actualite.find();

    res.status(200).json({
        success: true,
        count: actualites.length,
        actualites
    });
});

// Get single actualite details => /api/v1/actualite/:id
exports.getSingleActualite = catchAsyncErrors(async (req, res, next) => {
    const actualite = await Actualite.findById(req.params.id);

    if (!actualite) {
        return next(new ErrorHandler('News not found', 404));
    }

    res.status(200).json({
        success: true,
        actualite
    });
});

// Update Actualite => /api/v1/admin/actualite/:id
exports.updateActualite = catchAsyncErrors(async (req, res, next) => {
    let actualite = await Actualite.findById(req.params.id);

    if (!actualite) {
        return next(new ErrorHandler('News not found', 404));
    }

    // Handle image update
    if (req.body.image) {
        // Delete previous image
        await cloudinary.v2.uploader.destroy(actualite.image.public_id);

        const result = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: 'actualites/image'
        });
        req.body.image = {
            public_id: result.public_id,
            url: result.secure_url
        };
    }

    // Handle photos update
    if (req.body.photos && req.body.photos.length > 0) {
        // Delete existing photos
        for (let i = 0; i < actualite.photos.length; i++) {
            await cloudinary.v2.uploader.destroy(actualite.photos[i].public_id);
        }

        let photosLinks = [];
        const photos = typeof req.body.photos === 'string' 
            ? [req.body.photos] 
            : req.body.photos;

        for (let i = 0; i < photos.length; i++) {
            const result = await cloudinary.v2.uploader.upload(photos[i], {
                folder: 'actualites/gallery'
            });
            photosLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }
        req.body.photos = photosLinks;
    }

    actualite = await Actualite.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        actualite
    });
});

// Delete Actualite => /api/v1/admin/actualite/:id
exports.deleteActualite = catchAsyncErrors(async (req, res, next) => {
    const actualite = await Actualite.findById(req.params.id);

    if (!actualite) {
        return next(new ErrorHandler('News not found', 404));
    }

    // Delete featured image
    await cloudinary.v2.uploader.destroy(actualite.image.public_id);

    // Delete gallery photos
    for (let i = 0; i < actualite.photos.length; i++) {
        await cloudinary.v2.uploader.destroy(actualite.photos[i].public_id);
    }

    await actualite.deleteOne();

    res.status(200).json({
        success: true,
        message: 'News is deleted'
    });
});