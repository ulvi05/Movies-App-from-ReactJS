import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteAPI, getAll } from "../../services/api/api";
import { BASE_URL, endpoints } from "../../config/constants";
import { CircularProgress, Grid, Box } from "@mui/material";
import Container from "../../components/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useWishlist } from "../../services/context/wishlistContext.jsx";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("");
  const { wishlist, addToWishlist, removeFromWishlist, checkWishlist } =
    useWishlist();

  useEffect(() => {
    getAll(endpoints.movies).then((resp) => {
      setMovies([...resp.data]);
      setLoading(resp.loading);
      setError(resp.error);
    });
    fetch(`${BASE_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        const currentUser = data.find((user) => user.admin === "admin");
        if (currentUser) {
          setUserRole(currentUser.role);
        }
      });
  }, []);

  const isAdmin = userRole === "admin";

  if (loading) {
    return (
      <>
        <HelmetProvider>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Movies</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          <Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress color="error" size={80} />
            </Box>
          </Container>
        </HelmetProvider>
      </>
    );
  }

  if (error) return <h1>Failed to fetch</h1>;
  return (
    <Container>
      <Grid sx={{ marginTop: "120px" }} container spacing={2}>
        {movies &&
          movies.map((movie) => {
            return (
              <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardMedia
                    sx={{ height: 260, objectFit: "cover" }}
                    image={movie.coverImg}
                    title={movie.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Genre: {movie.genre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Year: {movie.year}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Artist: {movie.artist}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Button>
                      <Link
                        style={{ color: "black", textDecoration: "none" }}
                        to={`/movies/${movie.id}`}
                      >
                        Detail
                      </Link>
                    </Button>
                    <Button
                      onClick={() => {
                        const check = checkWishlist(movie.id);
                        if (check) {
                          removeFromWishlist(movie.id);
                        } else {
                          addToWishlist(movie);
                        }
                      }}
                      sx={{ color: "black", fontSize: "18px" }}
                    >
                      {wishlist.find((x) => x.id == movie.id) ? (
                        <MdFavorite style={{ color: "red" }} />
                      ) : (
                        <MdFavoriteBorder />
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        if (!isAdmin) {
                          Swal.fire({
                            title: "Access Denied",
                            text: "You do not have permission to delete this.",
                            icon: "error",
                            confirmButtonText: "OK",
                          });
                          return;
                        }

                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteAPI(endpoints.movies, movie.id);

                            setMovies((currentMovies) => {
                              return [
                                ...currentMovies.filter(
                                  (x) => x.id !== movie.id
                                ),
                              ];
                            });
                            removeFromWishlist(movie.id);
                            Swal.fire({
                              title: "Deleted!",
                              text: "Your file has been deleted.",
                              icon: "success",
                            });
                          }
                        });
                      }}
                      color="error"
                      variant="contained"
                      size="small"
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default Movies;
