import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({});
  return (
    <div className="login-page">
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
      <button onClick={() => {}}>Login</button>
    </div>
  );
};

export default Login;
