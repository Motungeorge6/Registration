import React, { useState } from "react";
import axios from "axios";

const Login = ({ onFormSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ten-x-dev.herokuapp.com/api/v1/signIn/user",
        { email, password }
      );

      alert(response.data.successful);
      localStorage.setItem("user",JSON.stringify(response.data.data))
      onFormSwitch("dashboard");
    } catch (error) {
      alert(error.response.data.data.message);
      
    }
  };

  return (
    <div className="auth-form">
      <h1>LOGIN</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="***********"
          id="password"
          name="password"
        />
        <button type="submit">Log in</button>
      </form>
      <button className="link-btn" onClick={() => onFormSwitch("register")}>
        Don't have an account? Register here
      </button>
    </div>
  );
};

export default Login;
