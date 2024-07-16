
import React, { useState } from 'react';


export default function MyComponent({data}){
 
  const itemsPerPage = 5; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getDisplayedIndices = (currentPage, itemsPerPage, totalItems) => {
    const start = currentPage * itemsPerPage;
    const end = Math.min(start + itemsPerPage, totalItems);
    return data.slice(start, end);
  };

  const displayedItems = getDisplayedIndices(currentPage, itemsPerPage, data.length);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div>
      <h1>Pagination</h1>
      <ul>
        {displayedItems.map((item, index) => (
          <li key={index}>{index+1}</li>
        ))}
      </ul>
      <button onClick={goToPreviousPage} disabled={currentPage === 0}>
        Previous
      </button>
      <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
        Next
      </button>
    </div>
  );
};
