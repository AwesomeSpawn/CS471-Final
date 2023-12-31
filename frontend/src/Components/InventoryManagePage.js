// /path/to/ManageInventory.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageInventory() {
  const [usedBikes, setUsedBikes] = useState([]);
  const [parts, setParts] = useState([]);
  const [newPart, setNewPart] = useState({
    product_name: "",
    cost: "",
    serial_number: "",
    quantity_extra: "",
    curr_amount_needed: "",
    sale: null,
  }); // Add newPart state
  const [newBike, setNewBike] = useState({
    product_name: "",
    cost: "",
    license_plate: "",
    vin: "",
    make: "",
    vehicle_model: "",
    year: "",
    sale: null,
  }); // Add newBike state
  const [selectedType, setSelectedType] = useState(""); // Add selectedType state
  const nav = useNavigate();

  // Fetch used bikes and parts on component mount
  useEffect(() => {
    const fetchUsedBikes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/inventory/getusedbikes");
        setUsedBikes(response.data);
      } catch (error) {
        console.error("Error fetching used bikes:", error);
      }
    };

    const fetchParts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/inventory/getparts");
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
      const response = await axios.post("http://127.0.0.1:8000/api/inventory/createpart", newPart);

      setParts([...parts, response.data]); // Update parts state
      setNewPart({
        product_name: "",
        cost: "",
        serial_number: "",
        quantity_extra: "",
        curr_amount_needed: "",
        sale: null,
      }); // Clear newPart input
    } catch (error) {
      console.error("Error creating new part:", error);
    }
  };

  const addBikeToDB = async (event) => {
    event.preventDefault(); // Prevent page refresh
    console.log(newBike);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/inventory/createusedbike",
        newBike
      );
      setUsedBikes([...usedBikes, response.data]); // Update bikes state
      setNewBike({
        product_name: "",
        cost: "",
        license_plate: "",
        vin: "",
        make: "",
        vehicle_model: "",
        year: "",
        sale: null,
      }); // Clear newBike input
    } catch (error) {
      console.error("Error creating new bike:", error);
    }
  };

  const goBack = () => {
    nav(-1);
  };

  const handleTypeSelection = (type) => {
    setSelectedType(type);
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
        <table>
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Product Name</th>
              <th>Cost</th>
              <th>License Plate</th>
              <th>VIN</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {usedBikes.map((bike) => (
              <tr key={bike.vehicle_id}>
                <td>{bike.vehicle_id}</td>
                <td>{bike.product_name}</td>
                <td>${bike.cost}</td>
                <td>{bike.license_plate}</td>
                <td>{bike.vin}</td>
                <td>{bike.make}</td>
                <td>{bike.vehicle_model}</td>
                <td>{bike.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Parts</h2>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Cost</th>
              <th>Serial Number</th>
              <th>Quantity Extra</th>
              <th>Current Amount Needed</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part.product_id}>
                <td>{part.product_id}</td>
                <td>{part.product_name}</td>
                <td>${part.cost}</td>
                <td>{part.serial_number}</td>
                <td>{part.quantity_extra}</td>
                <td>{part.curr_amount_needed}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Add Part or Used Bike</h2>
        <div>
          <button onClick={() => handleTypeSelection("part")}>Add Part</button>
          <button onClick={() => handleTypeSelection("bike")}>
            Add Used Bike
          </button>
        </div>
        {selectedType === "part" && (
          <form onSubmit={addPartToDB}>
            <input
              type="text"
              placeholder="Product Name"
              value={newPart.product_name}
              onChange={(e) =>
                setNewPart({ ...newPart, product_name: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Cost"
              value={newPart.cost}
              onChange={(e) => setNewPart({ ...newPart, cost: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Serial Number"
              value={newPart.serial_number}
              onChange={(e) =>
                setNewPart({ ...newPart, serial_number: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Quantity Extra"
              value={newPart.quantity_extra}
              onChange={(e) =>
                setNewPart({ ...newPart, quantity_extra: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Current Amount Needed"
              value={newPart.curr_amount_needed}
              onChange={(e) =>
                setNewPart({ ...newPart, curr_amount_needed: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newPart.location}
              onChange={(e) =>
                setNewPart({ ...newPart, location: e.target.value })
              }
              required
            />
            <button type="submit">Add Part</button>
          </form>
        )}
        {selectedType === "bike" && (
          <form onSubmit={addBikeToDB}>
            <input
              type="text"
              placeholder="Product Name"
              value={newBike.product_name}
              onChange={(e) =>
                setNewBike({ ...newBike, product_name: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Cost"
              value={newBike.cost}
              onChange={(e) => setNewBike({ ...newBike, cost: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="License Plate"
              value={newBike.license_plate}
              onChange={(e) =>
                setNewBike({ ...newBike, license_plate: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="VIN"
              value={newBike.vin}
              onChange={(e) => setNewBike({ ...newBike, vin: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Make"
              value={newBike.make}
              onChange={(e) => setNewBike({ ...newBike, make: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Vehicle Model"
              value={newBike.vehicle_model}
              onChange={(e) =>
                setNewBike({ ...newBike, vehicle_model: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Year"
              value={newBike.year}
              onChange={(e) => setNewBike({ ...newBike, year: e.target.value })}
              required
            />
            <button type="submit">Add Used Bike</button>
          </form>
        )}
      </div>
    </div>
  );
}
export default ManageInventory;
