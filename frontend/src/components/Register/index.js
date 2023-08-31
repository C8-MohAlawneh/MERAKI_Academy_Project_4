import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
const Register = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({});
  const [errMessage, setErrMessage] = useState("");
  return (
    <div className="register-page">
      <div className="register-page-child">
        <div className="container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
        </div>
        <label htmlFor="firstName">
          <b>First Name</b>
        </label>
        <input
          type="text"
          placeholder="First Name"
          id="firstName"
          className="register-input"
          required
          onChange={(e) => {
            setNewUser({ ...newUser, ...{ firstName: e.target.value } });
          }}
        />
        <hr />
        <label htmlFor="lastName">
          <b>Last Name</b>
        </label>
        <br />
        <input
          type="text"
          placeholder="Last Name"
          id="lastName"
          className="register-input"
          required
          onChange={(e) => {
            setNewUser({ ...newUser, ...{ lastName: e.target.value } });
          }}
        />
        <hr />
        <label htmlFor="age">
          <b>Age</b>
        </label>
        <input
          type="text"
          placeholder="Age"
          id="age"
          className="register-input"
          required
          onChange={(e) => {
            setNewUser({ ...newUser, ...{ age: e.target.value } });
          }}
        />
        <hr />
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="email"
          onChange={(e) => {
            setNewUser({ ...newUser, ...{ email: e.target.value } });
          }}
          className="register-input"
          placeholder="Enter Email"
          name="email"
          id="email"
          required
        ></input>
        <hr />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          onChange={(e) => {
            setNewUser({ ...newUser, ...{ password: e.target.value } });
          }}
          className="register-input"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          required
        />
        <hr />
        <div className="container signin">
          <button
            type="submit"
            className="registerbtn"
            onClick={() => {
              axios
                .post("http://localhost:5000/users/register", newUser)
                .then((result) => {
                  navigate("/login");
                })
                .catch((err) => {
                  setErrMessage(err.response.data.err);
                });
            }}
          >
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">login</Link>
          </p>
          {errMessage && <h4 style={{ color: "red" }}>{errMessage}</h4>}
        </div>
      </div>
    </div>
  );
};

export default Register;
