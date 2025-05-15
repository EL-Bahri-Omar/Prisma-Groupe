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

    // Process content blocks to handle gallery uploads
    let contentBlocks = [];
    if (req.body.contentBlocks) {
        contentBlocks = JSON.parse(req.body.contentBlocks);
        
        for (let i = 0; i < contentBlocks.length; i++) {
            const block = contentBlocks[i];
            if (block.type === 'gallery' && block.photos && block.photos.length > 0) {
                const photos = typeof block.photos === 'string' 
                    ? [block.photos] 
                    : block.photos;

                let galleryPhotosLinks = [];
                for (let j = 0; j < photos.length; j++) {
                    const result = await cloudinary.v2.uploader.upload(photos[j], {
                        folder: 'blogs/gallery'
                    });
                    galleryPhotosLinks.push({
                        public_id: result.public_id,
                        url: result.secure_url
                    });
                }
                contentBlocks[i].photos = galleryPhotosLinks;
                delete contentBlocks[i].content;
            }
        }
    }


    const blogData = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        slug: req.body.slug,
        contentBlocks: contentBlocks,
        category: req.body.category,
        tags: req.body.tags,
        readTime: req.body.readTime,
        image: featuredImage,
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
    const blogsCount = await Blog.countDocuments()

    const apiFeatures = new APIFeatures(Blog.find(), req.query)
        .search()
        .filter()

    let blogs = await apiFeatures.query
    let filteredBlogsCount = blogs.length

    res.status(200).json({
        success: true,
        blogsCount,
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
    const blog = await Blog.findById(req.params.id).populate('author', 'name avatar')

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

    // Handle contentBlocks update
    if (req.body.contentBlocks) {
        let contentBlocks = JSON.parse(req.body.contentBlocks);
        
        // First delete any removed gallery images from Cloudinary
        const existingBlocks = blog.contentBlocks;
        for (let i = 0; i < existingBlocks.length; i++) {
            const existingBlock = existingBlocks[i];
            if (existingBlock.type === 'gallery' && existingBlock.photos) {
                for (const photo of existingBlock.photos) {
                    if (photo.public_id) {
                        const stillExists = contentBlocks.some(newBlock => 
                            newBlock.type === 'gallery' && 
                            newBlock.photos && 
                            newBlock.photos.some(p => p.public_id === photo.public_id)
                        );
                        
                        if (!stillExists) {
                            await cloudinary.v2.uploader.destroy(photo.public_id);
                        }
                    }
                }
            }
        }

        // Then upload new gallery images
        for (let i = 0; i < contentBlocks.length; i++) {
            const block = contentBlocks[i];
            if (block.type === 'gallery' && block.photos && block.photos.length > 0) {
                let galleryPhotosLinks = [];
                const photos = typeof block.photos === 'string' 
                    ? [block.photos] 
                    : block.photos;

                for (let j = 0; j < photos.length; j++) {
                    if (typeof photos[j] === 'string') {
                        const result = await cloudinary.v2.uploader.upload(photos[j], {
                            folder: 'blogs/gallery'
                        });
                        galleryPhotosLinks.push({
                            public_id: result.public_id,
                            url: result.secure_url
                        });
                    } else {
                        galleryPhotosLinks.push(photos[j]);
                    }
                }
                contentBlocks[i].photos = galleryPhotosLinks;
                delete contentBlocks[i].content;
            }
        }
        
        req.body.contentBlocks = contentBlocks;
    }

    req.body.author = req.user.id;

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

    // Delete all gallery images from Cloudinary
    if (blog.contentBlocks && blog.contentBlocks.length > 0) {
        for (const block of blog.contentBlocks) {
            if (block.type === 'gallery' && block.photos) {
                for (const photo of block.photos) {
                    try {
                        await cloudinary.v2.uploader.destroy(photo.public_id)
                    } catch (error) {
                        console.error(`Error deleting image ${photo.public_id}:`, error.message)
                        // Continue with deletion even if one image fails
                    }
                }
            }
        }
    }

    // Delete featured image if exists
    if (blog.image && blog.image.public_id) {
        try {
            await cloudinary.v2.uploader.destroy(blog.image.public_id)
        } catch (error) {
            console.error(`Error deleting featured image ${blog.image.public_id}:`, error.message)
        }
    }

    await blog.deleteOne()

    res.status(200).json({
        success: true,
        message: 'Blog is deleted successfully'
    })
})