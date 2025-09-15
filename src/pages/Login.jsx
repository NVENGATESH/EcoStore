import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // clear previous errors
    setSuccessMsg(""); // clear previous success

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Login failed.");
        return;
      }

      // Login success
      
      setSuccessMsg("Login successful!");
      localStorage.setItem("isLoggedIn", "true");
      console.log("Login successful:", data);

      // Store JWT token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name || "User",
          email: data.email || username,
        })
      );

      // Navigate after short delay to show success message
      setTimeout(() => {
        navigate("/eco-store");
      }, 1000);

    } catch (error) {
      console.error("Network or server error:", error);
      setErrorMsg("Server not responding. Please try again later.");
    }
  };

  const googleAuth = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="loginContainer">
      <div className="loginwholediv">
        <div className="loginFirstConatiner">
          <div className="loginFirstConatinercontent">
            <h1 className="text-5xl font-extrabold text-white mb-4">EcoStore</h1>
            <p>Premium organic products & wellness essentials delivered fast.</p>
            <div className="loginFirstConatinercontentimgcontainer">
              <img
                src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M="
                alt="Healthy Food"
              />
            </div>
          </div>
        </div>

        <div className="loginSecoundcontainer">
          <p>Login</p>

          {/* Show messages at the top */}
          {errorMsg && <p className="error-message-top">{errorMsg}</p>}
          {successMsg && <p className="success-message-top">{successMsg}</p>}

          <form onSubmit={handleSubmit}>
            <div className="UsernameCon">
              <input
                type="email"
                placeholder=" "
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label>Email</label>
            </div>

            <div className="Passwordcon">
              <input
                type="password"
                placeholder=" "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>

            <button type="submit">Sign In</button>
          </form>

          <button onClick={googleAuth} className="google">
            Login with Google
          </button>

          <p>
            Don't have an account? <Link to="/register" className="linkrout">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
