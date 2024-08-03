import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../../services/api/api";
import { endpoints } from "../../config/constants";
import Container from "../../components/Container";
import { MovieValidationSchema } from "../../validation/addmovie";
import Swal from "sweetalert2";
import styles from "./index.module.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

function AddMovies() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      year: "",
      artist: "",
      genre: "",
      coverImg: "",
    },
    validationSchema: MovieValidationSchema,
    onSubmit: (value, actions) => {
      postAPI(endpoints.movies, value);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "New Movie Added",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/movies");
      actions.resetForm();
    },
  });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Movies</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Container>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            className={styles["add-movie-form"]}
          >
            <h2 style={{ textAlign: "center", color: "black" }}>
              Add New Movie
            </h2>
            <TextField
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="title"
              id="outlined-basic"
              label="Title"
              required
              type="text"
              variant="outlined"
              color="primary"
            />
            {formik.errors.title && formik.touched.title && (
              <span style={{ color: "red" }}>{formik.errors.title}</span>
            )}
            <TextField
              value={formik.values.artist}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="artist"
              id="outlined-basic"
              label="Artist"
              required
              type="text"
              variant="outlined"
              className="custom-text-field"
            />
            {formik.errors.artist && formik.touched.artist && (
              <span style={{ color: "red" }}>{formik.errors.artist}</span>
            )}
            <TextField
              value={formik.values.year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="year"
              id="outlined-basic"
              label="Year"
              required
              type="number"
              min={1980}
              variant="outlined"
              className="custom-text-field"
            />
            {formik.errors.year && formik.touched.year && (
              <span style={{ color: "red" }}>{formik.errors.year}</span>
            )}
            <TextField
              value={formik.values.coverImg}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="coverImg"
              id="outlined-basic"
              label="Cover Image URL"
              required
              type="url"
              variant="outlined"
              className="custom-text-field"
            />
            {formik.errors.coverImg && formik.touched.coverImg && (
              <span style={{ color: "red" }}>{formik.errors.coverImg}</span>
            )}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Genre</InputLabel>
              <Select
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="genre"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Genre"
                className="custom-text-field"
              >
                <MenuItem value={"Action"}>Action</MenuItem>
                <MenuItem value={"Adventure"}>Adventure</MenuItem>
                <MenuItem value={"Comedy"}>Comedy</MenuItem>
                <MenuItem value={"Drama"}>Drama</MenuItem>
                <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
                <MenuItem value={"Historical"}>Historical</MenuItem>
                <MenuItem value={"Crime"}>Crime</MenuItem>
                <MenuItem value={"Science Fiction"}>Science Fiction</MenuItem>
                <MenuItem value={"Horror"}>Horror</MenuItem>
                <MenuItem value={"Thriller"}>Thriller</MenuItem>
              </Select>
            </FormControl>
            {formik.errors.genre && formik.touched.genre && (
              <span style={{ color: "red" }}>{formik.errors.genre}</span>
            )}
            <Button variant="contained" color="success" type={"submit"}>
              Add
            </Button>
          </form>
        </Container>
      </HelmetProvider>
    </>
  );
}

export default AddMovies;
