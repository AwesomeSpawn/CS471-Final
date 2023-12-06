// /path/to/InventoryItem.js
import React from "react";

function InventoryItem({ item, purchaseFunc }) {
    const { name, price, quantity } = item; // Destructure necessary item details

    const handlePurchaseClick = () => {
        purchaseFunc(item); // Trigger purchase function passed from ManageInventory
    };

    return (
        <div className="inventoryItem">
            <h3>{name}</h3>
            <p>Price: ${price}</p>
            <p>Quantity: {quantity}</p>
            <button onClick={handlePurchaseClick}>Purchase</button>
        </div>
    );
}

export default InventoryItem;
