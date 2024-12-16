import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Search() {
  return (
    <div className="Search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" name="search" id="" placeholder='Search address/memo/Web3ID'></input>
    </div>
  )
}
