import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string().required("Please Enter Your username"),
  password: Yup.string().required("Please Enter Your Password"),
});
