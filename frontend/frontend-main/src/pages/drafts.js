import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import DraftList from '../components/drafts/DraftList';

const DraftsPage = () => {
  const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await fetch('http://localhost:3001/drafts/657286ff0f63f6c97ce954b5');
        const data = await response.json();

        if (!response.ok) {
          throw Error(data.error);
        }

        setDrafts(data.drafts);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching drafts:', err.message);
        setIsLoading(false);
      }
    };

    fetchDrafts();
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
        <DraftList drafts={drafts} />
      </div>
    </div>
  );
};

export default DraftsPage;