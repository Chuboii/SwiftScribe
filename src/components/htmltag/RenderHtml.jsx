import React from 'react';

function RenderHtml({ htmlContent }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default RenderHtml;
