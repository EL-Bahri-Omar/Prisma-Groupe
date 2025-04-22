const express = require('express');
const router = express.Router();
const {
    getTeamMembers,
    getAdminTeamMembers,
    newTeamMember,
    getSingleTeamMember,
    updateTeamMember,
    deleteTeamMember
} = require('../controllers/teamController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/team').get(getTeamMembers);
router.route('/admin/team').get(getAdminTeamMembers);
router.route('/team/:id').get(getSingleTeamMember);

router.route('/admin/team/new')
    .post(isAuthenticatedUser, authorizeRoles('admin'), newTeamMember);

router.route('/admin/team/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateTeamMember)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteTeamMember);

module.exports = router;