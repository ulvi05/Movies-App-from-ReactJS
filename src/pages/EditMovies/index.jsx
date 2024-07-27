import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getID, putAPI } from "../../services/api";
import { endpoints } from "../../services/constants";
import Container from "../../components/Container";
import { MovieValidationSchema } from "../../validation/addmovie";
import Swal from "sweetalert2";
import styles from "./index.module.scss";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, CircularProgress } from "@mui/material";

function EditMovies() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      year: "",
      artist: "",
      genre: "",
      coverImg: "",
    },
    validationSchema: MovieValidationSchema,
    onSubmit: async (values, actions) => {
      try {
        await putAPI(`${endpoints.movies}/${id}`, values);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Movie Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/movies");
        actions.resetForm();
      } catch (error) {
        console.error("Error updating movie:", error);
        setError("An error occurred while updating the movie.");
      }
    },
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getID(endpoints.movies, id);
        if (res.data) {
          setMovie(res.data);
          formik.setValues(res.data);
        } else {
          console.error("No movie found");
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
        setError("An error occurred while fetching the movie.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <CircularProgress color="error" size={80} />;

  return (
    <Container>
      <form onSubmit={formik.handleSubmit} className={styles["add-movie-form"]}>
        <h2 style={{ textAlign: "center", color: "black" }}>Edit Movie</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <TextField
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="title"
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
          label="Artist"
          required
          type="text"
          variant="outlined"
        />
        {formik.errors.artist && formik.touched.artist && (
          <span style={{ color: "red" }}>{formik.errors.artist}</span>
        )}
        <TextField
          value={formik.values.year}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="year"
          label="Year"
          required
          type="number"
          min={1980}
          variant="outlined"
        />
        {formik.errors.year && formik.touched.year && (
          <span style={{ color: "red" }}>{formik.errors.year}</span>
        )}
        <TextField
          value={formik.values.coverImg}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="coverImg"
          label="Cover Image URL"
          required
          type="url"
          variant="outlined"
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
            label="Genre"
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
        <Button variant="contained" color="success" type="submit">
          Save Changes
        </Button>
      </form>
    </Container>
  );
}

export default EditMovies;
