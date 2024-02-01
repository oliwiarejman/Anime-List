import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";
import "../styles/formStyles.css";

const AddAnime = () => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  const initialValues = {
    title: "",
    genre: "",
    characters: [{ name: "", role: "" }],
    releaseDate: "",
    description: "",
    image: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/anime",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/anime/${response.data._id}`);
    } catch (error) {
      console.error("Error adding anime:", error.message);
    }
  };

  return (
    <div>
      <h2>Add Anime</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className="form-container">
            <label>
              Title:
              <Field type="text" name="title" required className="form-input" />
            </label>
            <label>
              Genre:
              <Field type="text" name="genre" className="form-input" />
            </label>
            <label>
              Release Date:
              <Field type="date" name="releaseDate" className="form-input" />
            </label>
            <label>
              Description:
              <Field
                as="textarea"
                name="description"
                className="form-textarea"
              />
            </label>
            <label>
              Image URL:
              <Field type="text" name="image" className="form-input" />
            </label>
            <h3>Characters:</h3>
            <FieldArray name="characters">
              {(arrayHelpers) => (
                <div>
                  {values.characters.map((_, index) => (
                    <div key={index}>
                      <label>
                        Name:
                        <Field
                          type="text"
                          name={`characters.${index}.name`}
                          className="form-input"
                        />
                      </label>
                      <label>
                        Role:
                        <Field
                          type="text"
                          name={`characters.${index}.role`}
                          className="form-input"
                        />
                      </label>
                      <button
                        type="button"
                        className="list-button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Remove Character
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="list-button"
                    onClick={() => arrayHelpers.push({ name: "", role: "" })}
                  >
                    Add Character
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit" className="form-button">
              Add Anime
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddAnime;
