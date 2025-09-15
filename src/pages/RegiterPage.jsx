
import "./Registerpage.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformpassword, setConformpassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();

  // Step 1: Send OTP for signup
  const handleSendOtp = async () => {
    setError("");
    setSuccess("");
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        "https://ecomerseprojectecostore.onrender.com/api/auth/send-otp-signup",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(response.data.message || "OTP sent to your email.");
      setOtpSent(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send OTP.";
      setError(msg);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post(
        "https://ecomerseprojectecostore.onrender.com/api/auth/verify-otp-signup",
        { email, otp },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(response.data.message || "OTP verified.");
      setOtpVerified(true);
    } catch (err) {
      const msg = err.response?.data?.message || "OTP verification failed.";
      setError(msg);
    }
  };

  // Step 3: Complete Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== conformpassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    if (!otpVerified) {
      setError("Please verify OTP before signup.");
      return;
    }

    try {
      const response = await axios.post(
        "https://ecomerseprojectecostore.onrender.com/api/auth/signup",
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(response.data.message || "Signup successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed.";
      setError(msg);
    }
  };

  // Google OAuth
  const googleAuth = () => {
    window.location.href = "https://ecomerseprojectecostore.onrender.com/oauth2/authorization/google";
  };

  return (
    <div className="RegisterContainer">
      <div className="Registerwholediv">
        <div className="RegisterFirstConatiner">
          <div className="RegisterFirstConatinercontent">
            <h1 className="text-5xl font-extrabold">EcoStore</h1>
            <p>Premium organic products & wellness essentials delivered fast.</p>
            <div className="RegisterFirstConatinercontentimgcontainer">
              <img
                src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M="
                alt="Healthy food"
              />
            </div>
          </div>
        </div>

        <div className="RegisterSecoundcontainer">
          <h2>Register</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="UsernameCon">
              <input
                type="text"
                placeholder=" "
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // disabled={!otpVerified} // username only after OTP verification
              />
              <label>Username</label>
            </div>

            <div className="Emailcon">
              <input
                type="email"
                placeholder=" "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={otpSent} // disable after OTP sent
              />
              <label>Email</label>
            </div>

            {!otpSent && (
              <button type="button" onClick={handleSendOtp}>
                Send OTP
              </button>
            )}

            {otpSent && !otpVerified && (
              <>
                <div className="OtpCon">
                    <label>Enter OTP</label>
                  <input
                    type="text"
                    placeholder=" "
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                
                </div>
                <button type="button" onClick={handleVerifyOtp}>
                  Verify OTP
                </button>
              </>
            )}

            {otpVerified && (
              <>
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

                <div className="conformPasswordcon">
                  <input
                    type="password"
                    placeholder=" "
                    required
                    value={conformpassword}
                    onChange={(e) => setConformpassword(e.target.value)}
                  />
                  <label>Confirm Password</label>
                </div>

                <button type="submit">Sign Up</button>
              </>
            )}
          </form>

          <button onClick={googleAuth} className="google">
            Login with Google
          </button>

          <p>
            Already have an Account? <Link to={"/login"} className="linkrout">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
