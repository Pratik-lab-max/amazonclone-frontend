import './App.css';
import Navbar from './Components/Navbar/Navbar';
import NewNav from './Components/SndNavbar/NewNav';
import Maincomp from './Components/home/Maincomp';
import Footer from './Components/Footer/Footer';
import Signin from './Components/Signup_Signin/Signin';
import Signup from './Components/Signup_Signin/Signup';
import Cart from './Components/Cart/Cart';
import Buynow from './Components/Buynow/Buynow';
import {Routes,Route} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

function App() {

  const [data,setData] = useState(false)
  
  useEffect(()=>{
    setTimeout(()=>{
      setData(true)
    },1000)
  })

  return (
    <>
    {
      data ? (
        <>
          <Navbar />
          <NewNav />
          <Routes>
            <Route path="/" element={<Maincomp/>} />
            <Route path="/login" element={<Signin/>} />
            <Route path="/register" element={<Signup/>} />
            <Route path="/getproductsone/:id" element={<Cart/>} />
            <Route path="/buynow" element={<Buynow/>} />
          </Routes>
          <Footer />
        </>
      ):(
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      )
    }
      
    </>
  );
}

export default App; 
