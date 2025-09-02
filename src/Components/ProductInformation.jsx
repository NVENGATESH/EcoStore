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
          `https://ecostore-970g.onrender.com/api/public/products/${id}`,
          {
            // headers: {
            //   Authorization: `Bearer ${localStorage.getItem("token")}`, // only if JWT secured
            // },
          }
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
          `https://ecostore-970g.onrender.com/api/public/product/${id}/image`,
          {
            // headers: {
            //   Authorization: `Bearer ${localStorage.getItem("token")}`,
            // },
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
        `https://ecostore-970g.onrender.com/api/admin/products/${id}`, // use correct admin endpoint
        {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Remove deleted product from state
      setProducts((prev) => prev.filter((p) => p.id !== id));
      console.log(`Product ${id} deleted successfully.`);
       

    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const deleteProduct = (id) => {
    if (!id) return;
    console.log(id);
    const choice = window.confirm("you want to delte");
    if (choice) {
       alert(`Product ${id} Deleted  successfully.`);
      deleteProductById(id);
      navigate("/eco-store");
    }
  };
  // console.log(product)
  //  console.log(product.productId)
  const AddProduct = async (AddcartId) => {
    try {
      const addCartResponce = await axios.post(
        `https://ecostore-970g.onrender.com/api/admin/carts/${AddcartId}`,
        {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(`Product ${AddcartId} Addtocart Add successfully.`);
       console.log(`Product ${AddcartId} Addtocart Add successfully.`);
    } catch (error) {
      console.error("ErrorAdd  AddCart product:", error);
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

        {product && ( // render only when product is loaded
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

