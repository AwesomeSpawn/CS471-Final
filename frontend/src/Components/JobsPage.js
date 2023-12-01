import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./JobsPage.css";

function JobRow({ job, onJobSelect }) {
  return (
    <tr className="jobRow" onClick={() => onJobSelect(job)}>
      <td>{job.job_id}</td>
      <td>{job.task_str}</td>
      {/* Add more job details in additional table cells */}
    </tr>
  );
}

function Jobs({ token, jobHook }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const userDataString = Cookies.get("userInfo");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const encodedEmail = encodeURIComponent(userData.email);

      axios
        .get(`/api/jobs/${encodedEmail}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setJobs(response.data.jobs || []);
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
                key={job.job_id}
                job={job}
                onJobSelect={() => {
                  jobHook(job);
                  nav("/individualjob");
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Jobs;
