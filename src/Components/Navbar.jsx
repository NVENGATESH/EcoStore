

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserAvatar from "./UserAvatar";
import "../Components/NavBar.css";

export default function Navbar() {
  const [showInfo, setShowInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const userImgRef = useRef(null);
  const infoRef = useRef(null);
  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleUserInfo = () => setShowInfo(prev => !prev);

  // Close dropdown when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        infoRef.current &&
        !infoRef.current.contains(e.target) &&
        userImgRef.current &&
        !userImgRef.current.contains(e.target)
      ) {
        setShowInfo(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setShowInfo(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Fetch user info from backend
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await axios.get("https://ecomerseprojectecostore.onrender.com/api/auth/userinfoss", {
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

const handleSearchSubmit = (e) => {
  e.preventDefault();

  // If user is null/undefined, send to login
  // if (!user || !user.name) {
  //   navigate("/login");
  //   return;
  // }

  // If user exists but search is empty, you could handle differently
  if (searchQuery.trim()) {
    navigate(`/ProductSearch/${searchQuery}`);
  } else {
    navigate("/ProductSearch");
  }
};



  const goToHome = () => navigate("/eco-store");
  const goToCart = () => navigate("/Cart");

  const handleLogout = async () => {
    try {
      const endpoint = "https://ecomerseprojectecostore.onrender.com/api/auth/logout";
      await axios.post(endpoint, {}, { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="header">
      <div className="navHeaderContainer">
        <h1 className="brand" onClick={goToHome} role="button" tabIndex={0}>
          EcoStore
        </h1>

        <form className="searchForm" onSubmit={handleSearchSubmit}>
          <div className="searchInner">
            <span className="searchIcon">🔎</span>
            <input
              type="text"
              className="searchInput"
              placeholder="Search products, brands…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={goToHome}
            />
          </div>
        </form>

        <nav className="mainNav">
          <Link to="/eco-store" className="navlinks">Home</Link>
          <Link to="/AddProduct" className="navlinks">Add Product</Link>
        </nav>

        <div className="userContainer">
          <div
            className="userImgContainer"
            ref={userImgRef}
            onClick={toggleUserInfo}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggleUserInfo()}
            aria-expanded={showInfo}
            aria-controls="userinfoiscontent"
          >
            <UserAvatar imageUrl={user?.imageUrl} />
          </div>

          <div
            id="userinfoiscontent"
            ref={infoRef}
            className={`userInfoContainer ${showInfo ? "visible" : "hidden"}`}
            aria-hidden={!showInfo}
          >
            <h3 className="username">{user?.name || "Guest User"}</h3>
            <p className="useremail">{user?.email || "email@example.com"}</p>
            <button className="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="cartBtn">
          <button aria-label="Cart" onClick={goToCart}>
            <span role="img" aria-label="cart">🛒</span>
          </button>
        </div>
      </div>
    </header>
  );
}
