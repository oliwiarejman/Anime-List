import React from "react";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <RegisterForm />
    </div>
  );
};

export default Register;
