import React from 'react'

export default function NotFound({normal}) {
  return (
    <div className='NotFound'>
       <div className="inner">
        <h2>No items found for this search</h2>
        <button onClick={normal}>Back to all items</button>
       </div>
    </div>
  )
}
