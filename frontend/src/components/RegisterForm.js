import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../styles/formStyles.css";
const RegisterForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/",
        values
      );

      navigate("/");
    } catch (error) {
      setErrors({
        registration: "Registration failed. Please check your details.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="form-container">
        <label>
          Username:
          <Field type="text" name="username" className="form-input" />
        </label>
        <label>
          Email:
          <Field type="email" name="email" className="form-input" />
        </label>
        <label>
          Hasło:
          <Field type="password" name="password" className="form-input" />
        </label>
        <label>
          Potwierdź hasło:
          <Field
            type="password"
            name="confirmPassword"
            className="form-input"
          />
          <ErrorMessage
            name="registration"
            component="div"
            className="form-textarea"
          />
        </label>
        <button type="submit" className="form-button">
          Zarejestruj
        </button>
        <div className="form-textarea">
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </div>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
