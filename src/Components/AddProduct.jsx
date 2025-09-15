
import { useState } from "react";
import "./AddProduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    discount: "",
    brand: "",
  });

  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const navigate=useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!categoryId) {
      alert("⚠️ Please select a category before submitting");
      return;
    }

    // Convert numeric fields to numbers
    const productToSend = {
      ...product,
      price: Number(product.price),
      quantity: Number(product.quantity),
      discount: Number(product.discount),
    };

    const formData = new FormData();
    if (image) formData.append("imageFile", image);
    formData.append(
      "productDto",
      new Blob([JSON.stringify(productToSend)], { type: "application/json" })
    );

    try {
      const response = await axios.post(
        `http://localhost:8080/api/public/categories/${categoryId}/products`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true // uncomment if using cookies
        },
         
      );
      console.log("✅ Product added:", response.data);
      alert("Product added successfully!");
      navigate("/eco-store")

      setProduct({
        productName: "",
        description: "",
        price: "",
        quantity: "",
        discount: "",
        brand: "",
      });
      setImage(null);
      setCategoryId("");
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("Error adding product");
    }
  };

  return (
    <section className="addProductSection">
      <h1>Add Product</h1>
      <div className="addProductContainet">
        <form onSubmit={submitHandler}>
          <div className="productflex">
            <div className="productsdetails ProductName">
              <label>Name</label>
              <input
                type="text"
                placeholder="Product Name"
                name="productName"
                value={product.productName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="productsdetails ProductBrand">
              <label>Brand</label>
              <input
                type="text"
                placeholder="Enter your Brand"
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="productsdetails ProductDectiption">
            <label>Description</label>
            <input
              type="text"
              placeholder="Add product description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="productflex">
            <div className="productsdetails ProductPrice">
              <label>Price</label>
              <input
                type="number"
                placeholder="Eg:$1000"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="productsdetails ProductPrice">
              <label>Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="">Select category</option>
                <option value="1">Laptop</option>
                <option value="2">Headphone</option>
                <option value="3">Mobile</option>
                <option value="4">Electronics</option>
                <option value="5">Toys</option>
                <option value="6">Fashion</option>
              </select>
            </div>
          </div>

          <div className="productflex">
            <div className="productsdetails ProductQuatity">
              <label>Stock Quantity</label>
              <input
                type="number"
                placeholder="Stock Remaining"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="productsdetails Productimage">
              <label>Image</label>
              <input type="file" onChange={handleImageChange} required />
            </div>
          </div>

          <button type="submit">Add</button>
        </form>
      </div>
    </section>
  );
}
