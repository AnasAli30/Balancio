import React, { useEffect, useState, useRef } from 'react';
import Token from './Token';
// import { getAccountBalace } from '../utiles/getAccountBalace';

export default function TokenDetails({ web3state ,token}) {
    console.log(token)
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
                                    sym={pro.tokenSymbol}
                                    price={pro.price}
                                    amount={pro.amount}
                                    usd={pro.amount * pro.price}
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
