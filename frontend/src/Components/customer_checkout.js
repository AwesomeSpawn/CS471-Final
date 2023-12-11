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
  const [inventoryItems, setInventoryItems] = useState([]);

  const validateProductDetails = () => {
    let errors = {};

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
      let cost = parseFloat(productDetails.cost);
      let saleData = {};
      let inventoryEndpoint = "";
      let productData = {};
      let saleId = null; // Variable to store the sale ID

      // Separate handling for 'repair' case
      if (productType === "repair") {
        // Assume the job time (hours) is provided in the productDetails
        // Multiply hours by the cost of labor per hour
        cost = productDetails.job_time * 55;

        // Set inventory endpoint for repair job
        inventoryEndpoint = "/api/create_job";

        // Prepare product data for inventory update
        productData = {
          ...productDetails,
          cost: cost, // Cost based on job time
          sale: null, // Sale ID will be set after POS transaction
        };

        saleData = {
          credit_card: customerDetails.cardNumber,
          nameOnCard: customerDetails.name,
          CVC: customerDetails.cvc,
          validMonth: customerDetails.validMonth,
          ValidDay: customerDetails.validDay,
          cost: cost,
        };

        // Skip POS transaction step until inventory is updated
      } else {
        // For non-repair cases
        saleData = {
          credit_card: customerDetails.cardNumber,
          nameOnCard: customerDetails.name,
          CVC: customerDetails.cvc,
          validMonth: customerDetails.validMonth,
          ValidDay: customerDetails.validDay,
          cost: cost,
        };

        productData = {
          ...productDetails,
          cost: cost,
          sale: null,
        };

        // Create POS Transaction
        console.log("saleData:", saleData);
        alert("Processing POS transaction...");
        await axios.post("/api/sales/pos", saleData);
      }

      // If it's a repair, now create the POS transaction
      if (productType === "repair") {
        // Create POS Transaction
        console.log("saleData:", saleData);
        alert("Processing POS transaction...");
        saleId = await axios.post("/api/sales/pos", saleData);
        console.log("saleId.data.id:", saleId.data.id);
        const { task_str, job_time } = productData;

        productData = {
          task_str,
          job_time,
          sale_id: saleId.data.id,
        };

        alert("Processing inventory update...");
        console.log("productData:", productData);
        const inventoryResponse = await axios.post(
          inventoryEndpoint,
          productData
        );
      }

      if (productType === "bike") {
        inventoryEndpoint = "/api/inventory/sellproduct";

        productData = {
          product_id: parseInt(productDetails.bike, 10),
          quantity: parseInt(1),
        };

        alert("Processing inventory update...");
        console.log("productData:", productData);
        await axios.post(inventoryEndpoint, productData);
      }

      if (productType === "part") {
        inventoryEndpoint = "/api/inventory/sellproduct";
        productData = productDetails.part;
        productDetails.quantity = parseInt(productDetails.quantity);

        productData = {
          product_id: parseInt(productData),
          quantity: productDetails.quantity,
        };

        alert("Processing inventory update...");
        console.log("productData:", productData);
        const inventoryResponse = await axios.post(
          inventoryEndpoint,
          productData
        );
      }

      // Set sale status to success
      setSaleStatus("Success");
      alert("Sale successful!");
      window.location.reload();
    } catch (error) {
      console.error("Error in handleSale:", error);
      setSaleStatus("Failed");
      alert("Sale failed! Error: " + error.message);
    } finally {
      setIsSaleInProgress(false);
    }
  };

  // New function to fetch inventory items
  const fetchInventoryItems = async (type) => {
    let endpoint = "";
    if (type === "bike") {
      endpoint = "http://localhost:8000/api/inventory/getusedbikes";
    } else if (type === "part") {
      endpoint = "http://localhost:8000/api/inventory/getparts";
    }

    try {
      const response = await axios.get(endpoint);
      setInventoryItems(response.data); // Assuming the response data is the list of items
      console.log("inventoryItems:", inventoryItems);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      // Handle error appropriately
    }
  };

  // Update productType selection and fetch inventory items
  const handleProductTypeSelection = (type) => {
    setProductType(type);
    fetchInventoryItems(type);
  };

  // function to display the

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
          <button onClick={() => handleProductTypeSelection("bike")}>
            Sell Used Bike
          </button>
          <button onClick={() => handleProductTypeSelection("part")}>
            Sell Parts
          </button>
          <button onClick={() => setProductType("repair")}>
            Create Repair Job
          </button>
        </div>

        {/* Detailed Input */}
        {productType && (
          <div>
            <h2>Enter {productType} Details</h2>
            <form>
              {productType === "bike" && (
                <div>
                  <select
                    value={productDetails.bike}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        bike: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a bike</option>
                    {inventoryItems.map((item) => {
                      if (item.product_name !== "SOLD") {
                        // Check if the product name is not "SOLD"
                        return (
                          <option
                            key={item.vehicle_id}
                            value={item.vehicle_id}
                            selected={item.vehicle_id === productDetails.bike}
                          >
                            {item.product_name}
                          </option>
                        );
                      }
                      // Save the vehicle ID to productDetails.bike
                      productDetails.bike = item.vehicle_id;
                      return null; // Return null if the product name is "SOLD"
                    })}
                  </select>

                  {/* Calculate and display the price */}
                  <p>
                    Price: $
                    {productDetails.bike &&
                      (() => {
                        const item = inventoryItems.find(
                          (item) =>
                            item.vehicle_id === parseInt(productDetails.bike) &&
                            item.product_name !== "SOLD" // Check if the product name is not "SOLD"
                        );
                        const price = item ? (item.cost * 1.25).toFixed(2) : "";
                        // Save the price to productDetails.cost
                        productDetails.cost = price;
                        return price;
                      })()}
                  </p>
                </div>
              )}
              {productType === "part" && (
                <div>
                  <select
                    value={productDetails.part}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        part: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a part</option>
                    {inventoryItems.map((item) => (
                      <option
                        key={item.product_id}
                        value={item.product_id}
                        selected={item.product_id === productDetails.part}
                      >
                        {item.product_name}
                      </option>
                    ))}
                  </select>

                  {/* Add quantity the customer wants to buy input */}
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={productDetails.quantity}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        quantity: e.target.value,
                      })
                    }
                    required
                    min={0}
                    max={
                      productDetails.part &&
                      inventoryItems.find(
                        (item) =>
                          item.product_id === parseInt(productDetails.part)
                      )?.quantity_extra
                    }
                  />

                  {/* Calculate and display the price */}
                  <p>
                    Price: $
                    {productDetails.part &&
                      productDetails.quantity &&
                      (() => {
                        const item = inventoryItems.find(
                          (item) =>
                            item.product_id === parseInt(productDetails.part)
                        );
                        const price = item
                          ? (
                              item.cost *
                              1.25 *
                              productDetails.quantity
                            ).toFixed(2)
                          : "";
                        // Save the price to productDetails.cost
                        productDetails.cost = price;
                        return price;
                      })()}
                  </p>
                </div>
              )}

              {productType === "repair" && (
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
                    required
                  />
                  <input
                    type="number"
                    placeholder="Job Time"
                    value={productDetails.job_time}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        job_time: e.target.value,
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
              {isSaleInProgress ? "Processing..." : "Submit Sale"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerCashier;
