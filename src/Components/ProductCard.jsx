import "./ProductCard.css";


export default function ProductCard({
  id,
  image = "",
  title = "",
  description = "",
  price = "",
  rating = "",
  badge = "",
  handlekey,
})
{
  return (
    <div className="productCardContainer" onClick={()=>{handlekey(id)}}>
      <div className="Prodctfircon">
        <img src={image || "/placeholder.png"} alt={title} />
        {badge && <span>{badge}</span>}
        <button aria-label="Add to wishlist">♡</button>
      </div>
      <div className="ProducSeccon">
        <h3>{title}</h3>
        <div className="prodratingcon">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </div>
        <p>{description}</p>
        <div className="productbtn">
          <span>{`₹${price}`}</span>
          <button className="addBtn">Add</button>
        </div>
      </div>
    </div>
  );
}
