import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../styles/formStyles.css";

const LoginForm = ({ onLogin }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        values
      );

      const { status, data } = response;

      if (status === 200 && data.userId) {
        const { userId, token } = data;

        window.localStorage.setItem("userId", userId);
        window.localStorage.setItem("token", token);

        onLogin({ userId, token });
      } else {
        setErrors({ password: "Invalid email or password" });
      }
    } catch (error) {
      setErrors({ password: "Invalid email or password" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="form-container">
        <label>
          Email:
          <Field type="email" name="email" className="form-input" />
        </label>
        <label>
          Hasło:
          <Field type="password" name="password" className="form-input" />
          <ErrorMessage
            name="password"
            component="div"
            className="form-textarea"
          />
        </label>
        <button type="submit" className="form-button">
          Zaloguj
        </button>
        <div className="form-textarea">
          Nie masz jeszcze konta? <Link to="/register">Zarejestruj się</Link>
        </div>
      </Form>
    </Formik>
  );
};

export default LoginForm;
