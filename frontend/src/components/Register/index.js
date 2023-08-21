import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({});
  const [errMessage, setErrMessage] = useState("");
  return (
    <div className="register-page">
      <h3>Sign Up</h3>
      <input
        type="string"
        placeholder="First Name"
        onChange={(e) => {
          setNewUser({ ...newUser, ...{ firstName: e.target.value } });
        }}
      />
      <br />
      <input
        type="string"
        placeholder="Last Name"
        onChange={(e) => {
          setNewUser({ ...newUser, ...{ lastName: e.target.value } });
        }}
      />
      <br />
      <input
        type="string"
        placeholder="Age"
        onChange={(e) => {
          setNewUser({ ...newUser, ...{ age: e.target.value } });
        }}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setNewUser({ ...newUser, ...{ email: e.target.value } });
        }}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setNewUser({ ...newUser, ...{ password: e.target.value } });
        }}
      />
      <br />
      <button
        onClick={() => {
          axios
            .post("http://localhost:5000/users/register", newUser)
            .then((result) => {
              navigate("/login");
            })
            .catch((err) => {
              setErrMessage(err.response.data.message);
            });
        }}
      >
        Register
      </button>
      <p>
        already have an account <Link to="/login">login</Link>
      </p>
      {errMessage && <h4>{errMessage}</h4>}
    </div>
  );
};

export default Register;
