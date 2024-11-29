import React, { useState } from 'react';
import ArticleSummary from './ArticleSummary';

const ArticleList = ({ articles }) => {
  const [visibleArticles, setVisibleArticles] = useState(3);

  const showMoreArticles = () => {
    setVisibleArticles((prev) => prev + 3);
  };

  return (
    <div className="flex flex-col items-center w-full" style={{ backgroundColor: "#222" }}>
      <div className="grid grid-cols-3 gap-10 justify-center items-center w-full">
        {articles.slice(0, visibleArticles).map((a, index) => (
          <ArticleSummary article={a} key={index} />
        ))}
      </div>
      {articles.length > visibleArticles && (
        <div className="w-full mt-4">
          <button
            onClick={showMoreArticles}
            className="w-full bg-blue-500 text-white py-2 px-2 font-semibold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleList;