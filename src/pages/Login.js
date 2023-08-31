import { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "validation/login";
import { useNavigate } from "react-router-dom";
import { useAxios } from "helpers/useAxios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setToken } from "redux/authSlice";

const initialValues = {
  username: "",
  password: "",
};

export function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          const response = await useAxios.post("/auth/login", values);
          const token = response.data;
          localStorage.setItem("token", JSON.stringify(token));
          dispatch(setToken(token));
          navigate("/cartlist");
        } catch (error) {
          toast.error(error.response.data);
        }
        setLoading(false);
      },
    });
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
        <ToastContainer />
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Login in</h3>
                  <form method="post" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label">username</label>
                      <input
                        type="text"
                        name="username"
                        className="form-control form-control-lg"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      {errors.username && touched.username ? (
                        <p className="form-error text-danger">
                          {errors.username}
                        </p>
                      ) : null}
                    </div>

                    <div className="form-outline mb-4 pb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      {errors.password && touched.password ? (
                        <p className="form-error text-danger">
                          {errors.password}
                        </p>
                      ) : null}
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                    {!loading ? null : (
                      <div className="pt-2">
                        <div className="spinner-border" role="status"></div>
                      </div>
                    )}

                    <hr className="my-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
