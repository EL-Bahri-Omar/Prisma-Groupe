// routes/blog.js
const express = require('express')
const router = express.Router()

const {
    getBlogs,
    getAdminBlogs,
    newBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/blogs').get(getBlogs)
router.route('/admin/blogs').get(getAdminBlogs)
router.route('/blog/:id').get(getSingleBlog)

router.route('/admin/blog/new').post(isAuthenticatedUser, authorizeRoles('admin', 'super'), newBlog)

router.route('/admin/blog/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin', 'super'), updateBlog)
    .delete(isAuthenticatedUser, authorizeRoles('admin', 'super'), deleteBlog)

module.exports = router