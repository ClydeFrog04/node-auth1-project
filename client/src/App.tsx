import React, {useEffect, useState} from 'react';
import axios from "axios";
import {axiosWithAuth} from "./utils/axiosWithAuth";

function App() {
    const [credentials, setCredentials] = useState({ username:"test", password:"test" });

    const baseUrl = "http://localhost:4000";

    useEffect(() =>{
        // axiosWithAuth().get(`${baseUrl}/api/users`)
        //     .then(res =>{
        //         console.log(res);
        //     })
        //     .catch(e =>{
        //         console.log(e.stack);
        //     });
        axios.post(`${baseUrl}/api/login`, credentials)
            .then(console.log)
            .catch(console.log);
    });

  return (
    <div className="App">

    </div>
  );
}

export default App;
