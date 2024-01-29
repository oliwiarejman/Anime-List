import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        credentials
      );

      console.log("Response from server:", response);

      const { status, data } = response;

      if (status === 200 && data.userId) {
        const { userId, token } = data;

        console.log("userId from server:", userId);

        window.localStorage.setItem("userId", userId);
        window.localStorage.setItem("token", token);

        onLogin({ userId, token });
      } else {
        console.error("Błąd logowania");
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Błąd logowania:", error.message);
      setError("Invalid email or password");
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
        Email:
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
      </label>
      <label
        style={{ display: "block", marginBottom: "20px", marginLeft: "-16px" }}
      >
        Hasło:
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
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
        Zaloguj
      </button>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        Nie masz jeszcze konta? <Link to="/register">Zarejestruj się</Link>
      </div>
    </form>
  );
};

export default LoginForm;
