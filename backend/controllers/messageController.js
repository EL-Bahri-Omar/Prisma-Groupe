const Message = require('../models/message');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create new message => /api/message/new
exports.newMessage = catchAsyncErrors(async (req, res, next) => {
    const { name, societe, phone, email, subject, message } = req.body;

    // Validate either name or societe exists
    if (!name && !societe) {
        return next(new ErrorHandler('Either name or company name is required', 400));
    }

    const newMessage = await Message.create({
        name,
        societe,
        phone,
        email,
        subject,
        message,
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        message: newMessage
    });
});

// Get single message (ADMIN) => /api/admin/message/:id
exports.getSingleMessage = catchAsyncErrors(async (req, res, next) => {
    const message = await Message.findById(req.params.id).populate('user', 'name email');

    if (!message) {
        return next(new ErrorHandler('Message not found', 404));
    }

    res.status(200).json({
        success: true,
        message
    });
});

// Get logged in user messages => /api/messages/me
exports.myMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        messages
    });
});

// Get all messages (ADMIN) => /api/admin/messages
exports.allMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find().populate('user', 'name email');

    let unrespondedCount = 0;
    messages.forEach(msg => {
        if (!msg.isResponded) unrespondedCount++;
    });

    res.status(200).json({
        success: true,
        messages
    });
});

// Update message (ADMIN reply) => /api/admin/message/:id
exports.updateMessage = catchAsyncErrors(async (req, res, next) => {
    const { adminReply } = req.body;

    const message = await Message.findById(req.params.id);

    if (!message) {
        return next(new ErrorHandler('Message not found', 404));
    }

    message.adminReply = adminReply;
    message.isResponded = true;

    await message.save();

    res.status(200).json({
        success: true,
        message
    });
});

// Delete message (ADMIN) => /api/admin/message/:id
exports.deleteMessage = catchAsyncErrors(async (req, res, next) => {
    const message = await Message.findById(req.params.id);

    if (!message) {
        return next(new ErrorHandler('Message not found', 404));
    }

    await message.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Message deleted successfully'
    });
});