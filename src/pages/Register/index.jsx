import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAll, postAPI } from "../../services/api/api";
import { endpoints } from "../../config/constants";
import Swal from "sweetalert2";
import { registerValidation } from "../../validation/user.register.validation";

const Register = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll(endpoints.users).then((res) => {
      setUsers(res.data);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: registerValidation,

    onSubmit(values, actions) {
      const duplicateEmail = users.some((x) => x.email === values.email);
      const duplicateUsername = users.some(
        (x) => x.username === values.username
      );

      if (duplicateEmail) {
        return Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Email is already taken!",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      if (duplicateUsername) {
        return Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Username is already taken!",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      postAPI(endpoints.users, {
        email: values.email,
        username: values.username,
        password: values.password,
        role: "client",
        basket: [],
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Welcome ${values.username}!`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate("/login"));

      actions.resetForm();
    },
  });

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 8,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: "90%", sm: "450px", md: "520px" },
          p: 5,
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4" textAlign="center" fontWeight={600} mb={3}>
          Sign Up
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            label="Username"
            type="text"
            fullWidth
            required
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="username"
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={formik.values.cpassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="cpassword"
            error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
            helperText={formik.touched.cpassword && formik.errors.cpassword}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              py: 1.4,
              fontSize: "1rem",
              borderRadius: "8px",
            }}
          >
            Sign Up
          </Button>

          <Typography mt={2} textAlign="center" fontSize="0.95rem">
            <Link to="/login" style={{ textDecoration: "none" }}>
              Already have an account? <strong>Sign in</strong>
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
