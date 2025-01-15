import React, { useEffect, useState } from 'react'
import { getAccountTransection } from '../../utiles/getAccountTransection'
import { useLocation } from 'react-router'


export default function Transection() {
    const [trx,setTrx] = useState(null);
    let {state} = useLocation();
    useEffect(()=>{
        const fetchtrx=async()=>{
         const d=   await getAccountTransection(state.address);
         setTrx(d)
        }
        state.address && fetchtrx();
    },[state])
    console.log(trx)
    
  return (
    <div>Transection</div>
  )
}
