import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import Swal from "sweetalert2";
import { searchDish } from "../helpers/helpers";

const SearchForm = ({ setLoading, setDishes }) => {
  return (
    <>
      <Formik
        initialValues={{ dish: "", vegan: false }}
        validationSchema={Yup.object({
          dish: Yup.string()
            .min(3, "it should have at least 2 characters")
            .required("it should have at least 2 characters"),
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
                placeholder="Enter a dish.."
                className="form-control"
              />
              <div className="input-group-append">
                <button
                  className="btn orange"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
            <label className="checkBox">
              <Field name="vegan" type="checkbox" />
              Vegan
            </label>
            <ErrorMessage className="error" name="dish" component="div" />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchForm;
