

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductInformatiomn.css";

export default function ProductInformation() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageUrls, setImageUrls] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await axios.get(
          `https://ecomerseprojectecostore.onrender.com/api/public/products/${id}`
        );
        setProduct(response.data);
        console.log("Fetched Product:", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://ecomerseprojectecostore.onrender.com/api/public/product/${id}/image`,
          {
            responseType: "blob",
          }
        );
        const url = URL.createObjectURL(response.data);
        setImageUrls((prev) => ({ ...prev, [id]: url }));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
    fetchProductInfo();
  }, [id]);

  const updatProduct = (id) => {
    if (!id) return;
    console.log(id);
    navigate(`/UpdateProduct/${id}`);
  };

  const deleteProductById = async (id) => {
    try {
      await axios.delete(
        `https://ecomerseprojectecostore.onrender.com/api/admin/products/${id}`,
        {
          withCredentials: true, // ⬅️ Send JWT cookie
        }
      );
      console.log(`Product ${id} deleted successfully.`);
      navigate("/eco-store"); // Go back to product list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const deleteProduct = (id) => {
    if (!id) return;
    const choice = window.confirm("Are you sure you want to delete?");
    if (choice) {
      alert(`Product ${id} deleted successfully.`);
      deleteProductById(id);
    }
  };

  const AddProduct = async (AddcartId) => {
    try {
      await axios.post(
        `https://ecomerseprojectecostore.onrender.com/api/admin/carts/${AddcartId}`,
        {},
        {
          withCredentials: true,
        }
      );
      alert(`Product ${AddcartId} added to cart successfully.`);
      console.log(`Product ${AddcartId} added to cart successfully.`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <section className="ProductInformationSection">
      <div className="ProductInformationContainer">
        <div className="ProductInformationfirst">
          <div className="ProductInformationimgcon">
            <img
              src={imageUrls[id]}
              alt={product?.productName || "Loading..."}
            />
          </div>
        </div>

        {product && (
          <div className="ProductInformationSec">
            <h1>{product.productName}</h1>
            <h5>{product.brand}</h5>
            <p>{product.description}</p>
            <p className="line"></p>
            <h1>{`₹${product.price}`}</h1>
            <button onClick={() => AddProduct(id)}>Add to Cart</button>
            <p>{`Stock Available: ${product.quantity}`}</p>
            <div className="prodcinfobtncon">
              <button onClick={() => updatProduct(id)}>Update</button>
              <button onClick={() => deleteProduct(id)}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

