import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../context/auth/AuthContext";
import { startLogin } from "../helpers/helpers";
import { types } from "../types/types";
const init = false;
const LoginForm = () => {
  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {loading && <h3> Loading...</h3>}
      <Formik
        initialValues={{ email: "challenge@alkemy.org", password: "react" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Email invalido").required("Requerido"),
          password: Yup.string()
            .min(2, "Debe contener al menos 2 caracteres")
            .required("Requerido"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          startLogin(values).then(({ token }) => {
            dispatch({
              type: types.login,
              payload: { token },
            });
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <>
            <div className="form">
              <Form className="col">
                <h5 className="form-title">Login</h5>
                <div className="form-content">
                  <div className="form-field mb-2">
                    <Field name="email" type="text" placeHolder="Email" />
                    <ErrorMessage
                      name="email"
                      className="error"
                      component="div"
                    />
                  </div>
                  <div className="form-field mt-3">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password.."
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ width: "70%" }}
                    className=" btn orange mt-4 mb-3"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};
export default LoginForm;
