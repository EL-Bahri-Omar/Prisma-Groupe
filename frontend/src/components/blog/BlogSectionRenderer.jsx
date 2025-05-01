import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogSectionRenderer = ({ section }) => {
    const renderSection = () => {
        switch (section.type) {
            case 'title':
                return (
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        {section.content}
                    </h1>
                );

            case 'subtitle':
                return (
                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        {section.content}
                    </h2>
                );

            case 'subsubtitle':
                return (
                    <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-200 mb-3">
                        {section.content}
                    </h3>
                );

            case 'paragraph':
                return (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        {section.content.split('\n').map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {paragraph}
                                <br />
                            </React.Fragment>
                        ))}
                    </p>
                );

            case 'code':
                return (
                    <div className="mb-6 rounded-lg overflow-hidden">
                        <SyntaxHighlighter
                            language={section.language}
                            style={tomorrow}
                            className="!bg-gray-800 !p-4"
                            showLineNumbers
                        >
                            {section.content}
                        </SyntaxHighlighter>
                    </div>
                );

            case 'image':
                return (
                    <div className="mb-6">
                        <img
                            src={section.src}
                            alt={section.alt}
                            className="w-full rounded-lg shadow-lg"
                            loading="lazy"
                        />
                        {section.caption && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center italic">
                                {section.caption}
                            </p>
                        )}
                    </div>
                );

            case 'list':
                return (
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                        {section.items.map((item, index) => (
                            <li key={index} className="text-gray-700 dark:text-gray-300">
                                {item}
                            </li>
                        ))}
                    </ul>
                );

            case 'listB':
                return (
                    <ol className="list-decimal pl-5 space-y-2 mb-6">
                        {section.items.map((item, index) => (
                            <li key={index} className="text-gray-700 dark:text-gray-300">
                                {item}
                            </li>
                        ))}
                    </ol>
                );

            case 'table':
                return (
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    {section.columns.map((column, index) => (
                                        <th
                                            key={index}
                                            className="p-3 text-left border border-gray-200 dark:border-gray-600"
                                        >
                                            {column}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {section.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        {section.columns.map((column, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className="p-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                                            >
                                                {row[column]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            default:
                return null;
        }
    };

    return <div className="blog-section">{renderSection()}</div>;
};

export default BlogSectionRenderer;