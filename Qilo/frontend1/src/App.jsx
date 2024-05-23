import './App.css'
import List from './component/list'

import React from 'react'

export default function App() {
  return (
    <>
    <div style={{display: 'flex', gap: '1rem', color: 'white'}}>
      <p>Elton Xavier Joseph Costa</p>
      <p>elton02costa@gmail.com</p>
      <p>9604344945</p>
    </div>
    <div style={{height: '95vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <List/>
    </div>
    </>
  )
}