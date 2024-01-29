import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/",
        userData
      );

      navigate("/");
    } catch (error) {
      setError("Registration failed. Please check your details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "300px",
        padding: "20px",
      }}
    >
      <label
        style={{ display: "block", marginBottom: "10px", marginLeft: "-16px" }}
      >
        Username:
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
          }}
        />
      </label>
      <label
        style={{ display: "block", marginBottom: "10px", marginLeft: "-16px" }}
      >
        Email:
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
          }}
        />
      </label>

      <label
        style={{ display: "block", marginBottom: "10px", marginLeft: "-16px" }}
      >
        Hasło:
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
          }}
        />
      </label>
      <label
        style={{ display: "block", marginBottom: "10px", marginLeft: "-16px" }}
      >
        Potwierdź hasło:
        <input
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
          }}
        />
      </label>
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Zarejestruj
      </button>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        Masz już konto? <Link to="/login">Zaloguj się</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
