import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAPI, getID } from "../../services/api";
import { endpoints } from "../../services/constants";
import { Button, Grid } from "@mui/material";
import Container from "../../components/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

const MoviesDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  }, [id]);

  const handleDelete = async () => {
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
        navigate('/movies');
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
    <Container>
      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
        <Card>
          <CardMedia
            sx={{ height: 450, marginTop: '20px' }}
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
            <Button onClick={() => navigate('/movies')}>
              Go Back
            </Button>
            <Button onClick={() => navigate(`/edit-movies/${movie.id}`)}>
              Edit Movie
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained" size="small">
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Container>
  );
};

export default MoviesDetail;
