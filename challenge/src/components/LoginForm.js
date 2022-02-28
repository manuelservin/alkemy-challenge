import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../context/auth/AuthContext";
import { startLogin } from "../helpers/helpers";
import { types } from "../types/types";
const LoginForm = () => {
  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleLoginAsGuest = () => {
    dispatch({
      type: types.loginAsGuest,
    });
  };
  return (
    <div>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden"></span>
        </div>
      ) : (
        <div className="form">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email").required("Required"),
              password: Yup.string()
                .min(2, "should have at least 2 characters")
                .required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setLoading(true);
              startLogin(values).then(({ token }) => {
                if (!token) {
                  setLoading(false);

                  return;
                }
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
                <Form>
                  <h1 className="form-title">Login</h1>
                  <div className="form-content">
                    <div className="form-field mb-3 mt-4">
                      <Field
                        name="email"
                        type="text"
                        placeholder="Email.."
                        className="form-control lg"
                      />
                      <ErrorMessage
                        name="email"
                        className="error"
                        component="div"
                      />
                    </div>
                    <div className="form-field mt-4">
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password.."
                        className="form-control lg"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error"
                      />
                    </div>

                    <button
                      type="submit"
                      className="cta__resume mt-4 mb-3"
                      id="form-button"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
          <button className="cta__resume  mb-3 " onClick={handleLoginAsGuest}>
            Enter as guest
          </button>
        </div>
      )}
    </div>
  );
};
export default LoginForm;
