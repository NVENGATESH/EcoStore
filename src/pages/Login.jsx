
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";


export default function Login() {

    const [username,setUserName]=useState("");
     const [Password,setPassword]=useState("");
     const navigate = useNavigate();


    

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // const response = await fetch("https://ecostore-970g.onrender.com/api/auth/signin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //     password: Password
    //   })
    // });

    // if (!response.ok) {
    //   // Handle HTTP errors
    //   const errorData = await response.json();
    //   console.error("Login failed:", errorData.message);
    //   return;
    // }

    // const data = await response.json();
    // console.log("Login successful:", data);
    // localStorage.setItem("token", data.jwtToken);
    navigate("/eco-store");


  } catch (error) {
    console.error("Network or server error:", error);
  }
};
// {
//     "id": 4,
//     "jwtToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaXNoYW50aCIsImlhdCI6MTc1NjM3MTIwOSwiZXhwIjoxNzU2Mzc0MjA5fQ.KoBp6N30gLKciYoX3YaMfS0_2S6JOXa3DlASkVswJMI",
//     "username": "nishanth",
//     "roles": [
//         "ROLE_USER"
//     ]
// }


  return (
    <div className="loginContainer">
      <div className="loginwholediv">
        <div className="loginFirstConatiner">
          <div className="loginFirstConatinercontent">
            <h1 className="text-5xl font-extrabold text-white mb-4">
              EcoStore
            </h1>
            <p>
              Premium organic products & wellness essentials delivered fast.
            </p>
            <div className="loginFirstConatinercontentimgcontainer">
              <img
                src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M="
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="loginSecoundcontainer">
          <p>Login</p>
          <form onSubmit={handleSubmit}>
            <div className="UsernameCon">
              <input type="text" placeholder=""  required value={username} onChange={(e)=>setUserName(e.target.value)}/>
              <label htmlFor="">Username</label>
              <p></p>
            </div>
            <div className="Passwordcon">
              <input type="text" placeholder=""  required value={Password} onChange={(e)=>setPassword(e.target.value)}/>
              <label htmlFor="">Password</label>
              <p></p>
            </div>
            <button type="submit">Sign In</button>
          </form>

          <p>No account create</p>
        </div>
      </div>
    </div>
  );
}
