import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "./CashierInterface.css";
import CashierItem from "./CashierItem";

function CashierInterface() {
  const [total, totalHook] = useState(0.0);
  const [items, itemHook] = useState([
    { quantity: "0", productname: "Part", price: "10.50", ID: 0 },
  ]);
  const [currJobId, currJobHook] = useState("");
  const [currMotorId, currMotorHook] = useState("");
  const [currPartId, currPartHook] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [transactions, setTransactions] = useState([]);
  const nav = useNavigate();

  const onCurrJobChange = (event) => {
    currJobHook(event.target.value);
  };

  const onCurrMotorChange = (event) => {
    currMotorHook(event.target.value);
  };

  const onCurrPartChange = (event) => {
    currPartHook(event.target.value);
  };

  const calcTotal = (item, quantity) => {
    let myItem = items.find((i) => i.ID === item.ID);
    if (myItem) myItem.quantity = quantity;

    let myTotal = 0.0;
    for (let item of items) {
      myTotal += parseFloat(item["quantity"]) * parseFloat(item["price"]);
    }
    totalHook(myTotal);
  };

  const itemDelete = (item) => {
    itemHook(items.filter((subItem) => item !== subItem));
    calcTotal(item, 0);
  };

  const processTransaction = () => {
    const newTransaction = {
      items: [...items],
      total,
      paymentMethod,
    };
    setTransactions([...transactions, newTransaction]);

    // Reset for new transaction
    itemHook([]);
    totalHook(0.0);
    setPaymentMethod("Cash");
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Function to navigate back to the landing page
  const goBack = () => {
    nav(-1); // This will take the user back to the previous page
  };

  return (
    <div className="cashierPageContainer">
      <header className="cashierHeader">
        <h1>Cashier Dashboard</h1>
        <button onClick={goBack} className="backButton" id="backButton">
          Back
        </button>
      </header>
      <div className="cashierContent">
        {items.map((item, index) => (
          <CashierItem
            key={index}
            item={item}
            delfunction={itemDelete}
            updatefunc={calcTotal}
          />
        ))}
        <Popup
          trigger={<button id="newItemButton">New Item</button>}
          position="bottom right"
        >
          <div>
            <Popup trigger={<button id="motorcycleButton">Motorcycle</button>}>
              <input type="number" onChange={onCurrMotorChange}></input>
              <button id="addMotorcycleButton">Add</button>
              <button id="scanMotorcycleButton">Scan</button>
            </Popup>
            <Popup trigger={<button id="jobsButton">Jobs</button>}>
              <input type="number" onChange={onCurrJobChange}></input>
              <button id="addJobButton">Add</button>
              <button id="scanJobButton">Scan</button>
            </Popup>
            <Popup trigger={<button id="partsButton">Parts</button>}>
              <input type="number" onChange={onCurrPartChange}></input>
              <button id="addPartButton">Add</button>
              <button id="scanPartButton">Scan</button>
            </Popup>
          </div>
        </Popup>
        <div>
          <select value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="Cash">Cash</option>
            <option value="Credit">Credit</option>
            <option value="Other Card">Other Card</option>
          </select>
        </div>
        <button onClick={processTransaction} id="completeTransactionButton">
          Complete Transaction
        </button>
        <p>{"Total Price: " + total}</p>
      </div>
    </div>
  );
}

export default CashierInterface;
