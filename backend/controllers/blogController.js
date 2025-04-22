// controllers/blogController.js
const Blog = require('../models/blog')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

// Create new blog => /api/v1/admin/blog/new
exports.newBlog = catchAsyncErrors(async (req, res, next) => {
    // Handle featured image upload
    let featuredImage = {};
    if (req.body.image) {
        const result = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: 'blogs/image',
        });
        featuredImage = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }

    // Handle multiple photos upload
    let photos = [];
    if (typeof req.body.photos === 'string') {
        photos.push(req.body.photos);
    } else {
        photos = req.body.photos;
    }

    let photosLinks = [];
    for (let i = 0; i < photos.length; i++) {
        const result = await cloudinary.v2.uploader.upload(photos[i], {
            folder: 'blogs/gallery'
        });
        photosLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        });
    } 
    

    // Handle PDF upload if provided
    let pdf = {};
    if (req.body.pdf) {
        const result = await cloudinary.v2.uploader.upload(req.body.pdf, {
            folder: 'blogs/pdfs',
            resource_type: 'raw',
        });
        pdf = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }
    const blogData = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        slug: req.body.slug,
        paragraph: req.body.paragraph,
        category: req.body.category,
        tags: req.body.tags,
        readTime: req.body.readTime,
        image: featuredImage,
        photos: photosLinks,
        pdf: pdf,
        author: req.user.id
    };

    const blog = await Blog.create(blogData);

    res.status(201).json({
        success: true,
        blog
    });
});

// Get all blogs => /api/v1/blogs?keyword=react
exports.getBlogs = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 4
    const blogsCount = await Blog.countDocuments()

    const apiFeatures = new APIFeatures(Blog.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    let blogs = await apiFeatures.query
    let filteredBlogsCount = blogs.length

    res.status(200).json({
        success: true,
        blogsCount,
        resPerPage,
        filteredBlogsCount,
        blogs
    })
})

// Get all blogs (Admin) => /api/v1/admin/blogs
exports.getAdminBlogs = catchAsyncErrors(async (req, res, next) => {
    const blogs = await Blog.find()

    res.status(200).json({
        success: true,
        blogs
    })
})

// Get single blog details => /api/v1/blog/:id
exports.getSingleBlog = catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
        return next(new ErrorHandler('Blog not found', 404))
    }

    res.status(200).json({
        success: true,
        blog
    })
})

// Update Blog => /api/v1/admin/blog/:id
exports.updateBlog = catchAsyncErrors(async (req, res, next) => {
    let blog = await Blog.findById(req.params.id)

    if (!blog) {
        return next(new ErrorHandler('Blog not found', 404))
    }

    let photos = []
    if (typeof req.body.photos === 'string') {
        photos.push(req.body.photos)
    } else {
        photos = req.body.photos
    }

    if (photos !== undefined) {
        // Deleting photos associated with the blog
        for (let i = 0; i < blog.photos.length; i++) {
            await cloudinary.v2.uploader.destroy(blog.photos[i].public_id)
        }

        let photosLinks = []
        for (let i = 0; i < photos.length; i++) {
            const result = await cloudinary.v2.uploader.upload(photos[i], {
                folder: 'blogs/gallery'
            })

            photosLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.photos = photosLinks
    }

    // Handle image update
    if (req.body.image) {
        if (blog.image.public_id) {
            await cloudinary.v2.uploader.destroy(blog.image.public_id)
        }

        const imageResult = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: 'blogs/image'
        })

        req.body.image = {
            public_id: imageResult.public_id,
            url: imageResult.secure_url
        }
    }

    // Handle PDF update
    if (req.body.pdf) {
        if (blog.pdf && blog.pdf.public_id) {
            await cloudinary.v2.uploader.destroy(blog.pdf.public_id, {
                resource_type: 'raw'
            })
        }

        const pdfResult = await cloudinary.v2.uploader.upload(req.body.pdf, {
            folder: 'blogs/pdfs',
            resource_type: 'raw'
        })

        req.body.pdf = {
            public_id: pdfResult.public_id,
            url: pdfResult.secure_url
        }
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        blog
    })
})

// Delete Blog => /api/v1/admin/blog/:id
exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
        return next(new ErrorHandler('Blog not found', 404))
    }

    // Deleting photos associated with the blog
    for (let i = 0; i < blog.photos.length; i++) {
        await cloudinary.v2.uploader.destroy(blog.photos[i].public_id)
    }

    // Delete featured image if exists
    if (blog.image.public_id) {
        await cloudinary.v2.uploader.destroy(blog.image.public_id)
    }

    // Delete PDF if exists
    if (blog.pdf && blog.pdf.public_id) {
        await cloudinary.v2.uploader.destroy(blog.pdf.public_id, {
            resource_type: 'raw'
        })
    }

    await blog.deleteOne()

    res.status(200).json({
        success: true,
        message: 'Blog is deleted'
    })
})