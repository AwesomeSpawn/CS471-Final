import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Make sure to create a corresponding CSS file

function HomePage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    // Replace with your actual API endpoint to fetch inventory
    axios
      .get("/api/inventory")
      .then((response) => {
        setInventory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
        setLoading(false);
      });
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
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>${item.price}</td>
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
