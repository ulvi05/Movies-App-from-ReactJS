import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteAPI, getAll } from "../../services/api";
import { endpoints } from "../../services/constants";
import { CircularProgress, Grid, Box } from "@mui/material";
import Container from "../../components/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAll(endpoints.movies).then((resp) => {
      setMovies([...resp.data]);
      setLoading(resp.loading);
      setError(resp.error);
    });
  }, []);

  if (loading) {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <CircularProgress color="error" size={80} />
        </Box>
      </Container>
    );
  }

  if (error) return <h1>Failed to fetch</h1>;
  return (
    <Container>
      <Grid sx={{ marginTop: "120px" }} container spacing={2}>
        {movies &&
          movies.map((movie) => {
            return (
              <Grid key={movie.id} item xs={12} sm={12} md={6} lg={3} xl={3}>
                <Card>
                  <CardMedia
                    sx={{ height: 140 }}
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
                  <CardActions>
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
                            //delete from API
                            deleteAPI(endpoints.movies, movie.id);
                            //state update - delete
                            setMovies((currentMovies)=>{
                              return [...currentMovies.filter((x)=>x.id!==movie.id)];
                            })
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
