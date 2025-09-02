import { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";
export default function Cart() {
  const [allCart, setAllCart] = useState([]);
  const [clickedarry, setClickedArray] = useState([]);
  const [products, setProducts] = useState([]);
  const[totalPrice,setTotalPrice]=useState(0)
  const[eachPrice,setEachPricse]=useState([])












  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/public/carts"
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
            axios.get(`http://localhost:8080/api/public/products/${id}`)
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
const totalpri = allCart.reduce((acc, item) => {
  return acc + (Number(item.totalPrice));
}, 0);

setTotalPrice(totalpri);
const pricesMap = allCart.reduce((acc, cartt) => {
  acc[cartt.productIds] = cartt.totalPrice;
  return acc;
}, {});

setEachPricse(pricesMap);

  }, [clickedarry]);

  // console.log(allCart[0])


  if (!allCart) return <p>Loading...</p>;
// console.log(products)
console.log(eachPrice["2"]);
  return (
    <section className="CartSection">
      <h1>Shoping Bag</h1>
      <p className="line"></p>
      {clickedarry.map((data, index) => {
        // console.log(data);
        return (
          <div className="cartContainer" key={index}>
            <div className="EachConatiner">
               <p className="line"></p>
              <div className="carts">
               
              <div className="cartProductimg">
                <div className="cartProductimgcon">
                  {" "}
                  <img
                    src={`http://localhost:8080/api/public/product/${data}/image`}
                    alt="Product"
                  />
                </div>
              </div>
              <div className="cartProductcontent">
                <h1>{products[index]?.productName}</h1>

                <h2>{products[index]?.brand}</h2>
                <div className="pricecon">
                  <span>+</span>
               
                  <p>{`$${eachPrice[data]}`}</p>
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
      <p className="total">{`Total Price $${totalPrice}`}</p>
      <button className="chesckoutbtn">Checkouts</button>
    </section>
  );
}
