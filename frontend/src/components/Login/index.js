import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setIsLoggedIn } = useContext(AppContext);
  const [user, setUser] = useState({});
  const [errMessage, setErrMessage] = useState("");
  return (
    <div className="login-page">
      <h3>Login</h3>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setUser({ ...user, ...{ email: e.target.value } });
        }}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setUser({ ...user, ...{ password: e.target.value } });
        }}
      />
      <br />
      <button
        onClick={() => {
          axios
            .post("http://localhost:5000/users/login", user)
            .then((result) => {
              localStorage.setItem("token", result.data.token);
              setToken(result.data.token);
              setIsLoggedIn(true);
              navigate("/home");
            })
            .catch((err) => {
              setErrMessage(err.response.data.message);
            });
        }}
      >
        Login
      </button>
      <p>
        don't have an account <Link to="/register">register</Link>
      </p>
      {errMessage && <h4>{errMessage}</h4>}
    </div>
  );
};

export default Login;
