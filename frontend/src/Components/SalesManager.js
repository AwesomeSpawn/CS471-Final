import axios from "axios";
import { useState, useEffect } from "react";

function SalesManager(params){

    const [objs, objHook] = useState(null);
    
  useEffect(() => {
    axios.get('http://localhost:8000/pos')
      .then(response => {
        objHook(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
    if (objs) {
        return(<div>
        {objs.map((obj) =>{
           return( <div>
                <p>Name: {obj.nameOnCard}</p>
                <br />
                <p>CCNumber: {obj.credit_card}</p>
            </div>)
        })}
    </div>)
    }

    else{
        return( <p>Whoops</p>)
    }

}

export default SalesManager;