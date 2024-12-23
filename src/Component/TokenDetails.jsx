import React, { useEffect, useState, useRef } from 'react';
import Token from './Token';
// import { getAccountBalace } from '../utiles/getAccountBalace';

export default function TokenDetails({ web3state ,token}) {
    console.log(token)
    let chainLogos = {
        Ethereum: "https://static.cdnlogo.com/logos/e/81/ethereum-eth.svg", 
        Base: "https://avatars.githubusercontent.com/u/108554348?v=4",
        Polygon: "https://i.pinimg.com/474x/9b/1e/97/9b1e977d00b5d887608b156705a10759.jpg",
        Optimism: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqidBq62tBzMjwxpb9WljM3BuKe6oEHzbJ6Q&s",
        Binance: "https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png",
        Arbitrum: "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=025",
        Linea: "https://raw.githubusercontent.com/coin-icons/icons/main/chain/linea.svg" 
      };
      
      
    return (
        <div className="tokenContainer">
            <div className="wallet">
                <i className="fa-solid fa-wallet"></i>
                <span>Wallet</span>
            </div>
            <div className="TokenDetails">
                <div className="table">
                    <div className="Token">Token</div>
                    <div className="Price">Price</div>
                    <div className="Amount">Amount</div>
                    <div className="Value">USD value</div>
                </div>
                {token ? (
                    token.map((pro, index) => (
                        <React.Fragment key={index}>
                            <div className="table token">
                                <Token
                                    img={pro.img}
                                    innerimg = {chainLogos[pro.chain_name]}
                                    sym={pro.tokenSymbol}
                                    price={pro.price}
                                    amount={pro.amount}
                                    usd={pro.usd_Value}
                                />
                            </div>
                            <div className="token-line"></div>
                        </React.Fragment>
                    ))
                ) : (
                    <div>No tokens available</div>
                )}
            </div>
        </div>
    );
}
