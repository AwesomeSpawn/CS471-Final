// /path/to/InternalPurchases.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CashierInterface.css";

function InternalPurchases() {
  const [purchases, setPurchases] = useState([]);
  const [newPurchase, setNewPurchase] = useState({
    product_ptr_id: 0,
    serial_number: 0,
    curr_amount_needed: 0,
    sale_id: null,
    quantity_extra: 0,
  });

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get("/api/inventory/getpurchases");
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };

    fetchPurchases();
  }, []);

  const addPurchaseToDB = async () => {
    try {
      const response = await axios.post(
        "/api/inventory/createpurchase",
        newPurchase
      );
      setPurchases([...purchases, response.data]);
      setNewPurchase({
        product_ptr_id: 0,
        serial_number: 0,
        curr_amount_needed: 0,
        sale_id: null,
        quantity_extra: 0,
      });
    } catch (error) {
      console.error("Error creating new purchase:", error);
    }
  };

  return (
    <div className="cashierPageContainer">
      <header className="cashierHeader">
        <h1>Internal Purchases</h1>
      </header>
      <div className="cashierContent">
        <h2>Purchases</h2>
        <table>{/* Table for displaying purchases */}</table>
        <h2>Add Purchase</h2>
        <form onSubmit={addPurchaseToDB}>
          {/* Form inputs for adding a new purchase */}
          <button type="submit">Add Purchase</button>
        </form>
      </div>
    </div>
  );
}

export default InternalPurchases;
