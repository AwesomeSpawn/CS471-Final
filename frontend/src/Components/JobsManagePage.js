import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobsManagePage.css";

const ManagePage = () => {
  const [jobs, setJobs] = useState([]);
  const [newJobId, setNewJobId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [newJobDescription, setNewJobDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/get_jobs")
      .then((response) => {
        console.log("Jobs:", response.data);
        setJobs(response.data);
      })
      .catch((error) => console.error("Error fetching jobs", error));

    axios
      .get("/api/get_employees")
      .then((response) => {
        console.log("Employees:", response.data);
        setEmployees(response.data);
      })
      .catch((error) => console.error("Error fetching employees", error));
  }, []);

  const findUserIdByUsername = (username) => {
    const employee = employees.find((emp) => emp.username === username);
    return employee ? employee.user_id : null;
  };

  const handleAssignJob = (e) => {
    e.preventDefault();
    const employeeId = findUserIdByUsername(selectedEmployee);

    axios
      .post("/api/assign_job", {
        job_id: selectedJob,
        employee_id: employeeId,
      })
      .then((response) => {
        alert("Job assigned successfully!");
        navigate("/landing");
      })
      .catch((error) => {
        console.error("Error assigning job", error);
      });
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    axios
      .post("/api/create_job", {
        job_id: newJobId,
        task_str: newJobDescription,
      })
      .then((response) => {
        alert("Job created successfully!");
        setJobs([...jobs, response.data]);
        setNewJobId("");
        setNewJobDescription("");
      })
      .catch((error) => console.error("Error creating job", error));
  };

  const renderJobRows = () => {
    return jobs.map((job) => {
      const assignedEmployee = employees.find(
        (emp) => emp.user_id === job.assignee_id
      );
      return (
        <tr key={job.job_id}>
          <td>{job.job_id}</td>
          <td>{assignedEmployee ? assignedEmployee.username : "Unassigned"}</td>
          {/* Add more columns as needed */}
        </tr>
      );
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="landingPageContainer">
      <header className="jobsHeader">
        <h1>Manage Jobs</h1>
        <button onClick={goBack} className="backButton">
          Back
        </button>
      </header>

      <h2>Create New Job</h2>
      <div className="formContainer">
        <form onSubmit={handleCreateJob}>
          <label className="label">
            Job ID:
            <input
              id="newJobId"
              name="newJobId"
              type="text"
              value={newJobId}
              className="inputField"
              onChange={(e) => setNewJobId(e.target.value)}
              required
            />
          </label>
          <label className="label">
            Job Description:
            <input
              id="newJobDescription"
              name="newJobDescription"
              type="text"
              value={newJobDescription}
              className="inputField"
              onChange={(e) => setNewJobDescription(e.target.value)}
              required
            />
          </label>
          <button type="submit">Create Job</button>
        </form>
      </div>

      <h2>Manage Job Assignments</h2>
      <div className="formContainer">
        <form onSubmit={handleAssignJob}>
          <label className="label">
            Job:
            <select
              id="jobSelection"
              name="selectedJob"
              value={selectedJob}
              className="dropdownLarge"
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              {jobs.map((job) => (
                <option key={job.job_id} value={job.job_id}>
                  Job {job.job_id}
                </option>
              ))}
            </select>
          </label>
          <label className="label">
            Employee:
            <select
              id="employeeSelection"
              name="selectedEmployee"
              value={selectedEmployee}
              className="dropdownLarge"
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.username}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Assign Job</button>
        </form>
      </div>

      <div className="jobsTableContainer">
        <h2>Job Assignments</h2>
        <table className="jobsTable">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Assigned Employee</th>
            </tr>
          </thead>
          <tbody>{renderJobRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePage;
