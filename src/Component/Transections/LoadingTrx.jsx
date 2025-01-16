import React from 'react'
import "./Transection.css"

export default function LoadingTrx() {
    let arr = [1,2,3,4,5,6,7,8,9,10];
  return (
    <div className='transection'>
    <table >
{arr.map(()=>{
return (
    <>
    <tr className='tablerow'>
        <td className='loading-first'>
            <div className="time"><p></p>
            </div>
            <div className='add'><img src='https://wallpapers.com/images/featured/solid-grey-ew5fya1gh2bgc49b.jpg' alt="" /><span></span>
            </div>
        </td>
        <td className='loading-second'>
        <img 
src="https://assets.debank.com/static/media/contract.df90aecc721d223c3796d11b8eb142b3.svg" 
alt="Contract Icon" 
/>
<div>
<p></p>
<p></p>
</div>
        </td>
        </tr>
        <tr className='third'></tr>
        <div className="table-line"></div></>
)
})}
    </table>
</div>
  )
}
