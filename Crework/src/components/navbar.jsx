import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle visibility of the dropdown

  // Function to toggle the visibility of the dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='navbar'>

      <div className='nav_mobile_container'>
        <div className='left_navbar'>
          <div className="comp_text">
            Crework<span id='dot'>.</span>
          </div>
        </div>
        <div className='right_navbar'>
          <p className='nav_links'>30 Days of PM</p>
          <p className='nav_links'>Newsletter</p>
          <p className='nav_links'>Builders Cohort</p>
        </div>

        <div className='hidden_menu'>
          {showDropdown ? (
            <IoMdClose className='close_button_icon' onClick={toggleDropdown} />
          ) : (
            <GiHamburgerMenu className='close_button_icon' onClick={toggleDropdown} />
          )}
        </div>
      </div>

      {showDropdown && (
          <div className='dropdown_container'>
            <p className='nav_links'>30 Days of PM</p>
            <p className='nav_links'>Newsletter</p>
            <p className='nav_links'>Builders Cohort</p>
          </div>
        )}
    </div>
  );
}
