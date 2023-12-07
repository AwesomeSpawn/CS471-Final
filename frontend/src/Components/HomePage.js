import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./HomePage.css";

function HomePage() {
  const [usedBikes, setUsedBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const fetchUsedBikes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/inventory/getusedbikes"
        );
        setUsedBikes(response.data);
        setLoading(false);
        console.log("Used Bikes data:", response.data);
      } catch (error) {
        console.error("Error fetching used bikes:", error);
        setLoading(false);
      }
    };
    fetchUsedBikes();
  }, []);

  const navigateToLoginOrLanding = () => {
    const token = Cookies.get("token");
    nav(token ? "/landing" : "/login");
  };

  if (loading) {
    return <p>Loading used bikes...</p>;
  }

  return (
    <div className="homePageContainer">
      <header className="homeHeader">
        <h1>Motorcycle Dealership</h1>
        <button
          id="loginButton"
          className="loginButton"
          onClick={navigateToLoginOrLanding}
        >
          Employee Login
        </button>
      </header>
      <div className="inventorySection">
        <h2>Used Bikes Inventory</h2>
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
              <th>Details</th>
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
                <td>
                  <button onClick={() => nav(`/bike/${bike.vehicle_id}`)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Additional sections for customer interaction can be added here */}
    </div>
  );
}

export default HomePage;
