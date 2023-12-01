import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./JobsPage.css"; // Ensure this path is correct

function Jobs({ token, jobHook }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        if (!document.cookie) {
            // Handle scenario when there is no cookie
            setError('You must be logged in to view jobs.');
            setLoading(false);
            return;
        }

        // Fake data for testing
        const fakeJobs = [
            { job_id: 1, task_str: "Fixing electrical issue" },
            { job_id: 2, task_str: "Routine maintenance" },
            { job_id: 3, task_str: "Software update" },
            // Add more fake job objects as needed
        ];

        setJobs(fakeJobs);
        setLoading(false);

        // Comment out the actual API call during testing with fake data
        /*
        axios
            .get("http://LocalHost:8000/api/jobs", { // Adjust the URL to your API endpoint
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
        */
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
                    {`Job ID: ${job.job_id}, Task: ${job.task_str}`}
                </button>
            ))}
        </div>
    );
}

export default Jobs;
