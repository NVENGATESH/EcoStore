import { useState,useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import './App.css'
import Register from './pages/RegiterPage'
import Navbar from './Components/Navbar'
import Login from './pages/Login'
import EcoPage from './pages/EcomPage'
import AddProduct from './Components/AddProduct'
import ProductInformation from './Components/ProductInformation'
import UpdateProduct from './Components/UpdateProduct'
import Cart from './Components/Cart'
import ProductSearch from './Components/ProductSearch'
import NotFound from './Components/NotFound'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

 useEffect(() => {
  const isLoggedIns = localStorage.getItem("isLoggedIn") === "true";
  console.log(isLoggedIns)
  console.log(isLoggedIns + "token")
  if (isLoggedIns)
    setIsLoggedIn(!!isLoggedIns);
}, []);

 useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/userinfoss", {
          withCredentials: true,
        });
        setUser(response.data);
        console.log(response.data)
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    loadCurrentUser();
  }, []);
  if(user?.name){
    console.log("hi")
  }

    // if (isLoggedIn) return <div style={{ padding: "2rem", fontSize: "1.5rem" }}>Loading...</div>;

  return (
    <>
    
    <BrowserRouter>
   
     {/* <Navbar/> */}
  
  <Routes>
           
                 
    <Route path="/" element={ <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
  <Route path='/register' element={<Register />} />
 <Route
  path="/eco-store"
  element={user? <EcoPage /> : <Navigate to="/login" />}
/>

   <Route path='/AddProduct' element={<AddProduct />} />
  <Route path="/ProductInformation/:id" element={<ProductInformation />} />
  <Route path="/UpdateProduct/:id" element={<UpdateProduct />} />
    <Route path="/Cart" element={<Cart />} />
      <Route path="/ProductSearch/:keyword" element={<ProductSearch />} />
       <Route path="*" element={isLoggedIn?<NotFound />:<Navigate to="/login" />} />
</Routes>

    </BrowserRouter>
    </>

  )
}

export default App


  {/* <Route path="/create" element={isLoggedIn ? <Create /> : <Navigate to="/login" />} /> */}