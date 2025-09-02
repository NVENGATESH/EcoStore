import Navbar from "../Components/Navbar";
import "./EcoPage.css";
import CategoryByProduct from "./CategoryByProduct";
import OferPage from "../Components/OferPage";
import Footer from "../Components/Footer";
import ProductSearch from "../Components/ProductSearch";
import AddProduct from "../Components/AddProduct";
export default function EcoStore() {
  return (
    <div className="conatiner">
      <section className="homesection">
        <div className="homeconatiner">
          <div className="homefirstcontentconatiner">
            <h5>New Season</h5>
            <h1 className="text-4xl md:text-6xl font-extrabold ">
              Fresh & Organic
            </h1>
            <h1 className="text-4xl md:text-5xl font-extrabold ">
              Products Delivered Fast
            </h1>
            <p>Healthy groceries, teas, and supplements sourced responsibly.</p>
            <div className="homefirbtncon">
              <button>Shop Now</button>
              <button>Explore Categories</button>
            </div>
          </div>
          <div className="homesecoundcontentconatiner">
            <div className="homeimgcontainer">
              <img
                src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M="
                alt=""
              />
            </div>
          </div>
        </div>

        <svg
          className="absolute bottom-0 left-0 right-0"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64 C240,120 480,0 720,64 C960,128 1200,64 1440,96 L1440,160 L0,160 Z"
            fill="white"
          />
        </svg>
      </section>
      <CategoryByProduct />
      <OferPage />
      <Footer />

    
    </div>
  );
}
