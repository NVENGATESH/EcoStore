import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    discount: "",
  });
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // handle input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!categoryId) {
      alert("⚠️ Please select a category before submitting");
      return;
    }

    const formData = new FormData();

    // match backend RequestPart("image")
    formData.append("image", image);

    // match backend RequestPart("productDto")
    formData.append(
      "productDto",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    try {
      const response = await axios.post(
        `http://localhost:8080/api/public/categories/${categoryId}/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if JWT secured
          },
        }
      );

      console.log("✅ Product added:", response.data);
      alert("Product added successfully!");

      // reset form
      setProduct({
        productName: "",
        description: "",
        price: "",
        quantity: "",
        discount: "",
      });
      setImage(null);
      setCategoryId("");
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("Error adding product");
    }
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label className="form-label"><h6>Product Name</h6></label>
            <input
              type="text"
              className="form-control"
              name="productName"
              value={product.productName}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </div>

          <div className="col-12">
            <label className="form-label"><h6>Description</h6></label>
            <textarea
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label"><h6>Price</h6></label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Eg: 2500"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label"><h6>Quantity</h6></label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={product.quantity}
              onChange={handleInputChange}
              placeholder="Stock quantity"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label"><h6>Discount (%)</h6></label>
            <input
              type="number"
              className="form-control"
              name="discount"
              value={product.discount}
              onChange={handleInputChange}
              placeholder="Eg: 20"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label"><h6>Category</h6></label>
            <select
              className="form-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
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

          <div className="col-md-6">
            <label className="form-label"><h6>Product Image</h6></label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
