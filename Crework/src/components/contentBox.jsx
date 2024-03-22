import React from 'react'
import FilterTag from './filterTag'
import Forum from './forum'

export default function ContentBox() {
  return (
    <>
    <div className='content_container'>
        <h1 className='content_header_text'>Product Management Interview Questions</h1>
        <p>Browse 1000+ questions from top tech companies</p>
        <FilterTag/>
        <Forum/>
    </div>
    </>
  )
}
