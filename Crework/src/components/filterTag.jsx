import { useState, useEffect } from 'react';

export default function FilterTag() {
  const [selectedTag, setSelectedTag] = useState('All'); // State to track the selected tag

  useEffect(() => {
    // Check if a tag is already selected in session storage, and update the state accordingly
    const storedTag = JSON.parse(sessionStorage.getItem('Tag'));
    if (storedTag) {
      setSelectedTag(storedTag);
    }
  }, []);

  // Function to handle tag click
  const handleTagClick = (tagText) => {
    setSelectedTag(tagText); // Update the selected tag state
    sessionStorage.setItem('Tag', JSON.stringify(tagText)); // Store the selected tag in session storage
    window.location.reload()
  };

  // Function to determine whether a tag is currently selected
  const isTagSelected = (tag) => {
    return selectedTag === tag;
  };

  const tags = ['All', 'Product Design', 'Guesstimates', 'Product Strategy', 'Behavioral', 'Analytics', 'System Design', 'Technical'];

  return (
    <div className="tag_container">
      {tags.map((tag) => (
        <div key={tag} onClick={() => handleTagClick(tag)} className={`tag ${isTagSelected(tag) ? 'selected' : ''}`}>
          <p>{tag}</p>
        </div>
      ))}
    </div>
  );
}
