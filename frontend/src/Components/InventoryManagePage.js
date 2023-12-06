// /path/to/ManageInventory.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InventoryItem from "./InventoryItem";
import axios from "axios";

function ManageInventory() {
  const [usedBikes, setUsedBikes] = useState([]);
  const [parts, setParts] = useState([]);
  const [newPart, setNewPart] = useState({
    product_name: "",
    cost: 0,
    serial_number: 0,
    quantity_extra: 0,
    curr_amount_needed: 0,
    sale: null,
  }); // Add newPart state
  const [newBike, setNewBike] = useState({
    product_name: "",
    cost: 0,
    license_plate: "",
    vin: "",
    make: "",
    vehicle_model: "",
    year: 0,
    sale: null,
  }); // Add newBike state
  const nav = useNavigate();

  // Fetch used bikes and parts on component mount
  useEffect(() => {
    const fetchUsedBikes = async () => {
      try {
        const response = await axios.get("/api/inventory/getusedbikes");
        setUsedBikes(response.data);
      } catch (error) {
        console.error("Error fetching used bikes:", error);
      }
    };

    const fetchParts = async () => {
      try {
        const response = await axios.get("/api/inventory/getparts");
        setParts(response.data);
      } catch (error) {
        console.error("Error fetching parts:", error);
      }
    };

    fetchUsedBikes();
    fetchParts();
  }, []);

  const addPartToDB = async () => {
    try {
      const response = await axios.post("/api/inventory/createpart", newPart);
      setParts([...parts, response.data]); // Update parts state
      setNewPart({
        product_name: "",
        cost: 0,
        serial_number: 0,
        quantity_extra: 0,
        curr_amount_needed: 0,
        sale: null,
      }); // Clear newPart input
    } catch (error) {
      console.error("Error creating new part:", error);
    }
  };

  const addBikeToDB = async () => {
    try {
      const response = await axios.post(
        "/api/inventory/createusedbike",
        newBike
      );
      setUsedBikes([...usedBikes, response.data]); // Update bikes state
      setNewBike({
        product_name: "",
        cost: 0,
        license_plate: "",
        vin: "",
        make: "",
        vehicle_model: "",
        year: 0,
        sale: null,
      }); // Clear newBike input
    } catch (error) {
      console.error("Error creating new bike:", error);
    }
  };

  const handlePurchase = async (item) => {
    try {
      await axios.post("/api/purchase", item);
    } catch (error) {
      console.error("Error making purchase:", error);
    }
  };

  const goBack = () => {
    nav(-1);
  };

  return (
    <div className="inventoryPageContainer">
      <header className="inventoryHeader">
        <h1>Inventory Management</h1>
        <button onClick={goBack} className="backButton">
          Back
        </button>
      </header>
      <div className="inventoryContent">
        <h2>Used Bikes</h2>
        {usedBikes.map((bike, index) => (
          <InventoryItem
            key={index}
            item={bike}
            purchaseFunc={handlePurchase}
          />
        ))}
        <h2>Parts</h2>
        {parts.map((part, index) => (
          <InventoryItem
            key={index}
            item={part}
            purchaseFunc={handlePurchase}
          />
        ))}
        <h2>Add Part</h2>
        <form onSubmit={addBikeToDB}>
          <input
            type="text"
            placeholder="Product Name"
            value={newBike.product_name}
            onChange={(e) =>
              setNewBike({ ...newBike, product_name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Cost"
            value={newBike.cost}
            onChange={(e) => setNewBike({ ...newBike, cost: e.target.value })}
          />
          <input
            type="text"
            placeholder="License Plate"
            value={newBike.license_plate}
            onChange={(e) =>
              setNewBike({ ...newBike, license_plate: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="VIN"
            value={newBike.vin}
            onChange={(e) => setNewBike({ ...newBike, vin: e.target.value })}
          />
          <input
            type="text"
            placeholder="Make"
            value={newBike.make}
            onChange={(e) => setNewBike({ ...newBike, make: e.target.value })}
          />
          <input
            type="text"
            placeholder="Vehicle Model"
            value={newBike.vehicle_model}
            onChange={(e) =>
              setNewBike({ ...newBike, vehicle_model: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Year"
            value={newBike.year}
            onChange={(e) => setNewBike({ ...newBike, year: e.target.value })}
          />
          <input
            type="text"
            placeholder="Sale"
            value={newBike.sale}
            onChange={(e) => setNewBike({ ...newBike, sale: e.target.value })}
          />
          <button type="submit">Add Used Bike</button>
        </form>
      </div>
    </div>
  );
}
export default ManageInventory;
