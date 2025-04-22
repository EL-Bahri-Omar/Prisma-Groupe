const express = require('express');
const router = express.Router();
const {
    getActualites,
    getAdminActualites,
    newActualite,
    getSingleActualite,
    updateActualite,
    deleteActualite
} = require('../controllers/actualiteController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/actualites').get(getActualites);
router.route('/admin/actualites').get(getAdminActualites);
router.route('/actualite/:id').get(getSingleActualite);

router.route('/admin/actualite/new')
    .post(isAuthenticatedUser, authorizeRoles('admin'), newActualite);

router.route('/admin/actualite/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateActualite)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteActualite);

module.exports = router;