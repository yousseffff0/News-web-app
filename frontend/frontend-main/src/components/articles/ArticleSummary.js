import React, { useState } from 'react';
import Card from '../../UI/card/Card';
import CardActions from '../../UI/card/CardActions';
import CardBody from '../../UI/card/CardBody';
import CardHeader from '../../UI/card/CardHeader';

const ArticleSummary = (props) => {
  const [showImage, setShowImage] = useState(false);

  const handleViewClick = () => {
    setShowImage(!showImage);
  };

  return (
    <Card>
      <CardHeader>
        {showImage && (
          <img
            className="object-cover w-full h-48 rounded-t-md"
            src={props.article.imgurl}
            alt={props.article.description}
          />
        )}
      </CardHeader>
      <CardBody>
        <h1 className="font-bold text-xl text-white">{props.article.description}</h1>
        <p className="text-white">{props.article.publishdate}</p>
        <CardActions>
          <button
            onClick={handleViewClick}
            className="bg-white text-cyan-500 py-2 px-4 font-semibold rounded-md hover:bg-lightGreen-500 hover:text-black transition duration-300 ease-in-out"
          >
            {showImage ? 'Hide Image' : 'View'}
          </button>
        </CardActions>
      </CardBody>
    </Card>
  );
};

export default ArticleSummary;