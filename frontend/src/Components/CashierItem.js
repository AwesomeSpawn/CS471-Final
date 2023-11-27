import { useState } from "react";


function CashierItem(props){
    const [quantity, quantityHook] = useState(props.item['quantity']);
    const quantityShift = event => {
        quantityHook(event.target.value);
        props.updatefunc(props.item, event.target.value);
    }
    return(<div className='flexbox'>
        <p>{props.item['productname']}</p>
        <input type='number' onChange={quantityShift}>
        </input>
        <button onClick={() => {
            props.delfunction(props.item)
        }}>Delete</button>
        <p>{quantity}</p>
    </div>)
}

export default CashierItem