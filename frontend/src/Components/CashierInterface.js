import Popup from 'reactjs-popup'
import axios from 'axios'
import { useState } from 'react';
import './CashierInterface.css' 
import CashierItem from './CashierItem';

function CashierInterface(props){
    const [total, totalHook] = useState(0.0);
    const [items, itemHook] = useState([{"quantity":'0', 'productname':'Part', 'price':'10.50', 'ID':0}]);
    const itemDelete = (item) =>{
        itemHook(items.filter((subItem) => item !== subItem));
    }
    const calcTotal = (item, quantity) =>{
        let myItem = items.find(i => i.ID === item.ID);
        myItem.quantity = quantity

        let myTotal = 0.0;
        for (let item of items){
            myTotal += parseFloat(item['quantity']) * parseFloat(item['price']);
            console.log(item['quantity'] + ' ' + item['price']);
        }
        totalHook(myTotal);
        console.log(myTotal);
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
                    <button>Motorcycle</button>
                    <button>Jobs</button>
                    <button>Parts</button>
                </div>
        </Popup>
        <p>{"Total Price: " + total}</p>
    </div>);

}

export default CashierInterface;