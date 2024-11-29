import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import ArticleList from '../components/articles/ArticleList';

const Articlespage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3001/article');
        const data = await response.json();

        if (!response.ok) {
          throw Error(data.error);
        }

        setArticles(data.articles);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching articles:', err.message);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#000000" loading={true} size={500} />
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen flex items-center justify-center"style={{ backgroundColor: "#222" }}>
      <div className="w-full mx-auto">
        <ArticleList articles={articles} size={600}/>
      </div>
    </div>
  );
};

export default Articlespage;