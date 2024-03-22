import { useState, useEffect } from 'react';
import { questions } from './data';

export default function Forum() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [reloadData, setReloadData] = useState(false); // State variable to trigger data reload

  // Retrieve selected tags from session storage on initial render
  useEffect(() => {
    const storedTags = JSON.parse(sessionStorage.getItem('Tag')) || [];
    setSelectedTags(storedTags);
  }, [reloadData]); // Trigger the effect whenever reloadData changes

  // Filter questions based on selected tags
  const filteredQuestions = questions.filter(question =>
    selectedTags.length === 0 || question.tags.some(tag => selectedTags.includes(tag))
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  // Calculate the range of questions to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredQuestions.length);
  const displayedQuestions = filteredQuestions.slice(startIndex, endIndex);

  // Handle pagination click events
  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Determine the range of page numbers to display
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(startPage + 2, totalPages);

  // Watch for changes in selectedTags and update when it changes
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when tags change
    setReloadData(prevState => !prevState); // Toggle reloadData to trigger data reload
  }, [selectedTags]);

  return (
    <>
      <div className='forum_container'>
        {displayedQuestions.map((questionObj, index) => (
          <div key={index} className='question'>
            <p className='question'>{questionObj.question}</p>
            <div className='tags_container_list'>
              {questionObj.tags.map((tag, tagIndex) => (
                <p key={tagIndex} className='question_tag'>{tag}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='pagnition_container'>
        <div className='data_text_container'>
          <p id='data_text'>Showing {startIndex + 1}-{endIndex} of {filteredQuestions.length} questions</p>
        </div>
        <div className="pagination_controls">
          <p className='pagnition_button' onClick={handlePrevPage} disabled={currentPage === 1}>Prev</p>
          {[...Array(endPage - startPage + 1).keys()].map(page => (
            <p id='pagnition_number_button' key={startPage + page} className={`pagnition_button ${currentPage === startPage + page ? 'active' : ''}`} onClick={() => handlePageClick(startPage + page)}>{startPage + page}</p>
          ))}
          {currentPage < totalPages && (
            <>
              <p>...</p>
              <p id='pagnition_number_button' className='pagnition_button' onClick={() => handlePageClick(totalPages)}>{totalPages}</p>
            </>
          )}
          <p id='next_button_pagnition' className='pagnition_button' onClick={handleNextPage} disabled={currentPage === totalPages}>Next</p>
        </div>
      </div>
    </>
  );
}
