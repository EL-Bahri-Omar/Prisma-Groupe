import React from 'react';
import BlogSectionRenderer from './BlogSectionRenderer';

const BlogContent = ({ contentBlocks }) => {
    if (!contentBlocks || contentBlocks.length === 0) {
        return <div className="text-center py-10">No content available</div>;
    }

    // Parse if contentBlocks is a string
    const blocks = typeof contentBlocks === 'string' 
        ? JSON.parse(contentBlocks) 
        : contentBlocks;

    // Sort by order if exists
    const sortedBlocks = [...blocks].sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
        <div className="blog-content max-w-4xl mx-auto">
            {sortedBlocks.map((block, index) => (
                <BlogSectionRenderer key={`${block.type}-${index}`} section={block} />
            ))}
        </div>
    );
};

export default BlogContent;