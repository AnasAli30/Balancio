import React, { useState } from 'react'

export default function Btn({handleWallet,btn}) {

     return <>
      <input onClick={handleWallet}
            className='follow' type="button" value={btn} />
            </>
}
