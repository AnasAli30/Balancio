import { Buffer } from 'buffer';
window.Buffer = Buffer;
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from 'react';
import './index.css'
import Home from './Component/Home.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Web3Provider from "./context/Web3Provider.jsx"
import {Toaster} from "react-hot-toast"
import Wallet from './Component/Home/Wallet.jsx';

import App from './App.jsx'
import NftSection from './Component/NftSection.jsx';
import Transection from './Component/Transections/Transection.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:"/home",
        element:<Home></Home>,
      },
      {
        path:"/nft",
        element:<NftSection></NftSection>,
      },
      {
        path:"/trx",
        element:<Transection/>,
      }

    ]
  },
  {
    path:"/wallet",
    element:<Wallet/>,
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Toaster position='top'></Toaster>
  <Web3Provider>
     <RouterProvider router={router} />
     </Web3Provider>
  </StrictMode>,
)
