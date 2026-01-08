import "./css/productcard_style.scss"
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <div>
            <Link to={`/product/${product.id}`}  className="product-card">
                <div className="product-img">
                {product.image &&(
                    <img 
                        src={product.image}
                        alt="" 
                        className="img"
                        />
                )}
                   <p><b id="price">{product.price}</b></p>
                <h4>{product.description.slice(0,40)}...</h4>
                <small>Продавец: {product.seller}</small>
                </div>
            </Link>
        </div>
    )
}