import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManagePage = () => {
  const [jobs, setJobs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [newJobDescription, setNewJobDescription] = useState("");
  const navigate = useNavigate();

  // Fetch jobs and employees data
  useEffect(() => {
    axios
      .get("/api/get_jobs")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs", error));

    axios
      .get("/api/get_employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees", error));
  }, []);

  // Handle job assignment
  const handleAssignJob = (e) => {
    e.preventDefault();
    axios
      .post("/api/assign_job", {
        job_id: selectedJob,
        employee_id: selectedEmployee,
      })
      .then((response) => {
        alert("Job assigned successfully!");
        navigate("/landing");
      })
      .catch((error) => console.error("Error assigning job", error));
  };

  // Handle job creation
  const handleCreateJob = (e) => {
    e.preventDefault();
    axios
      .post("/api/create_job", {
        task_str: newJobDescription,
      })
      .then((response) => {
        alert("Job created successfully!");
        setJobs([...jobs, response.data]); // Update jobs list with new job
        setNewJobDescription(""); // Clear the form input
      })
      .catch((error) => console.error("Error creating job", error));
  };

  return (
    <div className="managePageContainer">
      <h1>Manage Jobs</h1>
      <form onSubmit={handleAssignJob}>
        <label>
          Job:
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
          >
            {jobs.map((job) => (
              <option key={job.job_id} value={job.job_id}>
                {job.task_str}
              </option>
            ))}
          </select>
        </label>
        <label>
          Employee:
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            {employees.map((employee) => (
              <option key={employee.user_id} value={employee.user_id}>
                {employee.first_name} {employee.last_name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Assign Job</button>
      </form>

      <h2>Create New Job</h2>
      <form onSubmit={handleCreateJob}>
        <label>
          Job Description:
          <input
            type="text"
            value={newJobDescription}
            onChange={(e) => setNewJobDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default ManagePage;
