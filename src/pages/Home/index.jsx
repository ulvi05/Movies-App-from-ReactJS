import { Grid } from "@mui/material";
import Container from "../../components/Container";
import styles from "./index.module.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { endpoints } from "../../services/constants";
import { getAll } from "../../services/api";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAll(endpoints.movies).then((response) => {
      setMovies([...response.data]);
    });
  }, []);

  return (
    <>
      <section className={styles["home-section"]}>
        <Container>
          <div className={styles["home-header"]}>
            <h1>Welcome To MovieMania</h1>
            <p>Experience the Magic of Movies with MovieMania</p>
          </div>
        </Container>
      </section>
      <section className={styles["slider-section"]}>
        <Container>
          <h1>Featured Movies</h1>
          
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            className={styles["swiper-container"]}
          >
            {movies.map((movie) => (
              <Grid key={movie.id} item xs={12} sm={12} md={6} lg={3} xl={3}>
              <SwiperSlide key={movie.id}>
                <Card sx={{ maxWidth: 500 , backgroundColor: "#F5F5F1" }}>
                  <CardMedia
                    sx={{ height: 350, width: 350, backgroundPosition:"top", backgroundPositionX: "top", objectFit: "contain"}}
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
                    
                    <Button variant="contained" color="error" size="small">
                    <Link
                        style={{ color: "white", textDecoration: "none" }}
                        to={`/movies`}
                      >
                        All Movies
                      </Link>
                    </Button>
                  </CardActions>
                </Card>
              </SwiperSlide>
              </Grid>
            ))}
          </Swiper>
        </Container>
      </section>
    </>
  );
}

export default Home;
