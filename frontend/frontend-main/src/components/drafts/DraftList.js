import React, { useState } from 'react';
import DraftSummary from './DraftSummary';

const DraftList = ({ drafts }) => {
  const [visibleDrafts, setVisibleDrafts] = useState(3);

  const showMoreDrafts = () => {
    setVisibleDrafts((prev) => prev + 3);
  };

  
return (
  <div className="flex flex-col items-center w-full" style={{ backgroundColor: "#222" }}>
      <div className="grid grid-cols-3 gap-10 justify-center items-center w-full">
      {drafts.slice(0, visibleDrafts).map((a, index) => (
        <DraftSummary draft={a} key={index} />
      ))}
    </div>
    {drafts.length > visibleDrafts && (
      <div className="w-full mt-4">
        <button
          onClick={showMoreDrafts}
          className="w-full bg-blue-500 text-white py-2 px-2 font-semibold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Show More
        </button>
      </div>
    )}
  </div>
);
};

export default DraftList;