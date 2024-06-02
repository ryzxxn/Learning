import React from 'react'
import memoryState from 'memory-state';

export default function Home() {

    const user = memoryState.getState('user')
  return (
    <div>{user.name}</div>
  )
}
