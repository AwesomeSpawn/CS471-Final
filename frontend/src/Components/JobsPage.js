import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./JobsPage.css";

function JobPopup({ job, onClose, job_id }) {
  if (!job) return null;

  return (
    <div className="jobPopup">
      <div className="jobPopupContent">
        <h2>Job Details</h2>
        <p>
          <strong>Job ID:</strong> {job_id}
        </p>
        <p>
          <strong>Task:</strong> {job.fields.task_str}
        </p>
        <p>
          <strong>Time:</strong> {job.fields.job_time} hours
        </p>
        <p>
          <strong>Assignee ID:</strong> {job.fields.assignee_id? job.fields.assignee_id: 0}
        </p>
        {/* Add more details as needed */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function JobRow({ job, onJobSelect, job_id }) {
  return (
    <tr className="jobRow" onClick={() => onJobSelect(job)}>
      <td>{job_id}</td>
      <td>{job.task_str}</td>
      {/* Add more job details in additional table cells */}
    </tr>
  );
}

function Jobs({ token, jobHook }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const userDataString = Cookies.get("userInfo");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const encodedEmail = encodeURIComponent(userData.email);
      console.log(userData.ID);
      axios
        .post('http://localhost:8000/api/jobs/get', {
          'user_id':Cookies.get("userID")
        })
        .then((response) => {
        
          setJobs(JSON.parse(response.data) || []);
          setLoading(false);
        })
        .catch((error) => {
          setError("No jobs available or error fetching jobs");
          setLoading(false);
        });
    } else {
      setError("You must be logged in to view jobs.");
      setLoading(false);
    }
  }, [token]);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    if (typeof jobHook === "function") {
      jobHook(job);
    } else {
      console.error("jobHook is not a function");
    }
  };

  const handleClosePopup = () => {
    setSelectedJob(null);
  };

  if (loading) return <div className="loadingIndicator">Loading jobs...</div>;
  if (error) return <div className="error">{error}</div>;

  const goBack = () => {
    nav(-1);
  };
  return (
    <div className="landingPageContainer">
      <header className="jobsHeader">
        <h1>Job Assignments</h1>
        <button onClick={goBack} className="backButton">
          Back
        </button>
      </header>
      <div className="tableContainer">
        <table className="jobsTable">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Task</th>
              {/* Add more header cells for additional job details */}
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <JobRow
                key={job.fields.job_id}
                job={job.fields}
                job_id={job.pk}
                onJobSelect={() => handleJobSelect(job)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <JobPopup job={selectedJob} onClose={handleClosePopup} />
    </div>
  );
}

export default Jobs;
