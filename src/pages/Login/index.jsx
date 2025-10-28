import { Button, TextField, Box, Typography, Paper } from "@mui/material";
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
      setUsers(res.data);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, actions) => {
      const check = users.find(
        (x) => x.email === values.email && x.password === values.password
      );

      if (check) {
        login(check);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Welcome back ${check.username}`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate("/"));
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
          Sign In
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
            sx={{ fontSize: "1.1rem" }}
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
            Log In
          </Button>

          <Typography mt={2} textAlign="center" fontSize="0.95rem">
            <Link to="/register" style={{ textDecoration: "none" }}>
              Don’t have an account? <strong>Create one!</strong>
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
