import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAll } from "../../services/api/api";
import { endpoints } from "../../config/constants";
import Swal from "sweetalert2";
import { useAuth } from "../../services/context/authContext";
const Login = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { login } = useAuth();

  useEffect(() => {
    getAll(endpoints.users).then((res) => {
      setUsers([...res.data]);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, actions) => {
      const check = users.find(
        (x) => x.email == values.email && x.password == values.password
      );
      if (check) {
        login(check);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Welcome back ${check.username}`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/");
        });
        actions.resetForm();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Email or password incorrect!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
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
        <h2 style={{ textAlign: "center" }}>Sign In</h2>
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
        <Button
          variant="contained"
          type="submit"
          style={{ borderRadius: "7px" }}
        >
          Log In
        </Button>
        <Link to={"/register"}>Don't have an account? Create one!</Link>
      </form>
    </>
  );
};

export default Login;
