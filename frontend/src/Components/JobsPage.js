import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./JobsPage.css";

function JobCard({ job, onJobSelect }) {
  return (
    <div className="jobCard" onClick={() => onJobSelect(job)}>
      <h3>Job ID: {job.job_id}</h3>
      <p>Task: {job.task_str}</p>
      {/* Add more job details here */}
    </div>
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

  // Function to navigate back to the landing page
  const goBack = () => {
    nav(-1); // This will take the user back to the previous page
  };

  return (
    <div className="landingPageContainer">
      <header className="jobsHeader">
        <h1>Job Assignments</h1>
        <button onClick={goBack} className="backButton">
          Back
        </button>{" "}
        {/* Back button */}
      </header>
      <div className="appWrapper">
        {jobs.map((job) => (
          <JobCard
            key={job.job_id}
            job={job}
            onJobSelect={() => {
              jobHook(job);
              nav("/individualjob");
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Jobs;
