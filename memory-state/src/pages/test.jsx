import React from 'react'
import memoryState from 'memory-state';
import { Link } from "react-router-dom";
import Tetu from '../component/tetu';

export default function Test() {
    const user = memoryState.getState('user')

    memoryState.setState('number',9604344945)
    
  return (
    <>
    <h1>TEST</h1>
    <div>{user.age}</div>
    <ul>
      <li><Link to='/'>home</Link></li>
      <li><Link to='/test'>test</Link></li>
    </ul>
    <Tetu/>
    </>
  )
}
