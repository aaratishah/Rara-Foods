import React from 'react';
import DOMPurify from 'dompurify';

const createMarkup = (html) => {
    return {
        __html: DOMPurify.sanitize(html),
    };
};

const HtmlRender = ({html}) => {
    return (
        <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(html)}
        />
    );
};

export default HtmlRender;
