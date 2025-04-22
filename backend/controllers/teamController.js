const Team = require('../models/team');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');

// Create new team member => /api/v1/admin/team/new
exports.newTeamMember = catchAsyncErrors(async (req, res, next) => {
    // Upload image
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: 'team'
    });

    req.body.image = {
        public_id: result.public_id,
        url: result.secure_url
    };
    req.body.user = req.user.id;

    const teamMember = await Team.create(req.body);

    res.status(201).json({
        success: true,
        teamMember
    });
});

// Get all team members => /api/v1/team
exports.getTeamMembers = catchAsyncErrors(async (req, res, next) => {
    const teamMembers = await Team.find();

    res.status(200).json({
        success: true,
        count: teamMembers.length,
        teamMembers
    });
});

// Get all team members (Admin) => /api/v1/admin/team
exports.getAdminTeamMembers = catchAsyncErrors(async (req, res, next) => {
    const teamMembers = await Team.find();

    res.status(200).json({
        success: true,
        count: teamMembers.length,
        teamMembers
    });
});

// Get single team member => /api/v1/team/:id
exports.getSingleTeamMember = catchAsyncErrors(async (req, res, next) => {
    const teamMember = await Team.findById(req.params.id);

    if (!teamMember) {
        return next(new ErrorHandler('Team member not found', 404));
    }

    res.status(200).json({
        success: true,
        teamMember
    });
});

// Update Team Member => /api/v1/admin/team/:id
exports.updateTeamMember = catchAsyncErrors(async (req, res, next) => {
    let teamMember = await Team.findById(req.params.id);

    if (!teamMember) {
        return next(new ErrorHandler('Team member not found', 404));
    }

    // Handle image update
    if (req.body.image) {
        // Delete previous image
        await cloudinary.v2.uploader.destroy(teamMember.image.public_id);

        const result = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: 'team'
        });
        req.body.image = {
            public_id: result.public_id,
            url: result.secure_url
        };
    }

    teamMember = await Team.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        teamMember
    });
});

// Delete Team Member => /api/v1/admin/team/:id
exports.deleteTeamMember = catchAsyncErrors(async (req, res, next) => {
    const teamMember = await Team.findById(req.params.id);

    if (!teamMember) {
        return next(new ErrorHandler('Team member not found', 404));
    }

    // Delete image
    await cloudinary.v2.uploader.destroy(teamMember.image.public_id);

    await teamMember.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Team member is deleted'
    });
});