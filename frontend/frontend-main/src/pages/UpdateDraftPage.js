import React, { useEffect, useState } from 'react';
import UpdateDraftForm from '../components/drafts/UpdateDraftForm';
import { useParams } from 'react-router-dom';

const UpdateDraftPage = () => {
  const { id } = useParams();
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        console.log(id);
        console.log("http://localhost:3001/drafts/draftid/"+id);
        const response = await fetch("http://localhost:3001/drafts/draftid/"+id);
        const data = await response.json();

        if (!response.ok) {
          throw Error(data.error);
        }

        console.log('Fetched Draft Data:', data);
        setSelectedDraft(data.draft);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchDraft();
  }, [id]);

  if (isLoading) {
    return <p>Please wait while we are loading data...</p>;
  }

  return (
    <div>
      <UpdateDraftForm selectedDraft={selectedDraft} />
    </div>
  );
};

export default UpdateDraftPage;