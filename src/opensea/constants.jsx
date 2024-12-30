import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Seaport } from '@opensea/seaport-js';


export const listNft = async(ca,tokenid,signer,floor,fee_data,chain)=>{
const zone = import.meta.env.VITE_ZONE;
const conduitKey = import.meta.env.VITE_CONDUITKEY; // Conduit key
const salt = ethers.id(import.meta.env.VITE_SALT);
    try{
        const seaport = new Seaport(signer);
       const offererAddress = signer.address;
        const startTime = Math.floor(Date.now() / 1000); 
        const startDate = new Date(startTime * 1000);
        startDate.setMonth(startDate.getMonth() + 5);
        const endTime = Math.floor(startDate.getTime() / 1000);
        
       
        try {
          
            if(fee_data[1]?.required==true){
                let fee1 = parseFloat((floor * (0.975 - (fee_data[1]?.fee / 100))).toPrecision(7));
                let fee2 = parseFloat((floor * 0.025).toPrecision(7));
                let fee3 = parseFloat((floor * (fee_data[1]?.fee / 100)).toPrecision(7));
                let fee11= ethers.parseEther((fee1).toString()).toString()
                let fee22 = ethers.parseEther((fee2).toString()).toString()
                let fee33 = ethers.parseEther((fee3).toString()).toString()
                var { executeAllActions } = await seaport.createOrder({
            
                    offer: [
                        {
                            itemType: 2, // ERC-721
                            token: ca,
                            identifier: String(tokenid),
                            amount: "1",
                            orderType: 2, 
                        },
                    ],
                    consideration: [
                        {
                            itemType: 0, // Native Token (ETH)
                            token: ethers.ZeroAddress, // Address for ETH
                            identifierOrCriteria: "0",
                            amount: fee11,
                            recipient: offererAddress, // Main recipient (Account 1)
                            orderType: 2, 
                        },
                        {
                            itemType: 0, // Native Token (ETH)
                            token: ethers.ZeroAddress,
                            identifierOrCriteria: "0",
                            amount: fee22,
                            recipient: "0x0000a26b00c1F0DF003000390027140000fAa719", 
                            orderType: 2, // Fee recipient
                        },
                        {
                            itemType: 0, // Native Token (ETH)
                            token: ethers.ZeroAddress,
                            identifierOrCriteria: "0",
                            amount: fee33,
                            recipient: fee_data[1].recipient,
                            orderType: 2,  // Fee recipient
                        },
                        
                    ],
                    restrictedByZone:2, 
                    startTime: startTime,
                    endTime: endTime,
                    zone: zone,
                    zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
                    salt: salt,
                    conduitKey: conduitKey,
                });

        }else{
            var { executeAllActions } = await seaport.createOrder({
            
                offer: [
                    {
                        itemType: 2, // ERC-721
                        token: ca,
                        identifier: String(tokenid),
                        amount: "1",
                        orderType: 2, 
                    },
                ],
                consideration: [
                    {
                        itemType: 0, // Native Token (ETH)
                        token: ethers.ZeroAddress, // Address for ETH
                        identifierOrCriteria: "0",
                        amount: ethers.parseEther((floor * 0.975).toFixed(18).toString()).toString(),
                        recipient: offererAddress, // Main recipient (Account 1)
                        orderType: 2, 
                    },
                    {
                        itemType: 0, // Native Token (ETH)
                        token: ethers.ZeroAddress,
                        identifierOrCriteria: "0",
                        amount: ethers.parseEther((floor * 0.025).toFixed(18).toString()).toString(),
                        recipient: "0x0000a26b00c1F0DF003000390027140000fAa719", 
                        orderType: 2, // Fee recipient
                    },
                    
                ],
                restrictedByZone:2, 
                startTime: startTime,
                endTime: endTime,
                zone: zone,
                zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
                salt: salt,
                conduitKey: conduitKey,
            });
        }
            
            const order = await executeAllActions();
            order['protocol_address'] = '0x0000000000000068f116a894984e2db1123eb395'
            // console.log(order)
            const response = await fetch("https://api.opensea.io/v2/orders/base/seaport/listings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'x-api-key': import.meta.env.VITE_OPENSEA, 
                },
                body: JSON.stringify(order),
            });

            const result = await response.json();
            return result;
          ;
        }catch (error) {
            console.error("Error listing NFT:", error);
        }}
catch(e){
    console.log(e)
}
    
}




