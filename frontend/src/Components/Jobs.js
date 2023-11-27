import axios from "axios"
import { useNavigate } from "react-router-dom";

function Jobs(props) {
    var my_jobs = [{'job_id':'1'}, {'job_id':'2'}];
    //axios.get('http://LocalHost:8000/jobs', {'token':props.token}).catch(my_jobs.push('no jobs available'))
    //.then((Response) => {
    //    my_jobs = Response['jobs'];
    //})
    const nav = useNavigate();
    return(
        <div>
            {my_jobs.map((job) => {
                return(<button onClick={  () =>{
                    props.jobHook(job);
                    nav('/individualjob');
            }}>{job['job_id']}</button>);
            })}
        </div>
    )
}

export default Jobs