
import React from 'react';

const LessonContentDisplay = ({ content }) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none px-2 md:px-4 leading-relaxed text-foreground">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default LessonContentDisplay;
