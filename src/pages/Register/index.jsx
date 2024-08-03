import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAll, postAPI } from "../../services/api/api";
import { endpoints } from "../../config/constants";
import Swal from "sweetalert2";
import { useAuth } from "../../services/context/authContext";
import { registerValidation } from "../../validation/user.register.validation";
import zIndex from "@mui/material/styles/zIndex";

const Register = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll(endpoints.users).then((res) => {
      setUsers([...res.data]);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    onSubmit(values, actions) {
      actions.resetForm();
      const duplicateEmail = users.find((x) => x.email == values.email);
      const duplicateUsername = users.find(
        (x) => x.username == values.username
      );
      if (duplicateEmail) {
        Swal.fire({
          position: "top-end",
          sx: { margin: "20px", zIndex: 999 },
          icon: "error",
          title: `Email has already taken`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (duplicateUsername) {
        Swal.fire({
          position: "top-end",
          sx: { margin: "20px", zIndex: 999 },
          icon: "error",
          title: `Username has already taken`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (!duplicateEmail && !duplicateUsername) {
        postAPI(endpoints.users, {
          email: values.email,
          username: values.username,
          password: values.password,
          role: "client",
          basket: [],
        });
        Swal.fire({
          position: "top-end",
          sx: { margin: "20px", zIndex: 999 },
          icon: "success",
          title: `Welcome ${values.username}!`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/login");
        });
      }
    },
    validationSchema: registerValidation,
  });
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          border: "1px solid black",
          width: "50%",
          margin: "100px auto ",
          padding: "18px 24px",
          borderRadius: "7px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
        <TextField
          id="outlined-basic-email"
          label="Email"
          type="email"
          required
          variant="outlined"
          style={{ borderRadius: "7px" }}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
        />
        {formik.errors.email && formik.touched.email && (
          <span style={{ color: "red" }}>{formik.errors.email}</span>
        )}
        <TextField
          id="outlined-basic-username"
          label="Username"
          type="text"
          required
          variant="outlined"
          style={{ borderRadius: "7px" }}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="username"
        />
        {formik.errors.username && formik.touched.username && (
          <span style={{ color: "red" }}>{formik.errors.username}</span>
        )}
        <TextField
          id="outlined-basic-password"
          label="Password"
          type="password"
          required
          variant="outlined"
          style={{ borderRadius: "7px" }}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password"
        />
        {formik.errors.password && formik.touched.password && (
          <span style={{ color: "red" }}>{formik.errors.password}</span>
        )}
        <TextField
          id="outlined-basic-cpassword"
          label="Confirm Password"
          type="password"
          required
          variant="outlined"
          style={{ borderRadius: "7px" }}
          value={formik.values.cpassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="cpassword"
        />
        {formik.errors.cpassword && formik.touched.cpassword && (
          <span style={{ color: "red" }}>{formik.errors.cpassword}</span>
        )}
        <Button
          variant="contained"
          type="submit"
          style={{ borderRadius: "7px" }}
        >
          Sign Up
        </Button>
        <Link to={"/login"}>Do you have an account?</Link>
      </form>
    </>
  );
};

export default Register;
