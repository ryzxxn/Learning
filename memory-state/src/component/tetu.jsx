import React from 'react'
import memoryState from 'memory-state'

export default function Tetu() {

    const data = memoryState.getState('user')
    const data2 = memoryState.getState('number')

  return (
    <div>{data2}</div>
  )
}
