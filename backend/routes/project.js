const express = require('express');
const router = express.Router();
const {
    getProjects,
    getAdminProjects,
    newProject,
    getSingleProject,
    updateProject,
    deleteProject,
    createProjectReview,
    getProjectReviews,
    deleteReview
} = require('../controllers/projectController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/projects').get(getProjects);
router.route('/admin/projects').get(getAdminProjects);
router.route('/project/:id').get(getSingleProject);

router.route('/admin/project/new')
    .post(isAuthenticatedUser, authorizeRoles('admin', 'super'), newProject);

router.route('/admin/project/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin', 'super'), updateProject)
    .delete(isAuthenticatedUser, authorizeRoles('admin', 'super'), deleteProject);

router.route('/review').put(isAuthenticatedUser, createProjectReview);
router.route('/reviews')
    .get(isAuthenticatedUser, getProjectReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;