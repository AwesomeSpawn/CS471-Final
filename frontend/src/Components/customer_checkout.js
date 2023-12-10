// /path/to/CustomerCashier.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CustomerCashier() {
  const [productType, setProductType] = useState(""); // 'bike' or 'part'
  const [productDetails, setProductDetails] = useState({
    product_name: "",
    cost: "",
    // Bike specific details
    license_plate: "",
    vin: "",
    make: "",
    vehicle_model: "",
    year: "",
    // Part specific details
    serial_number: "",
    quantity_extra: "",
    curr_amount_needed: "",
    // Repair specific details
    task_str: "",
    job_time: "",
    assignee: null,
  });
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    cardNumber: "",
    cvc: "",
    validMonth: "",
    validDay: "",
  });
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [isSaleInProgress, setIsSaleInProgress] = useState(false);
  const [saleStatus, setSaleStatus] = useState(null); // Change initial state to null

  const handleSale = async () => {
    setIsSaleInProgress(true);
    try {
      // Correcting the cost calculation logic
      const cost = parseFloat(productDetails.cost);
      if (isNaN(cost) || cost <= 0) {
        throw new Error("Invalid cost value");
      }

      // Step 1: Prepare Sale Data
      const saleData = {
        cost: cost * -1, // Ensure cost is negative for a sale
        credit_card: customerDetails.cardNumber,
        nameOnCard: customerDetails.name,
      };

      // Step 2: Create POS Transaction
      const transactionResponse = await axios.post(
        "http://localhost:8000/api/sales/pos",
        saleData
      );
      const transactionId = transactionResponse.data.id;

      // Step 3: Prepare Inventory Data
      let productData = {
        ...productDetails,
        cost: cost, // Use original cost value for inventory
        sale: transactionId,
      };

      let inventoryEndpoint = "";
      if (productType === "bike") {
        inventoryEndpoint =
          "http://localhost:8000/api/inventory/createusedbike";
      } else if (productType === "part") {
        inventoryEndpoint = "http://localhost:8000/api/inventory/createpart";
      } else {
        // Assume default case is 'repair'
        productData = {
          ...productDetails,
          cost: productDetails.job_time * 55, // Calculate cost for repair job
          sale: transactionId,
        };
        inventoryEndpoint = "http://localhost:8000/api/create_job";
      }

      // Step 4: Create Inventory Item
      await axios.post(inventoryEndpoint, productData);

      // Step 5: Handle Response
      setSaleStatus("Success");
    } catch (error) {
      console.error("Error in handleSale:", error);
      setSaleStatus("Failed");
    } finally {
      setIsSaleInProgress(false);
    }
  };

  // Render the form based on product type
  const renderProductForm = () => {
    if (productType === "bike") {
      return (
        <>
          <input
            type="text"
            placeholder="Bike Name"
            value={productDetails.product_name}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                product_name: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Cost"
            value={productDetails.cost}
            onChange={(e) =>
              setProductDetails({ ...productDetails, cost: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="License Plate"
            value={productDetails.license_plate}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                license_plate: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="VIN"
            value={productDetails.vin}
            onChange={(e) =>
              setProductDetails({ ...productDetails, vin: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Make"
            value={productDetails.make}
            onChange={(e) =>
              setProductDetails({ ...productDetails, make: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Vehicle Model"
            value={productDetails.vehicle_model}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                vehicle_model: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Year"
            value={productDetails.year}
            onChange={(e) =>
              setProductDetails({ ...productDetails, year: e.target.value })
            }
          />
        </>
      );
    } else if (productType === "part") {
      return (
        <>
          <input
            type="text"
            placeholder="Part Name"
            value={productDetails.product_name}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                product_name: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Cost"
            value={productDetails.cost}
            onChange={(e) =>
              setProductDetails({ ...productDetails, cost: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Serial Number"
            value={productDetails.serial_number}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                serial_number: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Quantity Extra"
            value={productDetails.quantity_extra}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                quantity_extra: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Current Amount Needed"
            value={productDetails.curr_amount_needed}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                curr_amount_needed: e.target.value,
              })
            }
          />
        </>
      );
    } else if (productType === "repair") {
      return (
        <>
          <input
            type="text"
            placeholder="Task String"
            value={productDetails.task_str}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                task_str: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Job Time"
            value={productDetails.job_time}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                job_time: e.target.value,
              })
            }
          />
        </>
      );
    }
  };

  // Function to navigate back to the landing page
  const goBack = () => {
    window.history.back(); // This will take the user back to the previous page
  };

  return (
    <div className="cashierPageContainer">
      <header className="cashierHeader">
        <h1>Customer Checkout Page</h1>
        <button onClick={goBack} className="backButton" id="backButton">
          Back
        </button>
      </header>
      <div className="cashierContent">
        {/* Product Type Selection */}
        <div>
          <button onClick={() => setProductType("bike")}>Sell Used Bike</button>
          <button onClick={() => setProductType("part")}>Sell Parts</button>
          <button onClick={() => setProductType("repair")}>
            Create Repair Job
          </button>
        </div>

        {/* Product Details Input */}
        {productType && (
          <div>
            <h2>Enter {productType} Details</h2>
            {renderProductForm()}
          </div>
        )}

        {/* Customer Details Input */}
        <div>
          <h2>Customer Details</h2>
          <input
            type="text"
            placeholder="Name on Card"
            value={customerDetails.name}
            onChange={(e) =>
              setCustomerDetails({ ...customerDetails, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Card Number"
            value={customerDetails.cardNumber}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                cardNumber: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="CVC"
            value={customerDetails.cvc}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                cvc: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Valid Month"
            value={customerDetails.validMonth}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                validMonth: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Valid Day"
            value={customerDetails.validDay}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                validDay: e.target.value,
              })
            }
          />
        </div>

        {/* Sale Button */}
        <button disabled={isSaleInProgress} onClick={handleSale}>
          {isSaleInProgress ? "Processing..." : "Submit Sale"}
        </button>

        {/* Sale Status */}
        {saleStatus !== null && (
          <div>
            <h2>Sale Status</h2>
            <p>
              {saleStatus === "Success" ? "Sale successful" : "Sale failed"}
            </p>
          </div>
        )}

        {/* Transaction History */}
        <div>
          <h2>Transaction History</h2>
          <ul>
            {transactionHistory.map((transaction, index) => (
              <li key={index}>
                {transaction.product.name} - ${transaction.product.cost}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CustomerCashier;
