
import { useEffect, useState } from "react";
import "./CategoryByProduct.css";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function CategoryByProduct() {
  const [categories, setCategories] = useState([{ categoryId: 0, categoryName: "All" }]);
  const [product, setProduct] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const loadCategoriesAndProducts = async () => {
      try {
        // 🔧 Fetch categories
        const categoryRes = await axios.get(
          "http://localhost:8080/api/public/categories",
          { withCredentials: true } // 🔧 add this
        );
        setCategories([{ categoryId: 0, categoryName: "All" }, ...categoryRes.data.content]);

        // 🔧 Fetch all products
        const productRes = await axios.get(
          "http://localhost:8080/api/public/products",
          { withCredentials: true } // 🔧 add this
        );
        setProduct(productRes.data.content);

        // 🔧 Fetch images for products
        productRes.data.content.forEach((p) => fetchImage(p.productId));
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    loadCategoriesAndProducts();
  }, []);

  const fetchImage = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/public/product/${id}/image`,
        {
          responseType: "blob",
          withCredentials: true, // 🔧 add this
        }
      );
      const url = URL.createObjectURL(response.data);
      setImageUrls((prev) => ({ ...prev, [id]: url }));
    } catch (err) {
      console.error("Error fetching image:", err);
    }
  };

  const filteredProducts = product.filter((p) =>
    selectedCategoryId === 0 ? true : p.categoryId === selectedCategoryId
  );

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
  };

  const handleProductClick = (id) => {
    if (!id) return;
    navigate(`/ProductInformation/${id}`);
  };

  return (
    <section className="CategoryByProductSection">
      <div className="Categoricon">
        <div className="catogorislistcon">
          {categories.map((cat) => (
            <span
              key={cat.categoryId}
              className="categoreis"
              onClick={() => handleCategoryClick(cat.categoryId)}
            >
              {cat.categoryName}
            </span>
          ))}
        </div>
        <div className="Sorterbycategorieslist">
          <p>Sorted by</p>
          <select>
            <option value="Popularity">Popularity</option>
            <option value="Newest">Newest</option>
            <option value="PriceLowHigh">Price: Low to High</option>
            <option value="PriceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="Productlistcon">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
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
        ) : (
          <p className="text-center text-gray-500 text-lg mt-4">
            No products found
          </p>
        )}
      </div>
    </section>
  );
}
