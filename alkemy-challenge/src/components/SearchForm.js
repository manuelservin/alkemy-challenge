import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import Swal from "sweetalert2";
import { SearchOutline } from "@styled-icons/evaicons-outline/SearchOutline";
import { searchDish } from "../helpers/helpers";
import "../styles/searchForm.css";

const SearchForm = ({ setLoading, setDishes }) => {
  return (
    <>
      <Formik
        initialValues={{ dish: "", vegan: false }}
        validationSchema={Yup.object({
          dish: Yup.string()
            .min(3, "It should have at least 2 characters")
            .required("It should have at least 2 characters"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          searchDish(values)
            .then((res) => {
              if (res.length === 0) {
                setLoading(false);
                return Swal.fire("Error!", "The dish does not exist", "error");
              }
              localStorage.setItem("lastSearch", JSON.stringify(res));
              setLoading(false);
              setDishes(res);
            })
            .catch((err) => Swal.fire("Error!", err, "error"));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="  search-form ">
            <div className="input-group">
              <Field
                name="dish"
                type="text"
                autoComplete="off"
                placeholder="Search your favourite food"
                className="form-control"
              />
              <div className="input-group-append">
                <button className="btn" type="submit" disabled={isSubmitting}>
                  <SearchOutline size={20} color="#fff" />
                </button>
              </div>
            </div>
            <ErrorMessage className="error" name="dish" component="div" />
            <label className="checkBox mt-2">
              <Field name="vegan" type="checkbox" />
              Vegan
            </label>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchForm;
