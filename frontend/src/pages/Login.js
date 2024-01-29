import React from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const handleLogin = (c) => {
    window.localStorage.setItem("token", c.token);
    console.log("Użytkownik zalogowany!", c);
    navigate("/recipes");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default HomePage;
