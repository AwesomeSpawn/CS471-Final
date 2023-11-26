import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/inventory/",
          {
            headers: {
              "x-api-key": process.env.REACT_APP_API_KEY,
            },
          }
        );
        setInventory(response.data);
        setLoading(false);
        console.log("Inventory data:", response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  return (
    <div className="homePageContainer">
      <header className="homeHeader">
        <h1>Motorcycle Dealership</h1>
        <button
          id="loginButton"
          className="loginButton"
          onClick={() => nav("login")}
        >
          Employee Login
        </button>
      </header>
      <div className="inventorySection">
        <h2>Inventory</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Type</th>
              <th>Price</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Supplier ID</th>
              <th>Date Added</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.item_name}</td>
                <td>{item.item_type}</td>
                <td>${item.price}</td>
                <td>{item.item_description}</td>
                <td>{item.quantity}</td>
                <td>{item.supplier_id}</td>
                <td>{new Date(item.date_added).toLocaleString()}</td>
                <td>
                  <button onClick={() => nav(`/item/${item.id}`)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Additional sections for customer management can be added here */}
    </div>
  );
}

export default HomePage;
