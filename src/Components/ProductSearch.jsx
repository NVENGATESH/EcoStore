import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import './ProductSearch.css'

export default function ProductSearch() {
  const [searchProduct, setSearchProduct] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const { keyword } = useParams();
  const navigate =useNavigate()

  useEffect(() => {
    const searchProductFetch = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:8080/api/public/products/keyword/${keyword}`
        );
        console.log(responce.data.content);
        setSearchProduct(responce.data.content);
        responce.data.content.forEach((p) => fetchImage(p.productId));
      } catch (error) {
        console.log("error fetching");
      }
    };
    searchProductFetch();
  }, []);

  const fetchImage = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/public/product/${id}/image`,
        {
          responseType: "blob",
        }
      );
      const url = URL.createObjectURL(response.data);
      setImageUrls((prev) => ({ ...prev, [id]: url }));
    } catch (err) {
      console.error("Error fetching image:", err);
    }
  };

  const handleProductClick = (id) => {
 
    if (!id) return;
    navigate(`/ProductInformation/${id}`);
  };

  console.log(imageUrls)
  return (
    <div>
      <Navbar/>
      <section className="SearchProductSection">
 {searchProduct.length === 0 ? (
  <p>No Product Found</p>
) : (
  searchProduct.map((p) => (
    <ProductCard
      key={p.productId}
      id={p.productId}
      description={p.description}
      title={p.productName}
      price={p.price}
      badge="BestSeller"
      image={imageUrls[p.productId]}
      handlekey={handleProductClick}
    />
  ))
)}


     </section>
    </div>
  );
}