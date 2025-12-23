import { useEffect, useState } from "react";

import axios from "axios";
export default function CreateProduct(){
    const [productTypes, setProductTypes] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [values, setValues] = useState([]);

    const loadAttributes = async (productTypeId) =>{
        const res = await axios.get(
            `http://127.0.0.1:8000/api/products/attributes/${productTypeId}/`
        );
        setAttributes(res.data);
    };
    const handleChange = (id, value) =>{
        setValues({  ...values, [id]:value})
    };
    return (
        <div>
            <h2>Создание продукта</h2>
            {attributes.map(attr =>(
                <div key={attr.id}>
                    <label>{attr.name}</label>
                    <input 
                        type={attr.field_type === 'number' ?'number':'text'} 
                        onChange={(e) =>handleChange(attr.id, e.target.value)}
                    />
                </div>
            ))}
        </div>
    )
}