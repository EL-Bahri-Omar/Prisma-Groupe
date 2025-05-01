const express = require('express');
const router = express.Router();
const {
    newMessage,
    getSingleMessage,
    myMessages,
    allMessages,
    updateMessage,
    deleteMessage
} = require('../controllers/messageController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/message/new').post(isAuthenticatedUser, newMessage);
router.route('/messages/me').get(isAuthenticatedUser, myMessages);

router.route('/message/:id').get(isAuthenticatedUser, getSingleMessage)

// Admin routes
router.route('/admin/messages')
    .get(isAuthenticatedUser, authorizeRoles('admin', 'super'), allMessages);

router.route('/admin/message/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin', 'super'), updateMessage)
    .delete(isAuthenticatedUser, authorizeRoles('admin', 'super'), deleteMessage);

module.exports = router;