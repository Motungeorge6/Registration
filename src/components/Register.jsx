import React, { useState } from "react";
import axios from "axios";

const Register = ({ onFormSwitch }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = { "Content-Type": "application/json" };
    try {
      const res = await axios.post(
        "https://ten-x-dev.herokuapp.com/api/v1/signUp/user",
        {
          firstName,
          lastName,
          email,
          password,
          gender,
        },
        { headers: headers }
      );
      alert(res.data.successful);
      onFormSwitch("login");
    } catch (error) {
      alert(error.response.data.data.message);
    }
  };

  return (
    <div className="auth-form">
      <form className="register-form " onSubmit={handleSubmit}>
        <label htmlFor="firstname">
          <p>FirstName</p>
          <input
            name="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label htmlFor="lastname">
          <p>LastName</p>
          <input
            name="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          <p>Email</p>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            name="password"
            placeholder="*********"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="gender">
          <p>Gender</p>
          <input
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button className="link-btn" onClick={() => onFormSwitch("login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};

export default Register;
