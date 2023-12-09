import React from "react";
import { useNavigate } from "react-router-dom";
import "./CashierInterface.css";

function CashierInterface() {
  const nav = useNavigate();

  // Function to navigate to the Customer Checkout page
  const goToCustomerCheckout = () => {
    nav("/customer_checkout");
  };

  // Function to navigate to the Internal Purchases page
  const goToInternalPurchases = () => {
    nav("/internal_purchases");
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
        <button onClick={goToCustomerCheckout} id="customerCheckoutButton">
          Customer Checkout
        </button>
        <button onClick={goToInternalPurchases} id="internalPurchasesButton">
          Internal Purchases
        </button>
      </div>
    </div>
  );
}

export default CashierInterface;
