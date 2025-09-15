import { useState, useEffect } from "react";
import "./AddProduct.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddProduct() {
  const { id } = useParams(); // product ID from route

  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    discount: "",
    brand: "",
  });

  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const navigate=useNavigate()

  // Optional: fetch existing product details on load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/public/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = response.data;
        setProduct({
          productName: data.productName,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          discount: data.discount,
          brand: data.brand,
        });
        setCategoryId(data.category?.categoryId || "");
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
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

    try {
      const formData = new FormData();
      if (image) formData.append("imageFile", image);

      // include categoryId in DTO
      const productWithCategory = { ...product, categoryId };
      formData.append(
        "productDto",
        new Blob([JSON.stringify(productWithCategory)], { type: "application/json" })
      );

      const response = await axios.put(
        `http://localhost:8080/api/public/products/${id}`,
        // /public/categories/{ProductId}/products
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedProduct = response.data;

      // Update frontend state with the updated product
      setProduct({
        productName: updatedProduct.productName,
        description: updatedProduct.description,
        price: updatedProduct.price,
        quantity: updatedProduct.quantity,
        discount: updatedProduct.discount,
        brand: updatedProduct.brand,
      });
      setCategoryId(updatedProduct.category?.categoryId || "");
      setImage(null);

      alert("✅ Product updated successfully!");
      navigate(`/ProductInformation/${id}`)
      
    } catch (error) {
      console.error("❌ Error updating product:", error);
      alert("Error updating product");
    }
  };

  return (
    <section className="addProductSection">
      <h1>Update Product</h1>
      <div className="addProductContainet">
        <form onSubmit={submitHandler}>
          <div className="productflex">
            <div className="productsdetails ProductName">
              <label>Name</label>
              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                value={product.productName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="productsdetails ProductBrand">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={product.brand}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="productsdetails ProductDescription">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Product Description"
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
                name="price"
                placeholder="Eg: $1000"
                value={product.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="productsdetails ProductCategory">
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
            <div className="productsdetails ProductQuantity">
              <label>Stock Quantity</label>
              <input
                type="number"
                name="quantity"
                placeholder="Stock Remaining"
                value={product.quantity}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="productsdetails ProductImage">
              <label>Image</label>
              <input type="file" onChange={handleImageChange} />
            </div>
          </div>

          <button type="submit"  style={{ width: "30%",margin:"auto" }}>Update Product</button>
        </form>
      </div>
    </section>
  );
}
