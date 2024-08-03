import * as Yup from "yup";

export const registerValidation = Yup.object().shape({
  username: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Must be at least eight characters, at least one letter and one number!"
    )
    .required(),
  cpassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
