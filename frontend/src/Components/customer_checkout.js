// /path/to/CustomerCashier.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerCashier() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({ name: "", cardNumber: "" });
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSale = async () => {
    try {
      const saleDetails = {
        product: selectedProduct,
        customer: customerDetails
      };
      const response = await axios.post("/api/sale", saleDetails);
      setTransactionHistory([...transactionHistory, response.data]);
    } catch (error) {
      console.error("Error processing sale:", error);
    }
  };

  return (
    <div className="cashierPageContainer">
      <header className="cashierHeader">
        <h1>Customer Cashier Interface</h1>
      </header>
      <div className="cashierContent">
        {/* Components for product selection, customer details input, payment processing, and transaction history */}
      </div>
    </div>
  );
}

export default CustomerCashier;
