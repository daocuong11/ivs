import React, { useState } from "react";
import Axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);


  const register = () => {
    Axios.post("http://localhost:3001/register", {
      name,
      email,
    }).then((response) => {
      if (response.status === 200) {
        setIsSuccess(true);
      }
    });
  };

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        {isSuccess ? <span> Register successfully </span> : null}
        <div className="form-field">
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <button onClick={register} > Register</button>
      </div>
    </div>
  );
}

export default App;
