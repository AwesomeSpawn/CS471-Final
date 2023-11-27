import Popup from 'reactjs-popup'
import axios from 'axios'
import { useState } from 'react';
import './CashierInterface.css' 
import CashierItem from './CashierItem';

function CashierInterface(props){
    const [total, totalHook] = useState(0.0);
    const [items, itemHook] = useState([{"quantity":'0', 'productname':'Part', 'price':'10.50', 'ID':0}]);
    const [currJobId, currJobHook] = useState('');
    const [currMotorId, currMotorHook] = useState('');
    const [currPartId, currPartHook] = useState('');

    const onCurrJobChange = event => {
        currJobHook(event.target.value);
    }

    const onCurrMotorChange = event =>{
        currMotorHook(event.target.value);
    }

    const onCurrPartChange = event =>{
        currPartHook(event.target.value);
    }

    const calcTotal = (item, quantity) =>{
        let myItem = items.find(i => i.ID === item.ID);
        if (myItem) myItem.quantity = quantity;

        let myTotal = 0.0;
        for (let item of items){
            myTotal += parseFloat(item['quantity']) * parseFloat(item['price']);
            console.log(item['quantity'] + ' ' + item['price']);
        }
        totalHook(myTotal);
        console.log(myTotal);
    }

    const itemDelete = (item) =>{
        itemHook(items.filter((subItem) => item !== subItem));
        calcTotal(item, 0);
    }

    return(
    <div>
        {items.map((item) => {
            return(<CashierItem item={item} delfunction={itemDelete} updatefunc={calcTotal} />)
        })}
        <Popup trigger={
            <button>New Item</button>
            } position='bottom right'>
                <div>
                    <Popup trigger={<button>Motorcycle</button>}>
                        <input type='number' onChange={onCurrMotorChange}></input>
                        <button>Add</button>
                        <button>Scan</button>
                    </Popup>
                    <Popup trigger={<button>Jobs</button>}>
                        <input type='number' onChange={onCurrJobChange}></input>
                        <button>Add</button>
                        <button>Scan</button>
                    </Popup>
                    <Popup trigger={<button>Parts</button>}>
                        <input type='number' onChange={onCurrPartChange}></input>
                        <button>Add</button>
                        <button>Scan</button>
                    </Popup>
                </div>
        </Popup>
        <p>{"Total Price: " + total}</p>
    </div>);

}

export default CashierInterface;