import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "./CashierInterface.css";
import CashierItem from "./CashierItem";
import axios from "axios";

function CashierInterface() {
  const [total, totalHook] = useState(0.0);
  const [items, itemHook] = useState([]);
  const [currJobId, currJobHook] = useState("");
  const [currMotorId, currMotorHook] = useState("");
  const [currPartId, currPartHook] = useState("");
  const [error, errorHook] = useState(false);
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

  const onAddJob = () =>{

    axios.post('http://localhost:8000/api/jobs/get', {"job_id":currJobId}).catch((error) => {errorHook(true); console.log(error);})
    .then((response) =>{
      itemHook(items => [...items, response]);
      calcTotal(response.data, 1);
    })

  }

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
        {/* Additional header content or navigation here */}
        <button onClick={goBack} className="backButton">
          Back
        </button>{" "}
        {/* Back button */}
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
        <Popup trigger={<button>New Item</button>} position="bottom right">
          <div>
            <Popup trigger={<button>Motorcycle</button>}>
              <input type="number" onChange={onCurrMotorChange}></input>
              <button>Add</button>
              <button>Scan</button>
            </Popup>
            <Popup trigger={<button>Jobs</button>}>
              <input type="number" onChange={onCurrJobChange}></input>
              <button onClick={onAddJob}>Add</button>
              <button>Scan</button>
            </Popup>
            <Popup trigger={<button>Parts</button>}>
              <input type="number" onChange={onCurrPartChange}></input>
              <button>Add</button>
              <button>Scan</button>
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
        <button onClick={processTransaction}>Complete Transaction</button>
        <p>{"Total Price: " + total}</p>
      </div>
    </div>
  );
}

export default CashierInterface;
