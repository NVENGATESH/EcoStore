import { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";
export default function Cart() {
  const [allCart, setAllCart] = useState([]);
  const [clickedarry, setClickedArray] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "https://ecostore-970g.onrender.com/api/public/carts"
        );
        setAllCart(response.data.cartDtos || []); // default to empty array
        //   const arr = response.data.cartDtos .filter(a => a.clicked?a.productIds:"");
        const arr = response.data.cartDtos
          .filter((a) => a.clicked) // keep only clicked items
          .map((a) => a.productIds);
        setClickedArray(arr);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responses = await Promise.all(
          clickedarry.map((id) =>
            axios.get(`https://ecostore-970g.onrender.com/api/public/products/${id}`)
          )
        );
        const productData = responses.map((res) => res.data);
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (clickedarry.length > 0) {
      fetchProducts();
    }
  }, [clickedarry]);

  if (!allCart) return <p>Loading...</p>;
console.log(products)
  return (
    <section className="CartSection">
      <h1>Shoping Bag</h1>
      <p className="line"></p>
      {clickedarry.map((data, index) => {
        console.log(data);
        return (
          <div className="cartContainer" key={index}>
            <div className="EachConatiner">
               <p className="line"></p>
              <div className="carts">
               
              <div className="cartProductimg">
                <div className="cartProductimgcon">
                  {" "}
                  <img
                    src={`https://ecostore-970g.onrender.com/api/public/product/${data}/image`}
                    alt="Product"
                  />
                </div>
              </div>
              <div className="cartProductcontent">
                <h1>{products[index]?.productName}</h1>

                <h2>{products[index]?.brand}</h2>
                <div className="pricecon">
                  <span>+</span>
                  <p>{`$${products[index]?.price}`}</p>
                  <span>-</span>
                </div>
                <button>Buy</button>
              </div>
            </div>
            </div>
            <p className="line"></p>
          </div>
        );
      })}
      <p className="total">Total</p>
      <button className="chesckoutbtn">Checkouts</button>
    </section>
  );
}

// import { useEffect, useState } from "react";
// import "./Cart.css";
// import axios from "axios";

// export default function Cart() {
//   const [allCart, setAllCart] = useState([]);
//   const [clickedArray, setClickedArray] = useState([]);
//   const [products, setProducts] = useState([]);

//   // Fetch Cart
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/public/carts");
//         const cartDtos = response.data.cartDtos || [];
//         setAllCart(cartDtos);

//         // Filter clicked items -> get productIds
//         const arr = cartDtos.filter(a => a.clicked).map(a => a.productIds);
//         setClickedArray(arr);
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//       }
//     };

//     fetchCart();
//   }, []);

//   // Fetch product details for clicked products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const responses = await Promise.all(
//           clickedArray.map(id =>
//             axios.get(`http://localhost:8080/api/public/products/${id}`)
//           )
//         );
//         const productData = responses.map(res => res.data);
//         setProducts(productData);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     if (clickedArray.length > 0) {
//       fetchProducts();
//     }
//   }, [clickedArray]);
// console.log(products[0]?.id);

//   return (
//     <section className="CartSection">
//       <h1>Shopping Bag</h1>
//       <p className="line"></p>

//       {products.map((product, index) => {
//         // find matching cart item by productId
//         const cartItem = allCart.find(c => c.productIds === product.id);

//         return (
//           <div className="cartContainer" key={index}>
//             <div className="EachConatiner">
//               <div className="cartProductimg">
//                <div className="cartProductimgcon">
//               {" "}
//              <img
//       src={`http://localhost:8080/api/public/product/${product.id}/image`}
//   alt="Product"
// />
//             </div>
//               </div>

//               <div className="cartProductcontent">
//                 <h1>{product.productName}</h1>
//                 <h2>{product.brand}</h2>

//                 <div className="pricecon">
//                   <span>+</span>
//                   <p>{`$${cartItem?.totalPrice ?? 0}`}</p>
//                   <span>-</span>
//                 </div>
//                 <button>Buy</button>
//               </div>
//             </div>
//             <p className="line"></p>
//           </div>
//         );
//       })}

//       <p>Total</p>
//       <button>Checkouts</button>
//     </section>
//   );
// }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./Cart.css";

// export default function Cart() {
//   const [allCart, setAllCart] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [images, setImages] = useState({});

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/public/carts");
//         const cartDtos = response.data.cartDtos || [];
//         setAllCart(cartDtos);

//         const clickedIds = cartDtos.filter(c => c.clicked).map(c => c.productIds);
//         if (clickedIds.length > 0) {
//           const productResponses = await Promise.all(
//             clickedIds.map(id => axios.get(`http://localhost:8080/api/public/products/${id}`))
//           );
//           const productData = productResponses.map(res => res.data);
//           setProducts(productData);

//           // Fetch images in browser-safe way
//           const imageData = {};
//           await Promise.all(
//             clickedIds.map(async (id) => {
//               imageData[id] = await fetchImage(id);
//             })
//           );
//           setImages(imageData);
//         }
//       } catch (err) {
//         console.error("Error fetching cart:", err);
//       }
//     };

//     fetchCart();
//   }, []);

//   const fetchImage = async (productId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/public/product/${productId}/image`,
//         { responseType: "arraybuffer" }
//       );
//       const bytes = new Uint8Array(response.data);
//       let binary = '';
//       bytes.forEach(b => binary += String.fromCharCode(b));
//       const base64 = window.btoa(binary);
//       return `data:image/jpeg;base64,${base64}`;
//     } catch (err) {
//       console.error("Error fetching image for product", productId, err);
//       return "/placeholder.png";
//     }
//   };

//   const totalPrice = allCart
//     .filter(c => c.clicked)
//     .reduce((sum, item) => sum + (item.totalPrice || 0), 0);

//   if (!allCart.length) return <p>Loading...</p>;

//   return (
//     <section className="CartSection">
//       <h1>Shopping Bag</h1>
//       <p className="line"></p>

//       {products.map((product, index) => {
//         const cartItem = allCart.find(c => c.productIds === product.id);
//         return (
//           <div className="cartContainer" key={index}>
//             <div className="EachConatiner">
//               <div className="cartProductimg">
//                 <div className="cartProductimgcon">
//                   <img src={images[product.id] || "/placeholder.png"} alt={product.productName} />
//                 </div>
//               </div>
//               <div className="cartProductcontent">
//                 <h1>{product.productName}</h1>
//                 <h2>{product.brand}</h2>
//                 <div className="pricecon">
//                   <span>+</span>
//                   <p>{`$${cartItem?.totalPrice ?? product.price}`}</p>
//                   <span>-</span>
//                 </div>
//                 <button>Buy</button>
//               </div>
//             </div>
//             <p className="line"></p>
//           </div>
//         );
//       })}

//       <p>Total: ${totalPrice}</p>
//       <button>Checkout</button>
//     </section>
//   );
// }
