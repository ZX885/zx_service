import "./css/product_style.scss"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/axios";
import ProductCard from "./ProductCard";

export default function Products() {
  const { typeId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get(`/products/?type=${typeId}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, [typeId]);

  return (
    <div>
      <h2>Товары</h2>

      {products.length === 0 && <p>Товаров нет</p>}
      <div className="product-wrapper">

        {products.map(p => (
          <div className="products-div" key={p.id}>

            <Link to={`/products/${p.id}`}>
              <ProductCard key={p.id} product={p}/>
              {/* <img
                className="product-img"
                src={product.image}
                alt="product" />
              <p>Price: {product.price}</p>
              <p>{product.seller}</p>
              <p>{product.product_type}</p> */}
            
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}















// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { api } from "../api/axios";

// export default function Products(){
//     const {typeId} = useParams();
//     const [products, setProducts] = useState([]);

//     useEffect(() =>{
//         api.get(`product-types/${typeId}/products/`)
//         .then(res = setProducts(res.data))
//         .catch(err =>console.error(err));
//     }, [typeId])

//     return(
//         <div>
//             <h2>Продукты</h2>
//             {products.length === 0 && <p>No products yet</p>}
//             {products.map(product =>(
//                 <div key={product.id} style={{border:"1px solid #444,", margin:10, padding:10 }}>
//                     <p>Price: {product.price}</p>
//                     <p>{product.description}</p>
//                 </div>
//             ))}

//         </div>
//     )

// }