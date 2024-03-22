import React from 'react'
import { AiFillDribbbleCircle } from "react-icons/ai";
import { IoLogoBehance } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <>
    <div className='footer_container'>
      <div className='footer_top'>
        <div className='footer_left'>
        <div className="comp_text">
            Crework<span id='dot'>.</span>
          </div>
        </div>

        <div className='footer_mid'>
          <div>
            <p>Newsletter</p>
            <p>30 Days of PM</p>
          </div>

          <div>
            <p>Builders Cohort</p>
            <p>Transition to PM role</p>
          </div>
        </div>

        <div className='footer_right'>
        <AiFillDribbbleCircle id='dribble' className='react_icon_group' />
        <IoLogoBehance id='behance' className='react_icon_group' />
        <FaLinkedin id='linkedin' className='react_icon_group'/>
        <FaFacebook id='facebook' className='react_icon_group' />
        </div>
      </div>

      <div className='hr-line'>
      <div class="horizontal-line"></div>
      </div>

      <div className='footer_bottom'>
        <p>Copyright <FaRegCopyright />  2024 Crework</p>
      </div>
    </div>
    </>
  )
}
