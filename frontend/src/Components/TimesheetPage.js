import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function TimesheetPage() {
  const [timesheets, setTimesheets] = useState([]);
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userDataString = Cookies.get("userInfo");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const encodedEmail = encodeURIComponent(userData.email);

      axios
        .get(`http://127.0.0.1:8000/api/timesheets/${encodedEmail}`)
        .then((response) => {
          setTimesheets(response.data.timesheets || []);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching timesheets");
          setLoading(false);
        });
    } else {
      setError("You must be logged in to view timesheets.");
      setLoading(false);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would normally send the data to the server
    console.log("Submitting Timesheet:", { date, hours });
    // Reset form after submission
    setDate("");
    setHours("");
  };

  if (loading) return <p>Loading timesheets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Timesheet Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Hours Worked:
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Timesheet</button>
      </form>
      <div className="timesheetsContainer">
        {timesheets.map((timesheet) => (
          <div key={timesheet.timesheet_id} className="timesheetItem">
            <p>Timesheet ID: {timesheet.timesheet_id}</p>
            <p>Hours Worked: {timesheet.hours}</p>
            <p>Date: {timesheet.start_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimesheetPage;
