import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./JobsPage.css"; // Import your CSS file here

function Jobs({ token, jobHook }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("http://LocalHost:8000/jobs", {
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
  }, [token]);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="jobsContainer">
      {jobs.map((job) => (
        <button
          key={job.job_id}
          className="jobButton"
          onClick={() => {
            jobHook(job);
            nav("/individualjob");
          }}
        >
          {`Job ID: ${job.job_id}`}
        </button>
      ))}
    </div>
  );
}

export default Jobs;
