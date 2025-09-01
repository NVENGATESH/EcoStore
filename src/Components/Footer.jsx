import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footersection">
      <div className="footerfircon">
        <div className="foot1">
          <h4>EcoStore</h4>
          <p>Eco-friendly supplements & organics for your daily wellness.</p>
        </div>
        <div className="foot2">
          <h4>Shop</h4>
          <ul>
            <li> All Products</li>
            <li> New Arrivals</li>
            <li>Best Sellers</li>
            <li> Gift Cards</li>
          </ul>
        </div>
        <div className="foot3">
          <h4>Support</h4>
          <ul>
            <li> Shipping</li>
            <li> Returns</li>
            <li>FAQs</li>
            <li> Contact</li>
          </ul>
        </div>
        <div className="foot4">
          <h4>Newsletter</h4>
          <div className="foot4content">
            <input type="text" name="" id="" placeholder="Email address" />
            <button>Join</button>
          </div>
        </div>
      </div>
     
        <p className="footline"></p>
      <p className="footcopyrites">&copy; 2025 EcoStore. All rights reserved 💜 <span className="footname">Nishanth</span>.</p>

     
    </footer>
  );
}
