import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAPI, getID } from "../../services/api/api";
import { BASE_URL, endpoints } from "../../config/constants";
import { Button, Grid } from "@mui/material";
import Container from "../../components/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const MoviesDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getID(endpoints.movies, id);
        if (res.error) {
          setError(res.error);
        } else {
          setMovie(res.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
    fetch(`${BASE_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        const currentUser = data.find((user) => user.username === "ulvi21");
        if (currentUser) {
          setUserRole(currentUser.role);
        }
      });
  }, [id]);

  const isAdmin = userRole === "admin";

  const handleDelete = async () => {
    if (!isAdmin) {
      Swal.fire({
        title: "Access Denied",
        text: "You do not have permission to delete this.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteAPI(endpoints.movies, id);
        await Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        navigate("/movies");
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: "There was a problem deleting the file.",
          icon: "error",
        });
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movie Detail</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Container>
        <Grid container justifyContent="center" sx={{ mt: 10 }}>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Card sx={{ borderRadius: "12px", overflow: "hidden" }}>
              <CardMedia
                sx={{ height: 450, objectFit: "cover" }}
                image={movie.coverImg}
                title={movie.title}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight={600}>
                  {movie.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Genre:</strong> {movie.genre}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {movie.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Artist:</strong> {movie.artist}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
                <Button variant="outlined" onClick={() => navigate("/movies")}>
                  Go Back
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/edit-movies/${movie.id}`)}
                >
                  Edit Movie
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MoviesDetail;
