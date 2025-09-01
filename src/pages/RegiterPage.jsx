// import { useState } from "react";
// // import { useNavigate } from "react-router-dom"; // ✅ import this

// export default function Login() {
//   const [name, setName] = useState("");
//   const [pass, setPassword] = useState("");
//   const navigate = useNavigate(); // ✅ initialize

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: name,
//           password: pass,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Login failed");
//       }

//       const data = await response.json();
//       console.log("Login success:", data);

//       // ✅ Save token
//       localStorage.setItem("token", data.token);

//       // ✅ Redirect to dashboard
//       navigate("/dashboard");

//     } catch (error) {
//       console.error("Login error:", error.message);
//     }
//   };

//   return (
//     <>
//       <h1>Hello Developers</h1>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Enter your username"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={pass}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </>
//   );
// }

import "./Registerpage.css";
import axios from "axios";
import { useState } from "react";
export default function Login() {
 const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   const [conformpassword, setconformpassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password===conformpassword){
      console.log("hi")
       try {
      const response = await axios.post(
        "https://ecostore-970g.onrender.com/api/auth/signup",
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Signup successful:", response);
       console.log("token:", response.data.message);
    //   localStorage.setItem("token", response.token)
    } catch (error) {
      console.error("Signup error:", error.response ? error.response.data : error.message);
    }
    }else{
       console.log("corect Passoerd rong")
    }

   
  };

  return (
    <div className="RegisterContainer">
      <div className="Registerwholediv">
        <div className="RegisterFirstConatiner">
          <div className="RegisterFirstConatinercontent">
            <h1 className="text-5xl font-extrabold">EcoStore</h1>
            <p>
              Premium organic products & wellness essentials delivered fast.
            </p>
            <div className="RegisterFirstConatinercontentimgcontainer">
              <img
                src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M="
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="RegisterSecoundcontainer">
          <p>registered</p>
          <form action="" onSubmit={handleSubmit}>
            <div className="UsernameCon">
              <input
                type="text"
                placeholder=""
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="">Username</label>
              <p></p>
            </div>
            <div className="Emailcon">
              <input
                type="email"
                placeholder=""
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="">Email</label>
              <p></p>
            </div>
            <div className="Passwordcon">
              <input
                type="text"
                placeholder=""
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="">Password</label>
              <p></p>
            </div>
            <div className="conformPasswordcon">
              <input type="text" placeholder="" required
                value={conformpassword}
                onChange={(e) => setconformpassword(e.target.value)} />
              <label htmlFor="">Confirm Password</label>
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
