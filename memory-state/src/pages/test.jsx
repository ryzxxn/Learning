import React from 'react'
import memoryState from 'memory-state';

export default function Test() {
    const user = memoryState.getState('user')
  return (
    <div>{user.age}</div>
  )
}
