import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import styles from "./index.module.scss";
import Container from "../../components/Container";
import { useFormik } from "formik";
import { getID, patchAPI } from "../../services/api/api";
import { endpoints } from "../../config/constants";
import Swal from "sweetalert2";
import { MovieValidationSchema } from "../../validation/addmovie";
import { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

const EditMovies = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updatingMovie, setUpdatingMovie] = useState(null); // Initially null for loading state

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getID(endpoints.movies, id);
        setUpdatingMovie(res.data);
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      }
    };
    fetchMovie();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      title: updatingMovie?.title || "",
      artist: updatingMovie?.artist || "",
      year: updatingMovie?.year || "",
      coverImg: updatingMovie?.coverImg || "",
      genre: updatingMovie?.genre || "",
    },
    validationSchema: MovieValidationSchema,
    onSubmit: async (values, actions) => {
      try {
        await patchAPI(endpoints.movies, id, values);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Movie Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/movies");
      } catch (error) {
        console.error("Failed to update movie:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to Update Movie",
          showConfirmButton: true,
        });
      } finally {
        actions.resetForm();
      }
    },
    enableReinitialize: true,
  });

  if (!updatingMovie) return <div>Loading...</div>;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Edit Movies</title>
          <link rel="canonical" href={`http://mysite.com/movies/${id}`} />
        </Helmet>
        <Container>
          <form
            onSubmit={formik.handleSubmit}
            className={styles["edit-movie-form"]}
          >
            <h3 style={{ textAlign: "center" }}>Edit Movie</h3>
            <TextField
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="title"
              id="outlined-basic-title"
              required
              type="text"
              variant="outlined"
            />
            {formik.errors.title && formik.touched.title && (
              <span className={styles.error}>{formik.errors.title}</span>
            )}
            <TextField
              value={formik.values.artist}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="artist"
              id="outlined-basic-artist"
              required
              type="text"
              variant="outlined"
            />
            {formik.errors.artist && formik.touched.artist && (
              <span className={styles.error}>{formik.errors.artist}</span>
            )}
            <TextField
              value={formik.values.year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="year"
              id="outlined-basic-year"
              required
              type="number"
              min={1900}
              variant="outlined"
            />
            {formik.errors.year && formik.touched.year && (
              <span className={styles.error}>{formik.errors.year}</span>
            )}
            <TextField
              value={formik.values.coverImg}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="coverImg"
              id="outlined-basic-img"
              required
              type="url"
              variant="outlined"
            />
            {formik.errors.coverImg && formik.touched.coverImg && (
              <span className={styles.error}>{formik.errors.coverImg}</span>
            )}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Genre</InputLabel>
              <Select
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="genre"
                labelId="demo-simple-select-label"
                id="demo-simple-select-option"
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
              <span className={styles.error}>{formik.errors.genre}</span>
            )}
            <Button variant="contained" color="success" type="submit">
              Update
            </Button>
          </form>
        </Container>
      </HelmetProvider>
    </>
  );
};

export default EditMovies;
