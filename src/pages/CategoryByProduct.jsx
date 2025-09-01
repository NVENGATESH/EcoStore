// // import { useEffect, useState } from "react";
// // import "./CategoryByProduct.css";
// // import axios from "axios";
// // import { data } from "react-router-dom";
// // import ProductCard from "../Components/ProductCard";
// // import { useNavigate } from "react-router-dom";
// // export default function CategoryByProduct() {
// //   const [categories, setCategories] = useState([
// //     { categoryId: 0, categoryName: "All" },
// //   ]);
// //   const [token, setToken] = useState(null);
// //   const [product, setProduct] = useState([]);

// //   const [imageUrls, setImageUrls] = useState({});
// //   const [chanegcategoryid, setChanegcategoryid] = useState(0);
// //   const navigate=useNavigate();

// //   useEffect(() => {
// //     product.forEach((p) => fetchImage(p.productId));
// //   }, [product]);
// // //   useEffect(() => {
// // //   product.forEach((p) => {
// // //     if (p) fetchImage(p.productId);
// // //   });
// // // }, [product]);

// //   useEffect(() => {
// //     const categoryload = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         setToken(token);
// //         const response = await axios.get(
// //           "http://localhost:8080/api/public/categories",
// //           {
// //             // headers: { Authorization: `Bearer ${token}` },
// //           }
// //         );
// //         setCategories([
// //           { categoryId: 0, categoryName: "All" },
// //           ...response.data.content,
// //         ]);
// //       } catch (error) {
// //         console.error("Error fetching categories:", error);
// //       }
// //     };
// //     categoryload();
// //     allProduct();
// //   }, []);

// //   const allProduct = async () => {
// //     try {
// //       const allProduct = await axios.get(
// //         "http://localhost:8080/api/public/products",
       
// //         {
// //           // headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       setProduct((prev) => [...prev, ...allProduct.data.content]);
// //     } catch (error) {
// //       console.log("all product get Error", error);
// //     }
// //   };

// //   const fetchImage = async (id) => {
// //     try {
// //       const response = await axios.get(
// //         `http://localhost:8080/api/public/product/${id}/image`,
// //         {
// //           // headers: { Authorization: `Bearer ${token}` },
// //           responseType: "blob",
// //         }
// //       );
// //       const url = URL.createObjectURL(response.data);
// //       setImageUrls((prev) => ({ ...prev, [id]: url }));
// //     } catch (error) {
// //       console.error("Error fetching image:", error);
// //     }
// //   };

// //   function filterProductbyCategory(id) {
// //     setChanegcategoryid(id);
// //   }
  
// //   const a = product.filter((products) => {
// //     return chanegcategoryid === 0
// //       ? products
// //       : products.categoryId === chanegcategoryid;
// //   });
  

// // function handlekey(id){
// //   if(!id) return;
// //   console.log(id)
// //   navigate(`/ProductInformation/${id}`); 
// // }

// //   return (
// //     <section className="CategoryByProductSection">
// //       <div className="Categoricon">
// //         <div className="catogorislistcon">
// //           {categories.map((catagory, index) => {
// //             return (
// //               <span className="categoreis"
// //                 key={catagory.categoryId}
// //                 onClick={() => {
// //                   filterProductbyCategory(catagory.categoryId);
// //                 }}
// //               >
// //                 {catagory.categoryName}
// //               </span>
// //             );
// //           })}
// //         </div>
// //         <div className="Sorterbycategorieslist">
// //           <p>Sorted by</p>
// //           <select>
// //             <option value="Popularity">Popularity</option>
// //             <option value="Newest">Newest</option>
// //             <option value="Popularity">Popularity</option>
// //             <option value="Popularity">Popularity</option>
// //           </select>
// //         </div>
// //       </div>
// //       <div className="Productlistcon">
// //         {product
// //           .filter((products) => {
// //             return chanegcategoryid === 0
// //               ? products
// //               : products.categoryId === chanegcategoryid;
// //           })
// //           .map((eachProduct, index) => {
// //             return (
// //               <ProductCard
// //                 key={eachProduct.productId}
// //                   id={eachProduct.productId}  
// //                 description={eachProduct.description}
// //                 title={eachProduct.productName}
// //                 price={eachProduct.price}
// //                 badge={"BestSeller"}
// //                 image={imageUrls[eachProduct.productId]}
// //                 handlekey={handlekey}
// //               />
// //             );
// //           })}
// //       </div>
// //     </section>
// //   );
// // }



import { useEffect, useState } from "react";
import "./CategoryByProduct.css";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function CategoryByProduct() {
  const [categories, setCategories] = useState([{ categoryId: 0, categoryName: "All" }]);
  const [token, setToken] = useState(null);
  const [product, setProduct] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const loadCategoriesAndProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        setToken(token);

        // Fetch categories
        const categoryRes = await axios.get("https://ecostore-970g.onrender.com/api/public/categories");
        setCategories([{ categoryId: 0, categoryName: "All" }, ...categoryRes.data.content]);

        // Fetch all products
        const productRes = await axios.get("https://ecostore-970g.onrender.com/api/public/products");
        setProduct(productRes.data.content);

        // Fetch images for products
        productRes.data.content.forEach((p) => fetchImage(p.productId));
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    loadCategoriesAndProducts();
  }, []);
   useEffect(() => {
    const loadCategoriesAndProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        setToken(token);

        // Fetch categories
        const categoryRes = await axios.get("https://ecostore-970g.onrender.com/api/public/categories");
        setCategories([{ categoryId: 0, categoryName: "All" }, ...categoryRes.data.content]);

        // Fetch all products
        const productRes = await axios.get("https://ecostore-970g.onrender.com/api/public/products");
        setProduct(productRes.data.content);

        // Fetch images for products
        productRes.data.content.forEach((p) => fetchImage(p.productId));
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    loadCategoriesAndProducts();
  }, [product.productId]);

  const fetchImage = async (id) => {
    try {
      const response = await axios.get(`https://ecostore-970g.onrender.com/api/public/product/${id}/image`, {
        responseType: "blob",
      });
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
        {filteredProducts.map((p) => (
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
        ))}
      </div>
    </section>
  );
}

// import { useEffect, useState } from "react";
// import "./CategoryByProduct.css";
// import axios from "axios";
// import ProductCard from "../Components/ProductCard";
// import { useNavigate } from "react-router-dom";

// export default function CategoryByProduct() {
//   const [categories, setCategories] = useState([{ categoryId: 0, categoryName: "All" }]);
//   const [products, setProducts] = useState([]);
//   const [imageUrls, setImageUrls] = useState({});
//   const [selectedCategoryId, setSelectedCategoryId] = useState(0);

//   const navigate = useNavigate();

//   // Load categories and products on mount
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const catRes = await axios.get("http://localhost:8080/api/public/categories");
//         setCategories([{ categoryId: 0, categoryName: "All" }, ...catRes.data.content]);

//         const prodRes = await axios.get("http://localhost:8080/api/public/products");
//         setProducts(prodRes.data.content);

//         // Fetch images for products asynchronously
//         prodRes.data.content.forEach((p) => fetchImage(p.productId));
//       } catch (err) {
//         console.error("Error loading data:", err);
//       }
//     };
//     loadData();
//   }, []);

//   // Fetch image for a single product
//   const fetchImage = async (id) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/public/product/${id}/image`,
//         { responseType: "blob" }
//       );
//       const url = URL.createObjectURL(response.data);
//       setImageUrls((prev) => ({ ...prev, [id]: url }));
//     } catch (err) {
//       console.error("Image fetch error:", err);
//     }
//   };

//   // Filter products by category
//   const filteredProducts =
//     selectedCategoryId === 0
//       ? products
//       : products.filter((p) => p.categoryId === selectedCategoryId);

//   // Category click
//   const handleCategoryClick = (id) => setSelectedCategoryId(id);

//   // Navigate to product details
//   const handleProductClick = (id) => navigate(`/ProductInformation/${id}`);

//   // Delete product
//   const handleDeleteProduct = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/admin/products/${id}`);
//       // Immediately update state
//       setProducts((prev) => prev.filter((p) => p.productId !== id));
//       setImageUrls((prev) => {
//         const newImages = { ...prev };
//         delete newImages[id];
//         return newImages;
//       });
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   return (
//     <section className="CategoryByProductSection">
//       <div className="Categoricon">
//         <div className="catogorislistcon">
//           {categories.map((cat) => (
//             <span
//               key={cat.categoryId}
//               className="categoreis"
//               onClick={() => handleCategoryClick(cat.categoryId)}
//             >
//               {cat.categoryName}
//             </span>
//           ))}
//         </div>
//         <div className="Sorterbycategorieslist">
//           <p>Sorted by</p>
//           <select>
//             <option value="Popularity">Popularity</option>
//             <option value="Newest">Newest</option>
//             <option value="PriceLowHigh">Price: Low to High</option>
//             <option value="PriceHighLow">Price: High to Low</option>
//           </select>
//         </div>
//       </div>

//       <div className="Productlistcon">
//         {filteredProducts.length === 0 ? (
//           <p style={{ textAlign: "center", width: "100%" }}>No products available</p>
//         ) : (
//           filteredProducts.map((p) => (
//             <ProductCard
//               key={p.productId}
//               id={p.productId}
//               description={p.description}
//               title={p.productName}
//               price={p.price}
//               badge="BestSeller"
//               image={imageUrls[p.productId]} // Image loads independently
//               handlekey={handleProductClick}
//               handleDelete={() => handleDeleteProduct(p.productId)}
//             />
//           ))
//         )}
//       </div>
//     </section>
//   );
// }

