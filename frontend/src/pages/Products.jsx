import "./css/product_style.scss"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "./ProductCard";

export default function Products() {
  const { typeId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = typeId
      ? `/products/?type=${typeId}`
      : `/products/`;

    api.get(url)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, [typeId]);

  return (
    <div>
      <h2>
        Товары{/*  {products.length >0 && `(${products.length})`} */}
        
      </h2>

      {products.length === 0 && <p>Товаров нет</p>}
      <div className="product-wrapper">

        {products.map(p => (
          <div className="products-div"  key={p.id}>

            <Link to={`/product/${p.id}/`}>
              <ProductCard product={p} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}


