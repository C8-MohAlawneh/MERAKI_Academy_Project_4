import React, { useContext, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { AppContext } from "../../AppContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
const Login = () => {
  const navigate = useNavigate();
  const { setToken, setIsLoggedIn } = useContext(AppContext);
  const [user, setUser] = useState({});
  const [errMessage, setErrMessage] = useState("");
  return (
    <div className="login-page">
      <Form
        style={{ width: "50%" }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setUser({ ...user, ...{ email: e.target.value } });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            onChange={(e) => {
              setUser({ ...user, ...{ password: e.target.value } });
            }}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
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
          </Button>
          <p>
            don't have an account <Link to="/register">register</Link>
          </p>
          {errMessage && <h4 style={{ color: "red" }}>{errMessage}</h4>}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
