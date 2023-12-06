import { useState } from "react";


function CashierItem(props){
    const [quantity, quantityHook] = useState(1);
    const quantityShift = event => {
        quantityHook(event.target.value);
        props.updatefunc(props.item, event.target.value);
    }
    let name;
    let editEnable = false;
    if ('job_id' in props.item){
        name = 'Job #' + props.item['job_id'];
        editEnable = true;
    }
    else{
        name = props.item['product_name'];
    }
    return(<div className='flexbox'>
        <p>{name}</p>
        <input type='number' disabled={editEnable} defaultValue={1} onChange={quantityShift}>
        </input>
        <button onClick={() => {
            props.delfunction(props.item)
        }}>Delete</button>
        <p>{quantity}</p>
    </div>)
}

export default CashierItem