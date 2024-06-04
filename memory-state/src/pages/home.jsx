import React from 'react'
import memoryState from 'memory-state';
import { Link } from "react-router-dom";

export default function Home() {

    const user = memoryState.getState('user')

  return (
    <>
    <h1>HOME</h1>
    <div>{user.name}</div>
    <p>{user.random}</p>
    <ul>
      <li><Link to='/'>home</Link></li>
      <li><Link to='/test'>test</Link></li>
    </ul>
    </>
  )
}
