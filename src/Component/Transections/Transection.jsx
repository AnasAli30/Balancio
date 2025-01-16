import React, { useEffect, useState } from 'react'
import { getAccountTransection } from '../../utiles/getAccountTransection'
import { useLocation } from 'react-router'
import "./Transection.css"
import LoadingTrx from './LoadingTrx';

export default function Transection() {
    const [trx,setTrx] = useState(null);
    let chainLogos = {
        ethereum: "https://static.cdnlogo.com/logos/e/81/ethereum-eth.svg", 
        base: "https://avatars.githubusercontent.com/u/108554348?v=4",
        polygon: "https://i.pinimg.com/474x/9b/1e/97/9b1e977d00b5d887608b156705a10759.jpg",
        Optimism: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqidBq62tBzMjwxpb9WljM3BuKe6oEHzbJ6Q&s",
        Binance: "https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png",
        Arbitrum: "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=025",
        linea: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0umBGwUh2RkSi4K1mWrJ3NnNCrrO8IHtMJQ&s" 
      };
    let {state} = useLocation();
    useEffect(()=>{
        const fetchtrx=async()=>{
         const d = await getAccountTransection(state.address);
         setTrx(d)
        }
        state.address && fetchtrx();
    },[state])

    console.log(trx)
    
  return (
    <div className='transection'>
        <table style={{borderRadius:"1px",border:"1px solig white"}}>
          {trx? 
          trx.map((pro)=>{
            return (<>
            <a href={pro.chain=="base"?`https://basescan.org/tx/${pro.hash}`:pro.chain=="polygon"?`https://polygonscan.com/tx/${pro.hash}`:`https://etherscan.io/tx/${pro.hash}`}target='_blank'>
<tr className='tablerow'>
            <td className='first'>
                <div className="time">
                {new Date(pro.block_timestamp).toLocaleString()}
                </div>
                <div className='add'><img src={chainLogos[pro.chain]} alt="" />
                {pro.hash.slice(0,6) + "..." + pro.hash.slice(-4)}
                </div>
            </td>
            <td className='second'>
            <img 
    src="https://assets.debank.com/static/media/contract.df90aecc721d223c3796d11b8eb142b3.svg" 
    alt="Contract Icon" 
  />
  <div>
    <p>{pro.summary}</p>
    <p>{pro.from_address.slice(0,6) + "..." + pro.from_address.slice(-4)}</p>
  </div>
            </td>
            {pro.native_transfers.length?<td className='third'>
                <img src={pro.native_transfers[0].token_logo} alt="" />
                <p>{pro.native_transfers[0].direction=="receive"?"+":"-"} 
                    {(Number(
                pro.native_transfers[0].value) / Math.pow(10, 18)).toFixed(2)
                } {pro.native_transfers[0].token_symbol}<span>({
                    Number(
                    pro.native_transfers[0].value_formatted).toFixed(2)
                    }$)</span></p>
            </td>:
          pro.nft_transfers.length?<td className='third'>
            <img src="https://as2.ftcdn.net/v2/jpg/04/92/58/67/1000_F_492586760_eJ7AKMmS39XH9DxZHpLFqJRt2SkggtCm.jpg"
            alt="" />
            <p>{pro.nft_transfers[0].direction=="receive"?"+":"-"} {pro.nft_transfers[0].amount} nft</p>
        </td>:""
            }
            </tr>
            </a>
            <div className="table-line"></div>
          </>  )
          })
          
          :<LoadingTrx></LoadingTrx>}
        </table>
    </div>
  )
}
