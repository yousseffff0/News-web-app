import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../UI/draftcard/Card';
import CardActions from '../../UI/draftcard/CardActions';
import CardBody from '../../UI/draftcard/CardBody';
import CardHeader from '../../UI/draftcard/CardHeader';

const DraftSummary = (props) => {
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();

  const handleViewClick = () => {
    setShowImage(!showImage);
  };

  const handleEditClick = async () => {
    try {
      const encodedDescription = encodeURIComponent(props.draft.description);
  
      // Assuming the API endpoint for fetching the draft ID based on description is available
      const response = await fetch('http://localhost:3001/drafts/description/' + encodeURIComponent(encodedDescription));
      const data = await response.json();
  
      if (!response.ok) {
        throw Error(data.error);
      }

      const draftId = data.draftId;
  
      // Navigate to the updatedraftpage with the draft ID in the URL
      navigate(`/updatedraftpage/${draftId}`, {
        state: {
          draftDetails: data, // You can pass additional data to the updatedraftpage component if needed
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };  

  return (
    <Card>
      <CardHeader>
        {showImage && (
          <img
            className="object-cover w-full h-48 rounded-t-md"
            src={props.draft.imgurl}
            alt={props.draft.keyword}
          />
        )}
      </CardHeader>
      <CardBody>
        <h1 className="font-bold text-xl text-white">{props.draft.description}</h1>
        <p className="text-white">{props.draft.publishdate}</p>
        <p className="text-white">{props.draft.keyword}</p>

        <CardActions>
          <button
            onClick={handleViewClick}
            className="bg-white text-cyan-500 py-2 px-4 font-semibold rounded-md hover:bg-lightGreen-500 hover:text-black transition duration-300 ease-in-out"
          >
            {showImage ? 'Hide Image' : 'View'}
          </button>
          <button
            onClick={handleEditClick}
            className="bg-white text-cyan-500 py-2 px-4 font-semibold rounded-md hover:bg-lightGreen-500 hover:text-black transition duration-300 ease-in-out"
          >
            {'Edit'}
          </button>
        </CardActions>
      </CardBody>
    </Card>
  );
};

export default DraftSummary;