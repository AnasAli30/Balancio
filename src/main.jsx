import { Buffer } from 'buffer';
window.Buffer = Buffer;
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Component/Home.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import NftSection from './Component/NftSection.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:"/",
        element:<Home></Home>,
      },
      {
        path:"/nft",
        element:<NftSection></NftSection>,
      },
      {
        path:"/trx",
        element:<h1>trx section</h1>,
      },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
