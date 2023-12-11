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
  const [saleStatus, setSaleStatus] = useState("");

  const [productDetailsError, setProductDetailsError] = useState({});
  const [customerDetailsError, setCustomerDetailsError] = useState({});

  const validateProductDetails = () => {
    let errors = {};

    if (productType === "bike") {
      if (!productDetails.license_plate)
        errors.license_plate = "License plate is required";
      if (!productDetails.vin) errors.vin = "VIN is required";
      if (!productDetails.make) errors.make = "Make is required";
      if (!productDetails.vehicle_model)
        errors.vehicle_model = "Vehicle model is required";
      if (!productDetails.year) errors.year = "Year is required";
    } else if (productType === "part") {
      if (!productDetails.serial_number)
        errors.serial_number = "Serial number is required";
      if (!productDetails.quantity_extra)
        errors.quantity_extra = "Quantity extra is required";
      if (!productDetails.curr_amount_needed)
        errors.curr_amount_needed = "Current amount needed is required";
    }
    setProductDetailsError(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCustomerDetails = () => {
    let errors = {};
    if (!customerDetails.name) errors.name = "Name is required";
    if (!customerDetails.cardNumber || isNaN(customerDetails.cardNumber))
      errors.cardNumber = "Card number is required and must be a number";
    if (!customerDetails.cvc || isNaN(customerDetails.cvc))
      errors.cvc = "CVC is required and must be a number";
    if (!customerDetails.validMonth || isNaN(customerDetails.validMonth))
      errors.validMonth = "Valid month is required and must be a number";
    if (!customerDetails.validDay || isNaN(customerDetails.validDay))
      errors.validDay = "Valid day is required and must be a number";

    setCustomerDetailsError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSale = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!validateProductDetails() || !validateCustomerDetails()) {
      alert("Validation failed. Please check the input fields."); // Alert on validation failure
      return; // Stop the sale process if validation fails
    }

    setIsSaleInProgress(true);

    console.log("productType:", productType);
    // if no product type is selected, stop the sale process
    if (!productType) {
      alert("Please select a product type");
      setIsSaleInProgress(false);
      return;
    }

    try {
      let inventoryEndpoint = "";
      let saleData = {};

      saleData = {
        credit_card: customerDetails.cardNumber,
        nameOnCard: customerDetails.name,
        CVC: customerDetails.cvc,
        validMonth: customerDetails.validMonth,
        ValidDay: customerDetails.validDay,
        cost: parseFloat(productDetails.cost),
      };

      // Create POS Transaction
      console.log("saleData:", saleData);
      alert("Processing POS transaction...");
      const transactionResponse = await axios.post("http://127.0.0.1/api/sales/pos", saleData);
      const transactionId = transactionResponse.data.id;

      const productData = {
        ...productDetails,
        sale: transactionId,
      };

      if (productType === "bike") {
        inventoryEndpoint =
          "http://localhost:8000/api/inventory/createusedbike";
      } else if (productType === "part") {
        inventoryEndpoint = "http://localhost:8000/api/inventory/createpart";
      }

      // Update inventory
      alert("Processing inventory update...");
      try {
        const inventoryResponse = await axios.post(
          inventoryEndpoint,
          productData
        );
        // Set sale status to success
        setSaleStatus("Success");
        alert("Sale successful!");
      } catch (error) {
        console.error("Error in inventory update:", error);
        setSaleStatus("Failed");
        alert("Inventory update failed! Error: " + error.message);
      }
    } catch (error) {
      console.error("Error in handleSale:", error);
      setSaleStatus("Failed");
      alert("Sale failed! Error: " + error.message);
    } finally {
      setIsSaleInProgress(false);
    }
  };

  // Function to navigate back to the landing page
  const goBack = () => {
    window.history.back(); // This will take the user back to the previous page
  };

  return (
    <div className="cashierPageContainer">
      <header className="cashierHeader">
        <h1>Internal Purchases Page</h1>
        <button onClick={goBack} className="backButton" id="backButton">
          Back
        </button>
      </header>
      <div className="cashierContent">
        {/* Product Type Selection */}
        <div>
          <button onClick={() => setProductType("bike")}>
            Add Bike To Database
          </button>
          <button onClick={() => setProductType("part")}>
            Add Part To Database
          </button>
        </div>

        {/* Detailed Input */}
        {productType && (
          <div>
            <h2>Enter {productType} Details</h2>
            <form>
              {productType === "bike" && (
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
                    required
                  />
                  <input
                    type="number"
                    placeholder="Cost"
                    value={productDetails.cost}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        cost: e.target.value,
                      })
                    }
                    required
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
                    required
                  />
                  <input
                    type="text"
                    placeholder="VIN"
                    value={productDetails.vin}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        vin: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder="Make"
                    value={productDetails.make}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        make: e.target.value,
                      })
                    }
                    required
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
                    required
                  />
                  <input
                    type="number"
                    placeholder="Year"
                    value={productDetails.year}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        year: e.target.value,
                      })
                    }
                    required
                  />
                </>
              )}
              {productType === "part" && (
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
                    required
                  />
                  <input
                    type="number"
                    placeholder="Cost"
                    value={productDetails.cost}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        cost: e.target.value,
                      })
                    }
                    required
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
                    required
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
                    required
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
                    required
                  />
                </>
              )}

              {Object.keys(productDetailsError).map((key) => (
                <p key={key}>{productDetailsError[key]}</p>
              ))}
            </form>
          </div>
        )}

        {/* Customer Details Input */}
        <div>
          <h2>Customer Details</h2>
          <form>
            {/* Customer details form inputs */}
            <input
              type="text"
              placeholder="Name on Card"
              value={customerDetails.name}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, name: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Card Number"
              value={customerDetails.cardNumber}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  cardNumber: e.target.value,
                })
              }
              required
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
              required
            />
            <input
              type="number"
              placeholder="Valid Month"
              value={customerDetails.validMonth}
              onChange={(e) => {
                const month = parseInt(e.target.value);
                if (month >= 1 && month <= 12) {
                  setCustomerDetails({
                    ...customerDetails,
                    validMonth: month,
                  });
                }
              }}
              required
            />
            <input
              type="number"
              placeholder="Valid Day"
              value={customerDetails.validDay}
              onChange={(e) => {
                const day = parseInt(e.target.value);
                if (day >= 1 && day <= 31) {
                  setCustomerDetails({
                    ...customerDetails,
                    validDay: day,
                  });
                }
              }}
              required
            />
            <button disabled={isSaleInProgress} onClick={handleSale}>
              {isSaleInProgress ? "Processing..." : "Add To Database"}
            </button>
          </form>
        </div>

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
