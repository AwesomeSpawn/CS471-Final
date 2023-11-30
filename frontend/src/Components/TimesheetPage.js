import React, { useState, useEffect } from "react";

function TimesheetPage() {
  // State to hold timesheet data
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    // Fake data for testing
    const fakeTimesheets = [
      { timesheet_id: 1, hours: 8, start_date: "2023-01-01" },
      { timesheet_id: 2, hours: 6, start_date: "2023-01-02" },
      { timesheet_id: 3, hours: 7, start_date: "2023-01-03" },
      // Add more fake timesheet objects as needed
    ];

    setTimesheets(fakeTimesheets);
    // Normally, you'd fetch this data from an API
  }, []);

  return (
    <div>
      <h2>Timesheet Page</h2>
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
