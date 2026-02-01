import { useState } from "react";

export function useDynamicForm(attributes){
    const [values, setValues] = useState({});

    const onChange = (id, value)  =>{
        setValues(prev => ({...prev, [id]:value}));
    };

    const toPayload = () =>{
        Object.entries(values).map(([id, values]) =>({
            attribute: Number(id),
            value,
        }));
        return {values, onChange, toPayload}
    }

}